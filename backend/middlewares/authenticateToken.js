// import jwt from "jsonwebtoken";

// const authenticateToken = (req, res, next) => {
//   const token =
//     req.headers.authorization && req.headers.authorization.split(" ")[1]; // Get token from Authorization header
//   console.log(process.env.AUTH0_SECRET);
//   if (!token) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   jwt.verify(token, process.env.AUTH0_SECRET, (err, decoded) => {
//     console.log(decoded);
//     if (err) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }
//     // Token is valid, store user information in request object for future use
//     req.user = decoded;
//     next(); // Proceed to the next middleware or route handler
//   });
// };

// export default authenticateToken;

import jwt from "jsonwebtoken";

const authenticateToken = (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(" ")[1]; // Get token from Authorization header
  console.log("Token:", token); // Log token value

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  console.log("Auth0 Secret:", process.env.AUTH0_SECRET); // Log Auth0 secret

  jwt.verify(
    token,
    process.env.AUTH0_SECRET,
    // { audience: "http://localhost:8080/" },
    { algorithms: ["RS256"] },
    (err, decoded) => {
      if (err) {
        console.error("JWT Verification Error:", err); // Log verification error
        return res.status(401).json({ message: "Unauthorized" });
      }
      console.log("Decoded:", decoded); // Log decoded token payload
      // Token is valid, store user information in request object for future use
      req.user = decoded;
      next(); // Proceed to the next middleware or route handler
    }
  );
};

export default authenticateToken;
