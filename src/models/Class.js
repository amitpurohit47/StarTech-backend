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
        password: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
                if (value.length < 6) {
                    throw new Error("Enter a strong password");
                }
            },
        },
        teachers: [
            {
                classId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Class",
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
       

    },
    {
        timestamps: true,
    }
);

export const Class = mongoose.model("Class", ClassSchema);