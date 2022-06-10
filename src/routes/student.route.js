import express from "express";
import { studentAuth } from "../middleware";
import { createStudent, loginStudent, fetchClass, addFeedback, fetchFeedback, allNotices, addDiary, fetchDiary, addAchievement } from "../controllers";  

const StudentRouter = express.Router();

//StudentRouter.post("/signup", createStudent);

StudentRouter.get("/login", loginStudent);

StudentRouter.get("/class", studentAuth, fetchClass);

StudentRouter.post("/feedback", studentAuth, addFeedback);
StudentRouter.get("/feedback", studentAuth, fetchFeedback);

StudentRouter.get("/notice", studentAuth, allNotices);

StudentRouter.put("/diary", studentAuth, addDiary);
StudentRouter.get("/diary", studentAuth, fetchDiary);

StudentRouter.post("/achievement", studentAuth, addAchievement);
export { StudentRouter };
