import jwt from "jsonwebtoken";
import generator from 'generate-password';
import { Teacher } from "../models/index.js";

const addSubjectTeacherHelper=async(req,res)=>{
  var password = generator.generate({
    length: 10,
    numbers: true
  });
  console.log(password);
  req.password=password;
  
  const teacher = new Teacher(req);
  
  try {
    await teacher.save();
    const token = await teacher.generateAuthToken();
    console.log("in try teacher", teacher);
    
    // res.status(201).send({ teacher, token });
    return {status:201,message:{teacher:req,token}};
  } catch (e) {
    console.log(e);
    if (e.keyPattern?.email === 1) {
      // res.status(400).send({
      //   error: "Email Already Exists",
      // });
      return {status: 400,message: "Email already exists"}
    }
    // res.status(500).send({ error: "Internal Server Error" });
    return {status:500,message:"Internal Server Error" }
  }
}

const addSubjectTeachers = async (req, res) => {
  console.log(req.body);
  const temp=req.body.subjectTeachers;
  var promises = temp.map(async(e,i)=>{
    return addSubjectTeacherHelper(e,res);
  })

  Promise.all(promises).then(function(results) {
    var response=[]
    for(var i=0; i<results.length; i++)
    {
      var e=results[i]
      if(e.status!=201)
      {
        res.status(e.status).send({ error: e.message });
        return;
      }
      else{
        response.push(e.message.teacher)
      }
    }
    res.status(201).send({message:"Added Successfully",teachers:response});
})
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
