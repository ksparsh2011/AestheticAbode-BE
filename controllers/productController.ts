import { Request, Response } from "express";
import Product from "../models/Product";
import { AnyArray } from "mongoose";

export const getProduct = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  const product = new Product(req.body);
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedProduct);
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
