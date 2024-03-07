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
import userRouter from "../backend/routes/userRoutes.js";

dotenv.config();
connectDB();
const app = express();

const { auth, requiresAuth } = pkg;
app.use(cors());
const config = {
  authRequired: false,
  auth0Logout: true,
  baseURL: "http://localhost:8080",
  clientID: "6eCRW4qoC5Lyyn7kJdRE4dVJNAt7Jcdb",
  issuerBaseURL: "https://dev-3esj1ci31pl5sjji.us.auth0.com",
  // secret: "6b25b374101d391f0ea072d7bd2d908b0f25098893ace5ddca10e2a37630d2db",
  secret: "zaaFDXNprscd0Gnq7YAUjCA-WY6qIPe7S_Fa5ItrQgQsP-z1deSHHbl94jqmr_jW",
};

app.use(auth(config));
app.use(express.json());
// Routes
app.use("/api", clientFeedbackRouter);
app.use("/api", momsRouter);
app.use("/api", resourcesRouter);
app.use("/api", projectUpdatesRouter);
app.use("/api", approvedTeamsRouter);
app.use("/user", userRouter);

app.get("/to-home", async (req, res) => {
  return res.redirect("http://localhost:3000/");
});
app.get("/", async (req, res) => {
  // console.log({ res }, { req });
  try {
    console.log(req.oidc.user);
    if (req.oidc.isAuthenticated()) {
      const { email } = req.oidc.user;
      console.log(req.oidc.user);
      if (!email) {
        return res.status(400);
      }

      const userExists = await User.findOne({ email });

      if (userExists) {
        res.status(400);
        return res.redirect("http://localhost:3000/");
      }
      const user = await User.create({ email });
      if (user) {
        return res
          .status(201)
          .json({
            email: user.email,
          })
          .redirect("http://localhost:3000/");
      }
      res.status(400);
      return res.send("Failed to create user");
    } else {
      return res.redirect("http://localhost:3000/");
    }
  } catch (error) {
    return res.send(error);
  }
});

app.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
