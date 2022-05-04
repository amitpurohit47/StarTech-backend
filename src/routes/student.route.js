import express from "express";
import { studentAuth } from "../middleware";
import { createStudent, loginStudent } from "../controllers";
import { Student } from "../models";

const StudentRouter = express.Router();

StudentRouter.post("/signup", createStudent);

StudentRouter.get("/login", studentAuth, loginStudent);

export { StudentRouter };
