import express from "express";
import pkg from "express-openid-connect";
import cors from "cors";
import mongoose, { get } from "mongoose";
import dotenv from "dotenv";
import User from "../backend/Schemas/User.js";
import connectDB from "./config/db.js";
import clientFeedbackRouter from "../backend/routes/clientFeedbackRoutes.js";
import momsRouter from "../backend/routes/momsRouter.js";
import resourcesRouter from "../backend/routes/resourcesRouter.js";
import projectUpdatesRouter from "../backend/routes/projectUpdatesRouter.js";
import approvedTeamsRouter from "../backend/routes/approvedTeamsRouter.js";
import projectRoutes from "../backend/routes/projectRoutes.js";
import userRouter from "../backend/routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000/",
  //   credentials: true,
  //   optionsSuccessStatus: 200,
};
// // Apply middleware
app.use(cors());

// Routes
app.use("/api", clientFeedbackRouter);
app.use("/api", momsRouter);
app.use("/api", resourcesRouter);
app.use("/api", projectUpdatesRouter);
app.use("/api", approvedTeamsRouter);
app.use("/api", projectRoutes);
app.use("/user", userRouter);

app.get("/", async (req, res) => {
  return res.json({ hello: "world" });
});

app.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
