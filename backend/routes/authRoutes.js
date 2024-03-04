// // authRoutes.js

// import { Router } from "express";
// const router = Router();
// import { AuthenticationClient } from "auth0";
// require("dotenv").config();

// const auth0 = new AuthenticationClient({
//   domain: process.env.AUTH0_DOMAIN,
//   clientId: process.env.AUTH0_CLIENT_ID,
//   clientSecret: process.env.AUTH0_CLIENT_SECRET,
// });

// // Route for initiating authentication
// router.get("/login", (req, res) => {
//   const loginUrl = auth0.buildAuthorizeUrl({
//     responseType: "code",
//     redirectUri: process.env.AUTH0_CALLBACK_URL,
//     scope: "openid email profile",
//   });
//   res.redirect(loginUrl);
// });

// // Callback route after authentication
// router.get("/callback", async (req, res) => {
//   const { code } = req.query;
//   try {
//     const tokenData = await auth0.authorizationCodeGrant({
//       code,
//       redirect_uri: process.env.AUTH0_CALLBACK_URL,
//     });
//     // Token data contains user information, implement your logic here
//     res.json(tokenData);
//   } catch (error) {
//     console.error("Error exchanging code for token:", error);
//     res.status(500).send("An error occurred");
//   }
// });

// // Route for logging out
// router.get("/logout", (req, res) => {
//   // Implement logout logic here
// });

// export default router;

// // const { auth } = require("express-openid-connect");
// // import dotenv from "dotenv";

// // const express = require("express");
// // const router = express.Router();

// // dotenv.config();
// // const config = {
// //   authRequired: false,
// //   auth0Logout: true,
// //   //   secret: "6b25b374101d391f0ea072d7bd2d908b0f25098893ace5ddca10e2a37630d2db",
// //   //   baseURL: "http://localhost:8080",
// //   //   clientID: "SNqb1I5wlMO3wWlOtlKbP9euU2U4JbXv",
// //   //   issuerBaseURL: "https://dev-3esj1ci31pl5sjji.us.auth0.com",

// //   secret: process.env.SECRET_SESSION,
// //   baseURL: process.env.BASE_URL,
// //   clientID: process.env.CLIENT_ID,
// //   issuerBaseURL: process.env.ISSUE_BASE_URL,
// // };

// // // auth router attaches /login, /logout, and /callback routes to the baseURL
// // app.use(auth(config));
// // // router.get('/checkLoginStatus',(req,res)=>{
// // //     res.send(req.)
// // // })

// // // req.isAuthenticated is provided from the auth router
// // app.get("/", (req, res) => {
// //   res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
// // });
