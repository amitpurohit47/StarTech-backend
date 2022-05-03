import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const NoticeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    message:{
        type: String,
        trim: true,
        required: true,
    },
   
 
  },
  {
    timestamps: true,
  }
);
export const Notice = mongoose.model("Notice", NoticeSchema);