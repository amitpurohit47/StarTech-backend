import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const MarkSchema = new mongoose.Schema(
  {
    testTitle: {
      type: String,
      trim: true,
      required: true,
    },
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    marksArray: [
      {
        subject: {
          type: String
        },
        outOf: {
          type: Number
        },
        studentMarks: {
          type: Number
        }
      }
    ]


  },
  {
    timestamps: true,
  }
);
export const Mark = mongoose.model("Mark", MarkSchema);