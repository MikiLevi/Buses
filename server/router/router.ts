import express, { IRouter, NextFunction, Request, Response } from "express";
import userContoller from "../src/controllers/usersContoller";
import busController from "../src/controllers/busesController";
import rontrController from "../src/controllers/routesController";
import { verifyAdmin, verifyUser } from "../helpers/jwt";
import { handleError } from "../utils/ErrorHandle";

const router: IRouter = express.Router();

router.use("/user", verifyUser as NextFunction, userContoller);
router.use("/admin-role", verifyAdmin as NextFunction, userContoller);
router.use("/user", userContoller);
router.use("/buses", busController);
router.use("/routes", rontrController);

router.use((req: Request, res: Response) => {
  handleError(res, 404, "Miki is not found at Nimrodi Tower");
});

export default router;
