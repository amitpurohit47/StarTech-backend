import { Notice } from "../models/index.js";

const addNotice = async (req, res) => {
  const notice = new Notice({
    ...req.body,
    createdByTeacher: req.teacher ? req.teacher._id : null,
  });
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
      schoolId: req.body._id,
    })
      .populate("createdByTeacher")
      .populate("schoolId")
      .sort({
        createdAt: 1,
      });
    res.status(200).send(notices);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { allNotices, addNotice };
