import express, { Request, Response } from "express";
const router = express.Router();
import { booksList } from "./utils/mockData.js";

// Endpoint to get all books
router.get("/getBooks", (req: Request, res: Response) => {
  res.json(booksList);
});

export default router;
