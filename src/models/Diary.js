import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const DiarySchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    diaryArray: [
      {
        message: {
          type: String,
        },
        authorId: {
          type: mongoose.Schema.Types.ObjectId,
          // What should be the value of ref ???
        }
      }
    ]


  },
  {
    timestamps: true,
  }
);
export const Diary = mongoose.model("Diary", DiarySchema);