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
import checkAdmin from "./middlewares/check-admin.js";
// import { findOne, create, find } from "../models/userModel";

dotenv.config();
connectDB();
const app = express();

// mongoose.connect(process.env.MONGOURL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));
// db.once("open", function () {
//   console.log("Connected to MongoDB");
// });
// const PORT = process.env.PORT || 4500;
// const URL = process.env.MONGOURL;

// mongoose
//   .connect(URL)
//   .then(() => {
//     console.log("DB connected Successfully");

//     app.listen(PORT, () => {
//       console.log(`Server running on http://localhost:${PORT}`);
//     });
//   })
//   .catch((error) => console.log(error));

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


// The `auth` router attaches /login, /logout
// and /callback routes to the baseURL
app.use(auth(config));
// app.get("/user-info", async (req, res) => {
//   try {
//     const userInfo = await req.oidc.fetchUserInfo();
//     res.json(userInfo);
//   } catch (error) {
//     console.log(error);
//   }
// });

// Middleware
app.use(express.json());
// Routes
// app.use("/api", checkAdmin, clientFeedbackRouter);
app.use("/api", clientFeedbackRouter);
app.use("/api", momsRouter);
app.use("/api", resourcesRouter);
app.use("/api", projectUpdatesRouter);
app.use("/api", approvedTeamsRouter);
app.use("/user", userRouter);

// app.get("/user-info", async (req, res) => {
//   try {
//     res.json({ data: req.oidc.user });
//     return;
//     if (req.oidc.isAuthenticated()) {
//       const { email } = req.oidc.user;
//       const user = await User.findOne({ email });
//       return res.json({ data: user, status: "loggedin" });
//     } else {
//       return res.json({ status: "loggedout" });
//     }
//   } catch (error) {
//     return res.send(error);
//   }
// });
// req.oidc.isAuthenticated is provided from the auth router
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
      //
      // const userExists = await findOne({ email });
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

// import express from "express";
// import session from "express-session";
// import authRoutes from "./routes/authRoutes.js";

// require("dotenv").config();

// const app = express();

// // Configure session
// app.use(
//   session({
//     secret: process.env.SECRET_SESSION,
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// // Use auth routes
// app.use("/", authRoutes);

// // Start server
// const PORT = process.env.PORT || 4500;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

// // import express from "express";
// // import mongoose from "mongoose";
// // import bodyParser from "body-parser";
// // import dotenv from "dotenv";
// // import corse from "cors";

// // const app = express();
// // app.use(bodyParser.json());
// // app.use(corse());
// // dotenv.config();

// // const PORT = process.env.PORT || 4500;
// // // const URL = process.env.MONGOURL;

// // // mongoose
// // //   .connect(URL)
// // //   .then(() => {
// // //     console.log("DB connected Successfully");

// // app.listen(PORT, () => {
// //   console.log(`Server running on http://localhost:${PORT}`);
// // });
// // // })
// // // .catch((error) => console.log(error));

// // // connect("mongodb://localhost:27017/collectionName", {
// // //    useNewUrlParser: true,
// // //    useUnifiedTopology: true
// // // });
