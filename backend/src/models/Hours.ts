import mongoose, { Schema, Document } from 'mongoose';

export interface IHours extends Document {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

const HoursSchema: Schema = new Schema({
  monday: { type: [String], required: true },
  tuesday: { type: [String], required: true },
  wednesday: { type: [String], required: true },
  thursday: { type: [String], required: true },
  friday: { type: [String], required: true },
  saturday: { type: [String], required: true },
  sunday: { type: [String], required: true },
}, { timestamps: true });

export default mongoose.model<IHours>('Hours', HoursSchema);
