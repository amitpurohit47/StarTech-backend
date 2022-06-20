import express from "express";
import { schoolAuth } from "../middleware";
import { allNotices, createSchool, loginSchool, addFeedback, fetchFeedback, createTeacher, addClass, addEvent } from "../controllers";
import { School } from "../models";

const SchoolRouter = express.Router();
//Add auth controllers @amit purohit
SchoolRouter.post("/signup", createSchool);
SchoolRouter.get("/login", loginSchool);
SchoolRouter.post("/teacher", schoolAuth, createTeacher)
SchoolRouter.get("/notice", schoolAuth, allNotices);
SchoolRouter.post("/feedback", schoolAuth, addFeedback);
SchoolRouter.get("/feedback", schoolAuth, fetchFeedback);
SchoolRouter.post("/class", schoolAuth, addClass);
SchoolRouter.post("/event", schoolAuth, addEvent);

// add teacher, add class( push class in school array), add auth middleware to all routes except auth routes
// remove queries, get post all notices
// createdbyteacher field keep empty for notice
// addevents route
export { SchoolRouter };
