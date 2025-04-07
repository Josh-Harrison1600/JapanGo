import jwt, { JwtPayload, VerifyErrors } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

dotenv.config();

//Extend the Express Request type to include custom user property
interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  console.log("COOKIES: ", req.cookies); // Log the cookies for debugging
  const token = req.cookies.token;

  //If token is missing, respond with 401 
  if (!token) {
    res.status(401).json({ message: 'Access token missing' });
    return;
  }

  //Verify JWT token
  jwt.verify(
    token,
    process.env.JWT_SECRET!,
    (
      err: VerifyErrors | null,
      decoded: string | JwtPayload | undefined 
    ) => {
      if (err) {
        res.status(403).json({ message: 'Invalid token' });
        return;
      }

      //Attach decoded token to the request for future use
      req.user = decoded;
      next();
    }
  );
};
