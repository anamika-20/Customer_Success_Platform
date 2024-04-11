import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute.js";
import projectRoute from "./routes/projectRoute.js";
import stakeHoldersRoute from "./routes/stakeHoldersRoute.js";
import projectStackRoute from "./routes/projectStackRoute.js";
import auditHistoryRoute from "./routes/auditHistoryRoute.js";
import versionHistoryRoute from "./routes/versionHistoryRoute.js";
import riskProfilingRoute from "./routes/riskProfilingRoute.js";
import phaseRoute from "./routes/phaseRoute.js";
import sprintRoute from "./routes/sprintRoute.js";
import teamRoute from "./routes/teamRoute.js";
import resourcesRoute from "./routes/resourcesRoute.js";
import clientFeedbackRoute from "./routes/clientFeedbackRoute.js";
import projectUpdatesRoute from "./routes/projectUpdatesRoute.js";
import momsRoute from "./routes/momsRoute.js";
import extractUserData from "./middlewares/getUserData.js";
import downloadFeature from "./controllers/downloadFeature.js";

dotenv.config();
connectDB();
const app = express();
app.use(express.json());
app.use(cors());
app.use(extractUserData);

app.use("/user", userRoute);
app.use("/project", projectRoute);
app.use("/stakeholders", stakeHoldersRoute);
app.use("/projectstack", projectStackRoute);
app.use("/audithistory", auditHistoryRoute);
app.use("/versionhistory", versionHistoryRoute);
app.use("/riskprofiling", riskProfilingRoute);
app.use("/phase", phaseRoute);
app.use("/sprint", sprintRoute);
app.use("/teams", teamRoute);
app.use("/resources", resourcesRoute);
app.use("/clientfeedback", clientFeedbackRoute);
app.use("/projectupdates", projectUpdatesRoute);
app.use("/moms", momsRoute);

app.get("/", async (req, res) => {
  return res.json({ message: "Welcome to Promact" });
});

// DOWNLOAD ALL CONTENT
app.get("/download-pdf/:proj", downloadFeature);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
