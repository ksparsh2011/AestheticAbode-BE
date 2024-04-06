import { Request, Response } from "express";
import Product, { IProduct } from "../models/Product";
import mongoose from "mongoose";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getProductDetails = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
      throw new Error(`Invalid product id: ${id}`);
    }

    const product = await Product.findById(id);
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    let products: IProduct[];

    // Check if the request body is an array of products
    if (Array.isArray(req.body)) {
      // Create multiple products
      products = await Promise.all(
        req.body.map(async (productData: any) => {
          const product = new Product(productData);
          return await product.save();
        })
      );
    } else {
      // Create a single product
      const product = new Product(req.body);
      const newProduct = await product.save();
      products = [newProduct];
    }

    res.status(201).json(products);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req: Request | any, res: Response) => {
  const { id } = req.params;
  const { body } = req;

  try {
    // Check if body is an array
    if (Array.isArray(body)) {
      // Validate each object in the array and update
      const updatedProducts = await Promise.all(
        body.map(async (product: any) => {
          // Check if the product id is valid
          const isValidId = mongoose.Types.ObjectId.isValid(product._id);
          if (!isValidId) {
            throw new Error(`Invalid product id: ${product._id}`);
          }

          // Update the product
          const updatedProduct = await Product.findByIdAndUpdate(
            product._id,
            product,
            {
              new: true,
            }
          );

          return updatedProduct;
        })
      );

      res.json(updatedProducts);
    } else {
      // Single product update
      // Check if the product id is valid
      const isValidId = mongoose.Types.ObjectId.isValid(id);
      if (!isValidId) {
        throw new Error(`Invalid product id: ${id}`);
      }

      // Update the product
      const updatedProduct = await Product.findByIdAndUpdate(id, body, {
        new: true,
      });

      res.json(updatedProduct);
    }
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.json({ message: "Product deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
