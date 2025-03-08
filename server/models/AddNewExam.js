const mongoose = require("mongoose");

const addnewexamSchema = new mongoose.Schema(
  {
    exam: {
      type: String,
    },
  },
  { timestamps: true }
);

const Addnewexam = mongoose.model("exam", addnewexamSchema);

module.exports = Addnewexam;
