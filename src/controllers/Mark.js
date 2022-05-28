import { Mark } from "../models/index.js";
const addMark=async(req,res) => {
    const mark = new Mark(req.body);
      try {
        await mark.save();
        res.status(201).send(mark);
      } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
      }
};

const allMark= async (req, res) => {
    console.log("All Marks")
    try {
        const marks = await Mark.find({});
        res.status(200).send(marks);
      } catch (e) {
        res.status(500).send({ error: "Internal Server Error" });
      }
}

export { addMark , allMark};
