import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const ClassSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim: true,
    },
    classTeacherName: {
      type: String,
      trim: true,
      required: true,
    },
    classTeacherEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Enter valid email");
        }
      },
    },
    teachers: [
      {
        classId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Class",
        },
        isClassTeacher: {
          type: Boolean,
          default: false,
        },
      },
    ],
    students: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
        },
      },
    ],
    timeTable: {
      type: String,
      validate(value) {
        if (
          !validator.isURL(value, {
            protocols: ["http", "https"],
            require_protocol: true,
          })
        ) {
          throw new Error("Enter valid url");
        }
      },
    },
  },
  {
    timestamps: true,
  }
);

export const Class = mongoose.model("Class", ClassSchema);
