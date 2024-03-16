import express from "express";
// import pkg from "express-openid-connect";
import cors from "cors";
// import mongoose, { get } from "mongoose";
import dotenv from "dotenv";
// import User from "../backend/Schemas/User.js";
import connectDB from "./config/db.js";
import clientFeedbackRouter from "./routes/clientFeedbackRouter.js";
import momsRouter from "../backend/routes/momsRouter.js";
import resourcesRouter from "../backend/routes/resourcesRouter.js";
import projectUpdatesRouter from "../backend/routes/projectUpdatesRouter.js";
import approvedTeamsRouter from "../backend/routes/approvedTeamsRouter.js";
import projectRoutes from "../backend/routes/projectRouter.js";
import projectBudgetRoutes from "../backend/routes/projectBudgetRouter.js";
import auditHistoryRouter from "../backend/routes/auditHistoryRouter.js";
import versionHistoryRouter from "../backend/routes/versionHistoryRouter.js";
import techStackRouter from "../backend/routes/techStackRouter.js";
import stakeHoldersRouter from "../backend/routes/stakeHoldersRouter.js";
import financialEscalationMatrixRouter from "../backend/routes/financialEscalationMatrixRouter.js";
import operationalEscalationMatrixRouter from "../backend/routes/operationalEscalationMatrixRouter.js";
import technicalEscalationMatrixRouter from "../backend/routes/technicalEscalationMatrixRouter.js";
import phasesRouter from "../backend/routes/phasesRouter.js";
import riskProfilingRouter from "./routes/riskProfilingRouter.js";
import sprintDetailRouter from "./routes/sprintDetailRouter.js";

import userRouter from "../backend/routes/userRoutes.js";
import downloadFeature from "../backend/controllers/downloadFeature.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());

const corsOptions = {
  origin: "http://localhost:3000/",
};
// // Apply middleware
app.use(cors());

// DOWNLOAD ALL CONTENT
app.get("/download-pdf/:project_id", downloadFeature);
app.use("/user", userRouter);

// Routes
app.use("/api", clientFeedbackRouter);
app.use("/api", momsRouter);
app.use("/api", resourcesRouter);
app.use("/api", projectUpdatesRouter);
app.use("/api", approvedTeamsRouter);
app.use("/api", projectRoutes);
app.use("/api", projectBudgetRoutes);
app.use("/api", auditHistoryRouter);
app.use("/api", versionHistoryRouter);
app.use("/api", techStackRouter);
app.use("/api", stakeHoldersRouter);
app.use("/api", financialEscalationMatrixRouter);
app.use("/api", operationalEscalationMatrixRouter);
app.use("/api", technicalEscalationMatrixRouter);
app.use("/api", phasesRouter);
app.use("/api", riskProfilingRouter);
app.use("/api", sprintDetailRouter);

app.get("/", async (req, res) => {
  return res.json({ hello: "world" });
});
app.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
