import jwt from "jsonwebtoken";
import { School } from "../models/index.js";

const schoolAuth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const school = School.findOne({
      _id: decodedToken._id,
      "tokens.token": token,
    });

    if (!school) {
      throw new Error();
    }

    req.school = school;
    req.token = token;
    next();
  } catch (e) {
    res.status(401).send({ error: "School Authentication Failed" });
  }
};

export { schoolAuth };
