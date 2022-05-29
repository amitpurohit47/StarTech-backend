import mongoose from "mongoose";
import validator from "validator";

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
        teacherId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Teacher",
        }, 
        subject: {
          type: String,
        }
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
    studyMaterialId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "StudyMaterial",
    },
    markArr: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mark",
      },
    ],
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Class = mongoose.model("Class", ClassSchema);
