import express from "express";
import { teacherAuth } from "../middleware";
import { createTeacher, loginTeacher, fetchClass, fetchallClasses, addSubjectTeachers, fetchStudyMaterial, addStudyMaterial, addNotice, allNotices, addMark, allMark } from "../controllers";
import { Teacher } from "../models";

const TeacherRouter = express.Router();

TeacherRouter.post("/signup", createTeacher);
TeacherRouter.post("/addSubjectTeachers", addSubjectTeachers);
TeacherRouter.post("/addStudyMaterial", addStudyMaterial);
TeacherRouter.post("/addNotice", addNotice);
TeacherRouter.get("/allNotices", allNotices);
TeacherRouter.post("/addMark", addMark);
TeacherRouter.get("/allMark", allMark);

TeacherRouter.get("/login", teacherAuth, loginTeacher);
TeacherRouter.get("/class", fetchClass);
TeacherRouter.get("/allClasses", fetchallClasses);

export { TeacherRouter };
