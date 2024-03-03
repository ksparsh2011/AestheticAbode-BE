import { Request, Response } from "express";
import Artisan from "../models/Artisan";

export const getArtisan = async (req: Request, res: Response) => {
  try {
    const artisans = await Artisan.find();
    res.json(artisans);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createArtisan = async (req: Request, res: Response) => {
  const artisan = new Artisan(req.body);
  try {
    const newArtisan = await artisan.save();
    res.status(201).json(newArtisan);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateArtisan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedArtisan = await Artisan.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedArtisan);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const deleteArtisan = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await Artisan.findByIdAndDelete(id);
    res.json({ message: "Artisan deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
