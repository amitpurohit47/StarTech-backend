import express from "express";
import { teacherAuth } from "../middleware";
import { createTeacher, loginTeacher, fetchClass, fetchallClasses, addSubjectTeachers } from "../controllers";
import { Teacher } from "../models";

const TeacherRouter = express.Router();

TeacherRouter.post("/signup", createTeacher);
TeacherRouter.post("/addSubjectTeachers", addSubjectTeachers);

TeacherRouter.get("/login", teacherAuth, loginTeacher);
TeacherRouter.get("/class", fetchClass);
TeacherRouter.get("/allClasses", fetchallClasses);

export { TeacherRouter };
