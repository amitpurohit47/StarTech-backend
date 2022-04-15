import express from "express";  

const GeneralRouter = express.Router();

GeneralRouter.get("/", async (req, res) => {
  try {
    res.status(200).send("connection successfull");
  } catch (e) {
    console.log(e);
    res.status(500).send("Internal Server Error");
  }
});

export { GeneralRouter };
