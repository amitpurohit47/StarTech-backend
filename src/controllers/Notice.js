import { Notice } from "../models/index.js";

const addNotice = async (req, res) => {
  let notice;
  if(req.teacher){
    notice = new Notice({
      ...req.body,
      schoolId: req.teacher.schoolId,
      createdByTeacher: req.teacher._id,
    });
  }else{
    notice = new Notice({
      ...req.body,
      schoolId: req.school._id,
    });
  }  
  try {
    await notice.save();
    res.status(201).send(notice);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const allNotices = async (req, res) => {
  
  try {
    const notices = await Notice.find({
      schoolId: req.school._id,
    })
      .populate("createdByTeacher")
      .populate("schoolId")
      .sort({
        createdAt: 1,
      });
    res.status(200).send(notices);
  } catch (e) {
    console.log(e)
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { allNotices, addNotice };
