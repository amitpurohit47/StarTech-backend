import { Class, School, Teacher } from "../models/index.js";

const addClass = async (req, res) => {
  try {
    const classTeacher = await Teacher.findOne({ name: req.body.classTeacher });
    const body = {
      className: req.body.className,
      classTeacherId: classTeacher._id,
    };
    const _class = new Class(body);
    await _class.save();
    const school = await School.findById(req.school._id);
    school.classes.push(_class);
    await school.save();
    res.status(201).send(_class);
  } catch (e) {
    console.log(e);
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchallClasses = async (req, res) => {
  console.log("HelloAll");
  try {
    const _class = await Class.find({})
      .populate("teachers")
      .populate("students")
      .populate("studyMaterialId")
      .populate("markArr");
    res.status(200).send(_class);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchClass = async (req, res) => {
  try {
    const _class = await Class.findOne({
      _id: req.body.id,
    })
      .populate("teachers")
      .populate("students")
      .populate("studyMaterialId")
      .populate("markArr")
      .populate("events");
    res.status(200).send(_class);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addClass, fetchClass, fetchallClasses };
