import mongoose, { Date, Document, Schema } from "mongoose";

// הממשק מגדיר את המבנה של המשתמש
export interface IUser extends Document {
  _id:Schema.Types.ObjectId
  name: string;
  email: string;
  password: string;
  role: Roles;
}

export enum Roles {
  admin = "admin",
  driver = "driver",
  passenger = "passenger",
}

const userSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["admin", "driver", "passenger"] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IUser>("User", userSchema);
