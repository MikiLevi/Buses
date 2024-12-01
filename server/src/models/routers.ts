import mongoose, { Schema } from "mongoose";

export interface Irouter {
  _id:Schema.Types.ObjectId
  lineNumber: string;
  name: string;
  statiobs: [string];
  schedule: [
    {
      departureTime: string;
      arrivalTime: string;
      station: string;
    }
  ];
}

const routerSchema: Schema = new Schema(
  {
    lineNumber: { type: String, required: true },
    name: { type: String, required: true, unique: true },
    statiobs: { type: [String], required: true },
    schedule: { type: [{}], required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<Irouter>("Router", routerSchema);
