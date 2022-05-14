import { Notice } from "../models/index.js";


const addNotice=async (req, res) => {
    const notice = new Notice(req.body);
    try{
        await notice.save();
        res.status(201).send(notice);
    }
    catch(e)
    {
        res.status(500).send({ error: "Internal Server Error" });
    }
}
const allNotices = async (req, res) => {
    try{
        const notices=await Notice.find({});
        res.status(200).send(notices)
    }
    catch(e)
    {
        res.status(500).send({ error: "Internal Server Error" });
    }
 
}



export {allNotices,addNotice};