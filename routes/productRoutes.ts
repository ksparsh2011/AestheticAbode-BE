import express from "express";
import {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
} from "../controllers/productController";

const productRoutes = express.Router();

// GET all products
productRoutes.get("/", getProduct);
productRoutes.get("/:id", getProductDetails);

// POST a new product
productRoutes.post("/", createProduct);

// PUT update a product or multiple products
productRoutes.put("/:id", (req, res) => {
  const { id } = req.params;
  const { body } = req;
  // Check if the body is an array
  if (Array.isArray(body)) {
    // Validate each object in the array
    const isValid = body.every((product: any) => product.id === id);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid product IDs" });
    }
    // Update each product in the array
    Promise.all(body.map((product: any) => updateProduct(product.id, product)))
      .then((updatedProducts) => res.json(updatedProducts))
      .catch((err) => res.status(400).json({ message: err.message }));
  } else {
    // Update single product
    updateProduct(id, body)
      .then((updatedProduct) => res.json(updatedProduct))
      .catch((err) => res.status(400).json({ message: err.message }));
  }
});

// DELETE a product by ID
productRoutes.delete("/:id", deleteProduct);

export default productRoutes;
