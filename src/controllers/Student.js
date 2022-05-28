import { Student, Diary } from "../models/index.js";

const createStudent = async (req, res) => {
  const student = new Student(req.body);
  try {
    await student.save();
    const token = await student.generateAuthToken();

    const diary = new Diary({ studentId: req.student._id });
    await diary.save();

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

const addAchievement = async (req, res) => {
  try {
    const student = await Student.findOne({ _id: req.student._id });
    student.achievements.push({
      title: req.body.title,
      description: req.body.description,
      dateOfAchievement: req.body.date,
      document: req.body.document,
    });
    await student.save();
    res.status(200).send({ student });
  } catch (e) {
    res.status(400).send({ error: "Invalid Credentials" });
  }
};

export { createStudent, loginStudent, addAchievement };
