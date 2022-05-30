import { Class } from "../models/index.js";

const addClass = async (req, res) => {
  const _class = new Class(req.body);
  try {
    await _class.save();
    res.status(201).send(_class);
  } catch (e) {
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
  console.log("Hello");
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
