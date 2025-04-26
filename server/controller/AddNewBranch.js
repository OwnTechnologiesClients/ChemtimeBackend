const Addnewbranches = require("../models/AddNewBranches");

 const createBranch = async (req, res) => {
  try {
    const { branch } = req.body;

    const existingBranch = await Addnewbranches.findOne({ branch });

    if (existingBranch) {
      return res.status(400).json({
        success: false,
        message: "Branch already exists",
      });
    }
    const Newbranch = new Addnewbranches({ branch });
    await Newbranch.save();

    res.status(200).json({
      success: true,
      message: "Branch created successfully",
      Newbranch,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createBranch };