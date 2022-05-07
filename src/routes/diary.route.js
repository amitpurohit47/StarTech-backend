import express from "express";
import { alldiaries,adddiary } from "../controllers";


const DiaryRouter = express.Router();
DiaryRouter.post("/add",adddiary);
DiaryRouter.get("/all/:studentId",alldiaries);
export {DiaryRouter}