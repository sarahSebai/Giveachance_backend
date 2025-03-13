const express = require("express");
const router = express.Router();
const Message = require("../models/message"); // Ensure the correct path

// POST: Create a new message
router.post("/addmessgae", (req, res) => {
  const { lastname, username, email, message , role} = req.body;

  if (!lastname || !username || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const newMessage = new Message({
    lastname,
    username,
    email,
    message,
    role
  });

  newMessage
    .save()
    .then((savedMessage) => {
      res.status(201).json(savedMessage);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
});

// GET: Retrieve all messages


router.get("/", (req, res) => {
  Message.find()
    .sort({ date: -1 }) // Sort by latest
    .then((messages) => {
      res.status(200).json(messages);
    })
    .catch((error) => {
      res
        .status(500)
        .json({ error: "Internal Server Error", details: error.message });
    });
});

module.exports = router;
