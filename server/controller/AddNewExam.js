const  Addnewexam  = require("../models/AddNewExam");

 const createExam = async (req, res) => {
  try {
    const { exam } = req.body;
    const data = await Addnewexam.create({ exam });   
    await data.save();
    res.status(200).json({
      success: true,
      message: "Exam created successfully",
      data,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createExam };