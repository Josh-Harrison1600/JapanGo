import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  mfaEnabled: { type: Boolean, default: false},
  mfaSecret: { type: String, default: null },
});

const User = mongoose.model('User', userSchema);
export default User;
