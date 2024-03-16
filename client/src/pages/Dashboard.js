import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
const Dashboard = () => {
  // const getUserData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:8080/user/user-info");
  //     console.log(response);
  //   } catch (error) {}
  // };
  // // axios
  // //   .get("http://localhost:8080/user/user-info")
  // //   .then((response) => {
  // //     console.log(response);
  // //     const data = response.data;
  // //     const userRole = data.nickname;
  // //     console.log("User Role:", userRole);
  // //     if (!userRole) {
  // //       console.log("Role not found");
  // //     }
  // //   })
  // //   .catch((error) => {
  // //     console.error("Error fetching user role:", error);
  // //   });
  // useEffect(() => {
  //   getUserData();
  // }, []);
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  const [userRole, setUserRole] = useState("");
  useEffect(() => {
    const checkUserRole = async (email) => {
      try {
        const token = await getAccessTokenSilently({
          audience: "http://localhost:8080/",
        });
        console.log(token);
        const response = await axios.get("http://localhost:8080/user/getRole", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { email },
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (isAuthenticated) {
      checkUserRole(user?.email);
    }
  }, [getAccessTokenSilently, isAuthenticated, user]);

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <Layout>
      {/* <button onClick={() => loginWithRedirect()}>Log In</button>
      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
      >
        Log Out
      </button>
      {isAuthenticated && (
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </div>
      )} */}
      Role: {userRole}
    </Layout>
  );
};

export default Dashboard;
