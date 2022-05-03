import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const FeedbackSchema = new mongoose.Schema(
  {
    // Doubt in "studentId || teacherId || schoolId"
    studentid: {
      type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
    },
    teacherid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
    },
    schoolid:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    issue:{
        type: String,
        trim: true,
        required: true,
    },
    for:{
        // Doubt in "school || cc || subject teacher || admin"
        type: String,
        trim: true,
        required: true,
    },
   
    
    
  },
  {
    timestamps: true,
  }
);

export const Feedback = mongoose.model("Feedback", FeedbackSchema);