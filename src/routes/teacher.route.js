import express from "express";
import { teacherAuth } from "../middleware";
import { createTeacher, loginTeacher } from "../controllers";
import { Teacher } from "../models";

const TeacherRouter = express.Router();

//TeacherRouter.post("/signup", createTeacher);

TeacherRouter.get("/login", teacherAuth, loginTeacher);

export { TeacherRouter };
