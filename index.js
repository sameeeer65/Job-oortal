import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.route.js"; 
import jobRoute from "./routes/job.route.js";   
import applicationRoute from "./routes/application.route.js";   
import path from "path";

//connect to MongoDB
dotenv.config({});
const app = express();
//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
    origin: ["https://job-oortal-4.onrender.com"],
    credentials: true,
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 5001;

 //api's

app.use("/api/users", userRoute);
app.use("/api/company", companyRoute);
app.use("/api/job", jobRoute);
app.use("/api/application", applicationRoute);




// ------- code for deployment --------
if(process.env.NODE_ENV === "production"){
const dirpath = path.resolve();
app.use(express.static('./Frontend/dist'));
app.use((req, res) => {
    res.status(200).sendFile(path.resolve(dirpath, './Frontend/dist/index.html'));
});
}

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});