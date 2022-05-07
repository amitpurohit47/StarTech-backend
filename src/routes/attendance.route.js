import express from "express";
import {addAttendance} from "../controllers";




const AttendanceRouter = express.Router();
AttendanceRouter.post("/add",addAttendance);
export {AttendanceRouter}