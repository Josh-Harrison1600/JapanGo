import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import { sendVerificationEmail } from '../utils/sendVerificationEmail';

dotenv.config();

const router = express.Router();

//User enters email/pass and then 6 digit code is sent
router.post('/login', async function (req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {

    //Check if the username matches
    const user = await User.findOne({ email });
    if(!user){
      res.status(401).json({ message: 'Invalid Credentials!'});
      return;
    }
    
    //Check if the pass matches
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
      res.status(401).json({ message: 'Invalid Credentials!'});
      return;
    }

    //Generate 6 digit code & expiration
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expires = new Date(Date.now() + 10 * 60 * 1000);

    //Save to the DB
    user.verificationCode = code;
    user.verificationCodeExpires = expires;
    await user.save();

    //Send the email
    await sendVerificationEmail(email, code);

    res.status(200).json({ message: 'Verification code sent to email', verificationPending: true });
  }catch(err){
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server Error'});
  }
});

//For verifying the code once it is sent to the user
router.post('/verify-code', async (req: Request, res: Response ): Promise<void> => {
  const { email, code } = req.body;


  try {
    const user = await User.findOne({ email });

    if (!user || !user.verificationCode || !user.verificationCodeExpires) {
      res.status(401).json({ message: 'Code not found. Please log in again.' });
      return
    }

    if (user.verificationCode !== code) {
      res.status(401).json({ message: 'Invalid verification code' });
      return;
    }

    if (user.verificationCodeExpires < new Date()) {
      res.status(401).json({ message: 'Code expired. Please try again.' });
      return;
    }

    // Clear the code so it can't be reused
    user.verificationCode = null;
    user.verificationCodeExpires = null;
    await user.save();

    //Issue JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '2h' });
    res.status(200).json({ token });
  } catch (err) {
    console.error('Code verification error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
    


