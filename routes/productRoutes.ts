import express from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController";

export const productRoutes = express.Router();

productRoutes.get("/", getProduct);
productRoutes.post("/", createProduct);
productRoutes.put("/:id", updateProduct);
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
