const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  // description: {
  //   type: String,
  //   default: "",
  //   trim: true,
  // },
  completed: {
    type: Boolean,
    default: false,
  },
  // dueDate: {
  //   type: Date,
  //   default: null,
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Todo", todoSchema);
