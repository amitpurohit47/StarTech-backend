import jwt from "jsonwebtoken";
import { Diary } from "../models/index.js";





const adddiary = async (req, res) => {
    const {studentId,diaryArray}=req.body;
    const temp={studentId,diaryArray};
    const diary=new Diary(req.body);
    try{
        await diary.save();
        res.status(201).send(diary);
    }
    catch(e)
    {
        res.status(500).send({ error: "Internal Server Error" });
    }
}
const alldiaries = async (req, res) => {
    const studentId = req.params.studentId;
    console.log(studentId);
    try{
        const diaries=await Diary.find({studentId});
        res.status(200).send(diaries)
    }
    catch(e)
    {
        res.status(500).send({ error: "Internal Server Error" });
    }
 
}

export {  alldiaries ,adddiary};
