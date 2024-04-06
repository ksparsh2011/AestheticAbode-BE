import express from "express";
import cors from "cors";
import {
  getArtisan,
  createArtisan,
  updateArtisan,
  deleteArtisan,
} from "../controllers/artisanController";

export const artisanRoutes = express.Router();

artisanRoutes.use(cors({ origin: "http://localhost:1234" }));

artisanRoutes.get("/", getArtisan);
artisanRoutes.post("/", createArtisan);
artisanRoutes.put("/:id", updateArtisan);
artisanRoutes.delete("/:id", deleteArtisan);

export default artisanRoutes;
