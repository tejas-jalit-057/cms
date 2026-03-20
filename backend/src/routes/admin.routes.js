import express from "express";
import { getAdmins, updateAdmin } from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", getAdmins);
router.patch("/:id", updateAdmin);

export default router;
