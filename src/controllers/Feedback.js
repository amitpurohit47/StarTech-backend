import { Feedback } from "../models/index.js";

const addFeedback = async (req, res) => {
  const obj = {
    from: {
      from: req.body.from.from,
      student: req.student._id ? req.student._id : null,
      teacher: req.teacher._id ? req.teacher._id : null,
      school: req.school._id ? req.school._id : null,
    },
    to: {
      to: req.body.to.to,
      us: req.body.to.to == "us" ? true : false,
      teacher: req.body.to.to == "teacher" ? req.body.teacher._id : null,
      school: req.body.to.to == "school" ? req.body.school._id : null,
    },
    issue: req.body.issue,
  };
  const feedback = new Feedback(obj);
  try {
    await feedback.save();
    res.status(201).send(feedback);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const replyFeedback = async (req, res) => {
  try {
    const feedback = new Feedback.findOne({ _id: req.body._id });
    feedback.reply = req.body.reply;
    await feedback.save();
    res.status(201).send(feedback);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

const fetchFeedback = async (req, res) => {
  try {
    const feedbacks = [];
    if (req.student._id) {
      const temp = await Feedback.find({
        from: {
          student: req.student._id,
        },
      });

      feedbacks.push(temp);
    }

    if (req.teacher._id) {
      const temp = await Feedback.find({
        from: {
          teacher: req.teacher._id,
        },
      });
      feedbacks.push(temp);

      const temp2 = await Feedback.find({
        to: {
          teacher: req.teacher._id,
        },
      });
      feedbacks.push(temp2);
    }

    if (req.school._id) {
      const temp = await Feedback.find({
        from: {
          school: req.school._id,
        },
      });
      feedbacks.push(temp);

      const temp2 = await Feedback.find({
        to: {
          school: req.school._id,
        },
      });
      feedbacks.push(temp2);
    }

    res.status(200).send(feedbacks);
  } catch (e) {
    res.status(500).send({ error: "Internal Server Error" });
  }
};

export { addFeedback, replyFeedback, fetchFeedback };
