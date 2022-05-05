import mongoose from "mongoose";
import validator from "validator";

const AttendenceSchema = new mongoose.Schema(
    {
        classId: {
            type: mongoose.Schema.Types.ObjectId,
                    ref: "Class",
        },
        teacherId: {
            type: mongoose.Schema.Types.ObjectId,
                    ref: "Teacher",
        }, 
        attendence: [
            {
                date: {
                    type: Date
                }
            },
        ],
        students: [
            {
                studentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Student",
                },
                count: {
                    type: Number,
                    default: 0,
                }
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const Attendence = mongoose.model("Attendence", AttendenceSchema);