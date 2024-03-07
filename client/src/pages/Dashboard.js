import React from "react";
import Layout from "../Layout";

const Dashboard = () => {
  // axios.get('http://localhost:8080/user/user-info')
  // .then(response => {
  //   const data = response.data;
  //   const userRole = data.nickname;
  //   console.log('User Role:', userRole);
  //   if (!userRole) {
  //     console.log("Role not found");
  //   }
  // })
  // .catch(error => {
  //   console.error('Error fetching user role:', error);
  // });

  return (
    <Layout>
      <div>Dashboard</div>
    </Layout>
  );
};

export default Dashboard;
