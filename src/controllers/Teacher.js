import jwt from "jsonwebtoken";
import { Teacher } from "../models/index.js";

const createTeacher = async (req, res) => {
  const teacher = new Teacher(req.body);
  console.log("sch");
  try {
    await teacher.save();
    const token = await teacher.generateAuthToken();
    console.log("in try teacher", teacher);
    res.status(201).send({ teacher, token });
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

const loginTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findUsingCredentials(
      req.body.email,
      req.body.password
    );
    const token = await teacher.generateAuthToken();
    res.status(200).send({ teacher, token });
  } catch (e) {
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

export { createTeacher, loginTeacher };
