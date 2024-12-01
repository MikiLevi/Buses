import { Response } from "express";
import { generateUserPassword } from "../../helpers/bcrypt";
import Bus, { IBuses } from "../models/buses";
import { handleBadRequest } from "../../utils/ErrorHandle";

const getAllBuses = async () => {
  try {
    const users = await Bus.find();
    return users;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getBusById = async (busId: string) => {
  try {
    const bus = await Bus.findById(busId);
    if (!bus) {
      throw new Error("Bus not found");
    }
    return bus;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const addBus = async (busData: IBuses) => {
  try {
    if (
      !busData.capacity ||
      !busData.licensePlate ||
      !busData.modelBus ||
      !busData.status
    ) {
      throw new Error("Missing required fields");
    }
    const newBus = new Bus(busData);
    await newBus.save();
    return newBus;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateBus = async (busId: string, updateData: Partial<IBuses>) => {
  try {
    const existingBus = await Bus.findByIdAndUpdate(busId);
    if (!existingBus) {
      throw new Error("Bus not found");
    }

    const updatedBus = await Bus.findByIdAndUpdate(busId, {
      new: true,
      runValidators: true,
    });
    return updatedBus;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteBus = async (busId: string) => {
  try {
    const deletedBus = await Bus.findByIdAndDelete(busId);
    if (!deletedBus) {
      throw new Error("Bus not found");
    }
    return { message: "Bus deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};
export { getAllBuses, getBusById, addBus, updateBus, deleteBus };
