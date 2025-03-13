const mongoose = require("mongoose");

const messageShema = mongoose.Schema({
  lastname: String,
  username: String,
  email: String,
  message: String,
  role: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

const Message = mongoose.model("messages", messageShema);

module.exports = Message;
