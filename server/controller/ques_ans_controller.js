const MainModel = require("../models/AddQues&Answr");

const createQuesAndAnswr = async (req, res) => {
  try {
    const {
      subject,
      branchName,
      subtopicName,
      content,
      question,
      options,
      solution,
      selectedExams,
    } = req.body;

    // Check if a matching entry exists in the database
    const existingData = await MainModel.findOne({ subject });

    if (existingData) {
      // Iterate over all selected exams
      for (const exam of selectedExams) {
        // Check if the exam exists in the database
        const examExists = existingData.exams.some((e) => e.name === exam);

        if (examExists) {
          // Update the existing exam structure
          await MainModel.findOneAndUpdate(
            {
              subject,
              "exams.name": exam,
              "exams.branches.name": branchName,
              "exams.branches.subtopics.name": subtopicName,
            },
            {
              $push: {
                "exams.$[exam].branches.$[branch].subtopics.$[subtopic].content.$[content].topics.$[topic].questions":
                  {
                    question,
                    options,
                    solution,
                  },
              },
            },
            {
              arrayFilters: [
                { "exam.name": exam },
                { "branch.name": branchName },
                { "subtopic.name": subtopicName },
                { "content.name": content },
                { "topic.name": content },
              ],
              new: true,
            }
          );
        } else {
          // Add a new exam structure if it doesn't exist
          await MainModel.findOneAndUpdate(
            { subject },
            {
              $push: {
                exams: {
                  name: exam,
                  branches: [
                    {
                      name: branchName,
                      subtopics: [
                        {
                          name: subtopicName,
                          content: [
                            {
                              name: content,
                              topics: [
                                {
                                  name: content,
                                  questions: [
                                    {
                                      question,
                                      options,
                                      solution,
                                    },
                                  ],
                                },
                              ],
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
            { new: true }
          );
        }
      }

      return res.status(200).json({
        success: true,
        message: "Question added or updated successfully for selected exams",
      });
    }

    // If no matching entry exists, create a new structure
    const formattedData = {
      subject,
      exams: selectedExams.map((exam) => ({
        name: exam,
        branches: [
          {
            name: branchName,
            subtopics: [
              {
                name: subtopicName,
                content: [
                  {
                    name: content,
                    topics: [
                      {
                        name: content,
                        questions: [
                          {
                            question,
                            options,
                            solution,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      })),
    };

    const newData = new MainModel(formattedData);
    await newData.save();

    res.status(200).json({
      success: true,
      message: "Question and Answer created successfully",
      newData,
    });
  } catch (error) {
    console.error("Error saving data:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


const getQuesAndAnswr = async (req, res) => {
  try {
    const { subject } = req.params;
    console.log("Subject received:", subject);

    const data = await MainModel.find({});

    if (data) {
      return res.status(200).json(data);
    }

    return res.status(404).json({ success: false, message: "No data found" });
  } catch (error) {
    console.error("Error retrieving data:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

module.exports = { createQuesAndAnswr, getQuesAndAnswr };
