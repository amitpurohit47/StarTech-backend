import express from "express";
import { studentAuth } from "../middleware";
import { createStudent, loginStudent, fetchClass, addFeedback, fetchFeedback, allNotices } from "../controllers";  

const StudentRouter = express.Router();

//StudentRouter.post("/signup", createStudent);

StudentRouter.get("/login", studentAuth, loginStudent);

StudentRouter.get("/class", studentAuth, fetchClass);

StudentRouter.post("/feedback", studentAuth, addFeedback);
StudentRouter.get("/feedback", studentAuth, fetchFeedback);

StudentRouter.get("/notice", studentAuth, allNotices);

export { StudentRouter };
