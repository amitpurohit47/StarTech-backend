import { Query } from "../models/Query";

const addQuery = async (req, res) => {
  const query = new Query(req.body);
  try {
    await query.save();
    res.status(201).send(query);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server error" });
  }
};

const allQueries = async (req, res) => {
  try {
    const queries = await Query.find().sort({ createdAt: 0 });
    res.status(200).send(queries);
  } catch (error) {
    console.error(error.message);
    res.status(500).send({ error: "Internal Server error" });
  }
};

export { addQuery, allQueries };
