const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: { type: String }, // Question text
  options: { type: [String], default: [] }, // Options for the question
  solution: { type: String }, // Correct answer
});

const topicSchema = new mongoose.Schema({
  name: { type: String }, // Topic name (e.g., Structure and Bonding)
  exams: { type: [String], default: [] }, // Related exams (e.g., CSIR, GATE)
  questions: [questionSchema], // Array of questions
});

const nestedContentSchema = new mongoose.Schema({
  name: { type: String }, // Name of the content (e.g., XYZ, ABC)
  topics: [topicSchema],
});

const subtopicSchema = new mongoose.Schema({
  name: { type: String }, // Subtopic name (e.g., Atomic Size)
  content: [nestedContentSchema], // Array of nested content
});

const branchSchema = new mongoose.Schema({
  name: { type: String }, // Branch name (e.g., Inorganic Chemistry)
  subtopics: [subtopicSchema], // Array of topics
});

const examSchema = new mongoose.Schema({
  name: { type: String }, // Exam name (e.g., CSIR, IIT-JAM)
  branches: [branchSchema], // Array of branches
});

const mainSchema = new mongoose.Schema(
  {
    subject: { type: String }, // Subject name (e.g., Chemical Science)
    exams: [examSchema], // Array of exams
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

const MainModel = mongoose.model("maindata", mainSchema);

module.exports = MainModel;