import express from "express";
import { schoolAuth } from "../middleware";
import { createSchool } from "../controllers";
import { School } from "../models";

const SchoolRouter = express.Router();

SchoolRouter.post("/signup", createSchool);

SchoolRouter.get("/login", schoolAuth, createSchool);

export { SchoolRouter };
