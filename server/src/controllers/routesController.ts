import express, { IRouter, Request, Response } from "express";
import {
  getAllRoutes,
  getRouterById,
	addRouter,
  updateUser,
  deleteRouter,
} from "../services/routesService";
import { handleError } from "../../utils/ErrorHandle";

const router: IRouter = express.Router();

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const router = await getAllRoutes();
    res.json(router);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.get("/:routeId", async (req: Request, res: Response): Promise<void> => {
  try {
    const router = await getRouterById(req.params.id);
    res.json(router);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await addRouter(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.patch("/:routeId", async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedUser = await updateUser(req.params.id, req.body);
    res.json(updatedUser);
  } catch (error: any) {
    handleError(res, error.status || 400, error.message);
  }
});

router.delete("/:routeId", async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await deleteRouter(req.params.id);
    res.json(result);
  } catch (error: any) {
    handleError(res, error.status || 404, error.message);
  }
});

export default router;
