import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import User from '../models/User';
import speakeasy from 'speakeasy';

dotenv.config();

const router = express.Router();

// POST /auth/login
// Authenticates a user and returns a JWT token
router.post('/login', async function (req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;

  try {
    //Check if the user exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    //Compare password with hashed password in DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid email or password' });
      return;
    }

    //This makes MFA required
    if (user.mfaEnabled) {
      res.status(200).json({ mfaRequired: true, email });
      return;
    }

    res.status(403).json({ message: 'MFA is required for this account.' });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * Step 2 - Verify MFA TOTP
 * Only after successful verification will we issue a JWT token.
 */
router.post('/verify-mfa', async (req: Request, res: Response): Promise<void> => {
  const { email, token } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.mfaSecret){  
      res.status(401).json({ message: 'MFA not configured' });
      return;
    }
    const verified = speakeasy.totp.verify({
      secret: user.mfaSecret,
      encoding: 'base32',
      token,
    });

    if (!verified){ 
      res.status(401).json({ message: 'Invalid MFA token' });
      return;
    }

    //Else, send JWT token
    const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '2h' });

    res.json({ token: jwtToken });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'MFA verification failed' });
  }
});

export default router;
    


