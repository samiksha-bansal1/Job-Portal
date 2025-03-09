import dotenv from "dotenv";
import express from "express";
import connectDB from "./db/db.js";
import cors from "cors";
import cookieParse from "cookie-parser";
import userRouter from "./routes/user.routes.js";
import companyRouter from "./routes/company.routes.js";
import jobRouter from "./routes/job.routes.js";
import applicationRouter from "./routes/application.routes.js";
import path from "path";

const _dirname = path.resolve();
const app = express();
dotenv.config()
connectDB();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParse());


const corsOptions = {
  origin: "https://yt-mern-job-portal.onrender.com",
  credentials: true,
};

app.use(cors(corsOptions));


//routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/company", companyRouter);
app.use("/api/v1/job", jobRouter);
app.use("/api/v1/application", applicationRouter);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get("*", (req,res) =>{
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"))
} )

app.listen(PORT, () => {
  console.log(`Server running on port at ${PORT}`);
});
