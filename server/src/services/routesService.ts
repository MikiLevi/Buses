import { Response } from "express";
import { generateUserPassword } from "../../helpers/bcrypt";
import Router, { Irouter } from "../models/routers";
import { handleBadRequest } from "../../utils/ErrorHandle";

const getAllRoutes = async () => {
  try {
    const router = await Router.find();
    return router;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const getRouterById = async (routerId: string) => {
  try {
    const router = await Router.findById(routerId);
    if (!router) {
      throw new Error("router not found");
    }
    return router;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const addRouter = async (userData: Irouter) => {
  try {
    const newRouter = new Router(userData);
    await newRouter.save();
    return newRouter;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const updateUser = async (routerId: string, updateData: Partial<Irouter>) => {
  try {
    const existingRouter = await Router.findById(routerId);
    if (!existingRouter) {
      throw new Error("User not found");
    }

    const updatedUser = await Router.findByIdAndUpdate(
      routerId,
      {
        ...updateData,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    return updatedUser;
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};

const deleteRouter = async (userId: string) => {
  try {
    const deletedUser = await Router.findByIdAndDelete(userId);
    if (!deletedUser) {
      throw new Error("User not found");
    }
    return { message: "User deleted successfully" };
  } catch (error: any) {
    return handleBadRequest("MongoDB", error);
  }
};
export { getAllRoutes, getRouterById, addRouter, updateUser, deleteRouter };
