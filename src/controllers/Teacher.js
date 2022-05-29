import jwt from "jsonwebtoken";
import generator from 'generate-password';
import { Teacher } from "../models/index.js";
import { Class } from "../models/index.js";
import { StudyMaterial } from "../models/index.js";

const addSubjectTeachers = async (req, res) => {
  const subjectTeachers=req.body.subjectTeachers;
  const subjectTitles=[];
  subjectTeachers.map((e,i)=>{
    const temp=new StudyMaterial({subjectTitle:e.subjectTitle})
    subjectTitles.push(temp);
  })
  const classid=req.body.classid;
  try{
    const _class = await Class.find({_id:classid});
  _class.teachers.push(subjectTeachers);
  await _class.save();
    subjectTitles.map(async(e,i)=>{
      _class.studyMaterialId.push(e._id);
      await e.save();
    })
  res.status(201).send({message:"Subject Teachers Added Successfully"});
  }
  catch(err) {
    res.status(500).send({message:"Error While Adding Subject Teachers"});
  }
  
}
const createTeacher = async (req, res) => {
  
  console.log("Create Teacher");
  const teacher = new Teacher(req.body);
  
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

export { createTeacher, loginTeacher, addSubjectTeachers };
