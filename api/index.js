import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";

mongoose.connect(process.env.MONGO).then(() => {
  console.log("Connected to MongoDB");
});
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", userRoute);
app.use("/api", authRoute);

//error middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000 bro");
});
