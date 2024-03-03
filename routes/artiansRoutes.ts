import express from "express";
import {
  getArtisan,
  createArtisan,
  updateArtisan,
  deleteArtisan,
} from "../controllers/artisanController";

export const artisanRoutes = express.Router();

artisanRoutes.get("/", getArtisan);
artisanRoutes.post("/", createArtisan);
artisanRoutes.put("/:id", updateArtisan);
artisanRoutes.delete("/:id", deleteArtisan);

export default artisanRoutes;
