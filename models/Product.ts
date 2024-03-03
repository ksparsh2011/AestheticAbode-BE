import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  // Add any other fields as needed
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  // Define other fields here
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
