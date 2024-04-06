import mongoose, { Schema, Document } from "mongoose";

// Define subcategory schema
interface Subcategory {
  id: number;
  title: string;
  page: {
    page_id: string;
    type: string;
    slug: string;
    ss_id: string[];
  };
  category_icon: string;
}

// Define category schema
interface Category {
  id: number;
  title: string;
  level_3: Subcategory[];
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: Category; // Add category field
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  category: { type: Object, required: false },
  thumbnailId: { type: String, required: true }, // Define category field
  isPromoted: { type: Boolean, required: true },
});

const Product = mongoose.model<IProduct>("Product", productSchema);

export default Product;
