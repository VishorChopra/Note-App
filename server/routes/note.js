import express from "express";
import Note from "../models/Note.js";
import middleware from "../middleware/middleware.js";

const router = express.Router();

router.post("/add", middleware, async (req, res) => {
  try {
    const { title, description } = req.body;

    const newNote = new Note({
      title,
      description,
      userId: req.user.id,
    });

    await newNote.save();

    return res
      .status(200)
      .json({ success: true, message: "Note Create Successfully" });
  } catch (error) {
    console.log(error.message);
    return res
      .status(500)
      .json({ success: false, message: "Error in Adding Note" });
  }
});

router.get("/", middleware, async (req, res) => {
  try {
    console.log(req.user);
    const notes = await Note.find({ userId: req.user.id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "can't retrive nores" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndUpdate(id, req.body);
    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "can't update nores" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updateNote = await Note.findByIdAndDelete(id);
    return res.status(200).json({ success: true, updateNote });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "can't delete nores" });
  }
});

export default router;
