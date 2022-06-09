import { Student, Diary } from "../models/index.js";
import {generatePassword} from '../util/generatepassword.js'

const addStudentsHelper=async(req,res)=>{
  var password = generatePassword();
  console.log(password);
  req.password=password;

  const student = new Student(req);

  try {
    await student.save();
    const token = await student.generateAuthToken();
    // student.password=password;
    // var temp=student;
    // temp['testing']=password;
    // console.log("in try student", temp);
    // Object.assign(student, {mayur:password});

    
    return {status:201,message:{student:req,token}};
  } catch (e) {
    console.log(e);
    if (e.keyPattern?.email === 1) {
      return {status: 400,message: "Email already exists"}
    }
    return {status:500,message:"Internal Server Error" }
  }
}


const addStudents = async (req, res) => {
  console.log(req.body);
  // return;
  const temp = req.body.students;
  var promises = temp.map(async (e, i) => {
    return addStudentsHelper(e, res);
  })

  Promise.all(promises).then( (results)=> {
    var response = []
    for (var i = 0; i < results.length; i++) {
      var e = results[i]
      if (e.status != 201) {
        res.status(e.status).send({ error: e.message });
        return;
      }
      else {
        console.log("hello")
        // console.log(e.message.student);
        response.push(e.message.student)
      }
    }
    // console.log(response);
    res.status(201).send({ message: "Added Successfully", students: response });
  })
}

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

export { createStudent, loginStudent, addAchievement, addStudents };
