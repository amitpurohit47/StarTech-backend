import { StudyMaterial } from "../models/index.js";

const addStudyMaterial = async (req, res) => {
  const studyMaterial = new StudyMaterial(req.body);
  try {
    await studyMaterial.save();
    res.status(201).send(studyMaterial);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchStudyMaterial = async (req, res) => {
  try {
    const studyMaterial = await StudyMaterial.find({});
    res.status(200).send(studyMaterial);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addStudyMaterial, fetchStudyMaterial };
