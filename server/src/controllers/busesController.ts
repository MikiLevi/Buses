import express, { IRouter, Request, Response } from "express";
import {
  getAllBuses,
  getBusById,
  addBus,
  updateBus,
  deleteBus,
} from "../services/busesService";
import { handleError } from "../../utils/ErrorHandle";

const router: IRouter = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllBuses();
    res.json(users);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:budId", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await getBusById(req.params.id);
    res.json(user);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await addBus(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.patch("/:busId", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await updateBus(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.delete("/:busId", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteBus(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
