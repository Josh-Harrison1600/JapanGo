import express, { Request, Response } from 'express';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import User from '../models/User';

const router = express.Router();

/**
 * @route POST /generate-mfa
 * @desc Generates a new MFA secret and QR code for a user
 * @access Private (You should protect this in production)
 */
router.post('/generate-mfa', async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;

  try {
    //Generate a TOTP (Time-based One Time Password) secret
    const secret = speakeasy.generateSecret({ name: `JapanGo (${email})` });

    //If no OTP URL was generated, something went wrong
    if (!secret.otpauth_url) {
      res.status(500).json({ error: 'OTP URL generation failed' });
      return;
    }

    //Save the secret and enable MFA for the user in the database
    await User.updateOne(
      { email },
      {
        mfaSecret: secret.base32,
        mfaEnabled: true,
      }
    );

    //Convert the OTP URL to a QR code (base64 image)
    const qrCode = await qrcode.toDataURL(secret.otpauth_url);

    //Send QR code back to the client to be scanned by an Authenticator app
    res.json({ qrCode });
  } catch (err) {
    console.error('MFA generation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
