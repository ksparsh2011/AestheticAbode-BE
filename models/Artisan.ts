import mongoose, { Schema, Document } from "mongoose";

export interface IArtisan extends Document {
  name: string;
  description: string;
  // Add any other fields as needed
}

const artisanSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  // Define other fields here
});

const Artisan = mongoose.model<IArtisan>("Artisan", artisanSchema);

export default Artisan;
