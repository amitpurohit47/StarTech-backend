import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const StudyMaterialSchema = new mongoose.Schema(
  {
    classId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },

    subjectArray: [
      {
        title: {
          type: String,
        },
        link: {
          type: String,
          validate(value) {
            if (!validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true })) {
              throw new Error("Enter valid url");
            }
          },
        }
      }
    ]


  },
  {
    timestamps: true,
  }
);
export const StudyMaterial = mongoose.model("StudyMaterial", StudyMaterialSchema);