const express = require("express");
const dotenv = require("dotenv");
var cors = require("cors");
const connectionDB = require("./config/dbConnection");
const userRoute = require("./routes/userRoute");
const razorRoute = require("./routes/razorpayRoute");
const adminRoute = require("./routes/adminRoute");
const postRoutes = require("./routes/postRoutes")
const categoryRoutes = require("./routes/categoryRoutes")
const adRoutes = require("./routes/AdRoute")
const ScholarshipRoute = require("./routes/scholarshipRoute")
const bodyParser = require("body-parser");
const bookRoute = require("./routes/AddBook");
const addCategoryRouter = require("./routes/AddCategory");
const faq = require("./routes/AddFaq");
const addStudyMaterialRouter = require("./routes/AddStudyMaterial");
const banner = require("./routes/Banner");
const address = require("./routes/address")
const examRoute = require("./routes/AddNewExam");
const branchRoute = require("./routes/AddNewBranch");
const getbranchRoute = require("./routes/AddQues&Answ")
const path = require('path');
const app = express();

// Allow cross-origin-policy
// app.use(cors());

//Get req.body in JSON format
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Confidentail Info
dotenv.config({ path: "./server/config.env" });

const PORT = process.env.PORT || 8000;

// Database connection
connectionDB();

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use(cors({
  origin: '*',  // Replace with your frontend's URL
}));

app.use(express.json({ limit: '150mb' }));
app.use(express.urlencoded({ limit: '150mb', extended: true }));

// Routes
app.use("/api/student", userRoute);
app.use("/api/payment", razorRoute);
app.use("/api/admin", adminRoute);


//New Routes
app.use('/api/posts', postRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/ads', adRoutes);
app.use('/api/scholarship', ScholarshipRoute);

//StudyMaterials
app.use("/api/studyMaterials",bookRoute);
app.use("/api/studyMaterials", addCategoryRouter);
app.use("/api/studyMaterials", faq);
app.use("/api/studyMaterials", addStudyMaterialRouter);
app.use("/api/studyMaterials", banner);
app.use("/api/studyMaterials",address)

//Exams
app.use("/addnewexam", examRoute);
app.use("/addnewbranch", branchRoute);
app.use("/getBranchExam", getbranchRoute);
app.use("/getQuesAndAnsw", getbranchRoute);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
