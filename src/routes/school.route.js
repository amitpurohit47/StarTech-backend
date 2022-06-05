import express from "express";
import { schoolAuth } from "../middleware";
import { allNotices, createSchool, loginSchool, addQuery, allQueries } from "../controllers";
import { School } from "../models";

const SchoolRouter = express.Router();

SchoolRouter.post("/signup", createSchool);
SchoolRouter.get("/login", schoolAuth, loginSchool);
SchoolRouter.get("/notice", allNotices);
SchoolRouter.post("/query", addQuery);
SchoolRouter.get("/query", allQueries);

export { SchoolRouter };
