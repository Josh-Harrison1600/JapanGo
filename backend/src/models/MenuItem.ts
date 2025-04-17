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
    price: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String },
    archived: { type: Boolean, default: false },
  
    extraInfo:{
      type: String,
      default: ""

    }

  }, 
  { timestamps: true });

export default mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);