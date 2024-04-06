import express from "express";
import mongoose from "mongoose";
import { errorHandler } from "./middleware/errorHandler";
import productRoutes from "./routes/productRoutes";
import { artisanRoutes } from "./routes/artiansRoutes";
import listEndpoints from "express-list-endpoints";

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/AestheticAbode")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err: any) => console.error("Error connecting to MongoDB:", err));

// Middleware
app.use(express.json());

// Routes
app.use("/products", productRoutes);
app.use("/artisans", artisanRoutes);

console.log(listEndpoints(app));
// Error handling middleware
app.use(errorHandler);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
