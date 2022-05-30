import { StudyMaterial } from "../models/index.js";

const addStudyMaterial = async (req, res) => {
  const studyMaterialId=req.body.StudyMaterialId;
  

  try {
    const studyMaterial=await StudyMaterial.findOne({_id: studyMaterialId});
    studyMaterial.docArray.push(req.body.studyMaterial);
    studyMaterial.save();
    res.status(201).send("Study Material Added Successfully")
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
