import { Attendance } from "../models/index.js";

const addAttendence = async (req, res) => {
  const attendence = new Attendance(req.body);
  try {
    await attendence.save();
    res.status(201).send(attendence);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchAttendence = async (req, res) => {
  try {
    const attendence = await Attendance.find({});
    res.status(200).send(attendence);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addAttendence, fetchAttendence };
