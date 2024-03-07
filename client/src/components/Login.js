import React from "react";

function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8080/login";
  };

  return (
    <div>
      <h1>Login Page</h1>
      <button onClick={handleLogin}>Login with Auth0</button>
    </div>
  );
}

export default Login;
