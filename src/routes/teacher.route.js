import express from "express";
import { teacherAuth } from "../middleware";
import { createTeacher, loginTeacher, fetchClass, fetchallClasses, addSubjectTeachers, fetchStudyMaterial, addStudyMaterial, addNotice, allNotices, addMark, allMark, addAttendence, addStudents } from "../controllers";
import { Teacher } from "../models";

const TeacherRouter = express.Router();
//Add auth controllers @mayur sarode
TeacherRouter.post("/signup", createTeacher);
TeacherRouter.post("/addSubjectTeachers", addSubjectTeachers);
TeacherRouter.post("/addStudyMaterial", addStudyMaterial);
TeacherRouter.post("/addNotice", addNotice);
TeacherRouter.post("/allNotices", allNotices);
TeacherRouter.post("/addMark", addMark);
// Below Route Will Not Required
// TeacherRouter.get("/allMark", allMark);

TeacherRouter.post("/addAttendence", addAttendence); 
TeacherRouter.post("/addStudents", addStudents); 

TeacherRouter.get("/login", teacherAuth, loginTeacher);
TeacherRouter.post("/class", fetchClass);
TeacherRouter.get("/allClasses", fetchallClasses);

export { TeacherRouter };
