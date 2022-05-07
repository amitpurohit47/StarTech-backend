import jwt from "jsonwebtoken";
import { Attendance } from "../models/index.js";





const addAttendance = async (req, res)=>{
  res.status(200).send({message:"Hello From Add Attendance API"});
}

export {  addAttendance};
