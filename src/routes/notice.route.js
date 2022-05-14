import express from "express";
import { addNotice,allNotices } from "../controllers";


const NoticeRouter = express.Router();
NoticeRouter.post("/add",addNotice);
NoticeRouter.get("/all/",allNotices);
export {NoticeRouter}