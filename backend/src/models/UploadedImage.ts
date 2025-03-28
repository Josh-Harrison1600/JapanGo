import mongoose from 'mongoose';

//Schema for uploaded images
const UploadedImageSchema = new mongoose.Schema({
  originalName: { type: String, required: true },     
  cloudfrontUrl: { type: String, required: true },     
  uploadedAt: { type: Date, default: Date.now },      
});

export default mongoose.model('UploadedImage', UploadedImageSchema);
