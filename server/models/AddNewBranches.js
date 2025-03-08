const mongoose = require("mongoose");

const addNewBranchSchema = new mongoose.Schema(
  {
    branch: {
      type: String,
    },
  },
  { timestamps: true }
);

const AddNewBranch = mongoose.model("branch", addNewBranchSchema);
module.exports = AddNewBranch;
