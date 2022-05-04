import jwt from "jsonwebtoken";
import { Student } from "../models/index.js";

const createStudent = async (req, res) => {
  const student = new Student(req.body);
  console.log("sch");
  try {
    await student.save();
    const token = await student.generateAuthToken();
    console.log("in try student", student);
    res.status(201).send({ student, token });
  } catch (e) {
    console.log(e);
    if (e.keyPattern?.email === 1) {
      res.status(400).send({
        error: "Email Already Exists",
      });
    }
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const loginStudent = async (req, res) => {
  try {
    const student = await Student.findUsingCredentials(
      req.body.email,
      req.body.password
    );
    const token = await student.generateAuthToken();
    res.status(200).send({ student, token });
  } catch (e) {
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

export { createStudent, loginStudent };
