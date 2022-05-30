import { Student } from "../models/index.js";

const addAttendence = async (req, res) => {
  try {
    for (var i = 0; i < req.body.students.length(); i++) {
      const student = Student.findOne({ _id: req.body.students[i] });
      //find j in attendence i.e. req.teacher._id matches with teacherId of j.
      //add date to attendence array
      await student.save();
    }
    res.status(201).send("Attendence updated");
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addAttendence };
