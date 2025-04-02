import mongoose from 'mongoose';

//This export is so 'null' wont throw errors in the authRoute.ts when clearing the code
export interface IUser extends Document {
  email: string;
  password: string;
  verificationCode: string | null;
  verificationCodeExpires: Date | null;
}

const userSchema = new mongoose.Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verificationCode: { type: String, default: null },
  verificationCodeExpires: { type: Date, default: null },
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
