import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const EventSchema = new mongoose.Schema(
  {
    date:{
        type:Date,
        required: true,
    },
    title:{
        type:String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    link:{
        type:String,
        required: false,
        validate(value) {
            if (!validator.isURL(value, { protocols: ['http', 'https'], require_protocol: true })) {
              throw new Error("Enter valid url");
            }
          },
    }
   
 
  },
  {
    timestamps: true,
  }
);
export const Event = mongoose.model("Event", EventSchema);