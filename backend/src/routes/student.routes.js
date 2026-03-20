import express from "express";
import { createStudent, deleteStudent, getStudents, updateStudent } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/", getStudents);
router.post("/", createStudent);
router.patch("/:id", updateStudent);
router.delete("/:id", deleteStudent);

export default router;