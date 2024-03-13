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
app.use(express.json());

// const { auth, requiresAuth } = pkg;
// app.use(cors());
// const config = {
//   authRequired: false,
//   auth0Logout: true,
//   baseURL: "http://localhost:8080",
//   clientID: "6eCRW4qoC5Lyyn7kJdRE4dVJNAt7Jcdb",
//   issuerBaseURL: "https://dev-3esj1ci31pl5sjji.us.auth0.com",
//   // secret: "6b25b374101d391f0ea072d7bd2d908b0f25098893ace5ddca10e2a37630d2db",
//   secret: "zaaFDXNprscd0Gnq7YAUjCA-WY6qIPe7S_Fa5ItrQgQsP-z1deSHHbl94jqmr_jW",
// };

// app.use(auth(config));

const corsOptions = {
  origin: "http://localhost:3000/",
  //   credentials: true,
  //   optionsSuccessStatus: 200,
};
// // Apply middleware
app.use(cors());
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
//   next();
// });
// app.all("/", function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.header("Access-Control-Allow-Methods", "POST, PUT, DELETE, OPTIONS, GET");
//   next();
// });
// Routes
app.use("/api", clientFeedbackRouter);
app.use("/api", momsRouter);
app.use("/api", resourcesRouter);
app.use("/api", projectUpdatesRouter);
app.use("/api", approvedTeamsRouter);
app.use("/user", userRouter);

app.get("/", async (req, res) => {
  return res.json({ hello: "world" });
});
// app.get("/get-role", async (req, res) => {
//   try {
//     if (req.oidc.isAuthenticated()) {

//       const userExists = await User.findOne({ email });

//       if (userExists) {
//         res.status(400);
//         return res.redirect("http://localhost:3000/");
//       }
//       const user = await User.create({ email });
//       if (user) {
//         return res
//           .status(201)
//           .json({
//             email: user.email,
//           })
//           .redirect("http://localhost:3000/");
//       }
//       res.status(400);
//       return res.send("Failed to create user");
//     } else {
//       return res.redirect("http://localhost:8080/login");
//     }
//   } catch (error) {
//     return res.send(error);
//   }
// });

app.listen(8080, function () {
  console.log("Listening on http://localhost:8080");
});
