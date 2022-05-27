import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const StudentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
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
    schoolId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "School",
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Class",
    },
    achievements: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        dateOfAchievement: {
          type: Date,
        },
      },
    ],
    tokens: [
      {
        token: {
          required: true,
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

StudentSchema.methods.toJSON = function () {
  const student = this;
  const studentObject = student.toObject();

  delete studentObject.password;
  delete studentObject.tokens;

  return studentObject;
};

StudentSchema.statics.findUsingCredentials = async (email, password) => {
  const lowercaseEmail = email.toLowerCase();
  const student = await Student.findOne({ email: lowercaseEmail });
  if (!student) {
    throw new Error("student not found");
  }

  const isFound = await bcrypt.compare(password, student.password);
  if (!isFound) {
    throw new Error("You have entered wrong password");
  }
  return student;
};

StudentSchema.methods.generateAuthToken = async function () {
  const student = this; //user being generate
  const token = jwt.sign(
    { _id: student._id.toString() },
    process.env.TOKEN_SECRET
  );
  student.tokens = student.tokens.concat({ token });
  await student.save();
  return token;
};

StudentSchema.pre("save", async function (next) {
  const student = this; //user which is being saved
  if (student.isModified("password")) {
    student.password = await bcrypt.hash(student.password, 8);
  }
  next();
});

export const Student = mongoose.model("Student", StudentSchema);
