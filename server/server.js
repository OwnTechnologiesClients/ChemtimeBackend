const express = require("express");
const dotenv = require("dotenv");
var cors = require('cors')
const connectionDB = require("./config/dbConnection");
const userRoute = require("./routes/userRoute");
const app = express();

app.use(cors())

app.use(express.json());

dotenv.config({path: "./server/config.env"}); 
const PORT = process.env.PORT || 8000;

connectionDB();
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:5173');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  });

app.use("/api/student", userRoute);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})