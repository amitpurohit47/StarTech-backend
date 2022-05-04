import express from "express";
import { schoolAuth } from "../middleware";
import { createSchool, loginSchool } from "../controllers";
import { School } from "../models";

const SchoolRouter = express.Router();

SchoolRouter.post("/signup", createSchool);

SchoolRouter.get("/login", schoolAuth, loginSchool);

export { SchoolRouter };
