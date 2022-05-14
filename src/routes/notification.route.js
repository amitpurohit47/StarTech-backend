import express from "express";
import { addNotification ,allNotifications} from "../controllers";


const NotificationRouter = express.Router();
NotificationRouter.post("/add",addNotification);
NotificationRouter.get("/all",allNotifications);
export {NotificationRouter}