import jwt from "jsonwebtoken";
import { Teacher } from "../models/index.js";

const teacherAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const teacher = Teacher.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });

    if (!teacher) {
      throw new Error();
    }

    req.teacher = teacher;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "Teacher Authentication Failed" });
  }
};

export default teacherAuth;
