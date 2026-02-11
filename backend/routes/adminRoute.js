import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import { getAdminStats } from "../controllers/adminController.js";

const adminRouter = express.Router();

adminRouter.get("/stats", adminAuth, getAdminStats);

export default adminRouter;
