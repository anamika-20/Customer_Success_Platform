// // // frontend/src/components/Login.js

// // import React, { useState, useEffect } from "react";
// // import { fetchProfile } from "../api/profileApi";

// // function Login() {
// //   const [profile, setProfile] = useState(null);

// //   useEffect(() => {
// //     fetchProfile()
// //       .then((data) => setProfile(data))
// //       .catch((error) => console.error("Error setting profile:", error));
// //   }, []);

// //   return (
// //     <div>
// //       <h1>Profile</h1>
// //       {profile && <pre>{JSON.stringify(profile, null, 2)}</pre>}
// //     </div>
// //   );
// // }

// // export default Login;
// // frontend/src/components/Login.js

// import React from "react";

// function Login() {
//   const handleLogin = () => {
//     // Redirect user to backend login route
//     window.location.href = "http://localhost:8080/login";
//   };

//   return (
//     <div>
//       <h1>Login Page</h1>
//       <button onClick={handleLogin}>Login with Auth0</button>
//     </div>
//   );
// }

// export default Login;

// frontend/src/components/Login.js
import React from "react";

function Login() {
  const handleLogin = () => {
    // Redirect user to backend login route
    window.location.href = "http://localhost:8080/login";
  };

  // Check for authentication status upon component mount
  // React.useEffect(() => {
  //   const checkAuthentication = async () => {
  //     try {
  //       // Perform a check to see if user is authenticated
  //       const response = await fetch("http://localhost:8080/profile", {
  //         method: "GET",
  //         credentials: "include",
  //       });
  //     } catch (error) {
  //       console.error("Error checking authentication:", error);
  //     }
  //   };

  //   checkAuthentication();
  // }, []);

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login with Auth0</button>
    </div>
  );
}

export default Login;
