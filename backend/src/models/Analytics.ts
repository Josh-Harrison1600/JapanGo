import mongoose, { Schema, Document } from 'mongoose';

export interface IAnalytics extends Document {
  page: string;
  action: string;
  platform?: string;
  timestamp: Date;
}

const AnalyticsSchema = new Schema<IAnalytics>({
  page: { type: String, required: true },
  action: { type: String, required: true },
  platform: { type: String },
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model<IAnalytics>('Analytics', AnalyticsSchema);
