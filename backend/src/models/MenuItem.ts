import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
    name: string;
    category: string;
    price: number;
    description?: string;
    imageUrl?: string;
}

const MenuItemSchema: Schema = new Schema({
    name: { type: String, required: true },
    category: [{ type: String, required: true }],
    price: { type: Number, required: true },
    description: { type: String },
    imageUrl: { type: String }
  }, { timestamps: true });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);