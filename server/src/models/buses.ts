import mongoose, { ObjectId, Schema } from "mongoose";
import { IUser } from "./users";
import { Irouter } from "./routers";

export interface IBuses {
  _id:Schema.Types.ObjectId
  licensePlate: string;
  modelBus: string;
  capacity: number;
  status: Status;
  driverId: IUser["_id"];
  routeId: Irouter["_id"];
}

export enum Status {
  service = "service",
  out_of_service = "out_of_service",
  maintenance = "maintenance",
}

const busesSchema: Schema = new Schema(
  {
    licensePlate: { type: String, required: true },
    modelBus: { type: String, required: true, unique: true },
    capacity: { type: Number, required: true },
    status: {
      type: String,
      enum: ["service", "out_of_service", "maintenance"],
    },
    driverId: { type: Schema.Types.ObjectId },
    routeId: { type: Schema.Types.ObjectId },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IBuses>("Buses", busesSchema);
