import React from "react";

import "../App.css";

import gql from "graphql-tag";

import { serviceByUser } from "../graphql/queries";

import AppBar from "../components/AppbarTran";
import Main from "../components/Mainallsubs";
import BottomNavigation from "../components/BottomNavigation";

function Wallet(props) {
  const [data, setData] = React.useState([]);
  const [value, setValue] = React.useState(0);
  try {
    props.client
      .query({
        query: gql(serviceByUser),
        variables: { userID: props.userData.sub },
      })
      .then(({ data }) => {
        setData(data.serviceByUser.items);
      });
  } catch (e) {
    console.log("query error", e);
  }

  return (
    <div style={{ width: "100%", alignContent: "center", height: "100vh" }}>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "5.72vh",
          backgroundColor: "white",
          boxShadow: "0px 0.347222px 0.347222px rgba(196, 196, 196, 0.75)",
        }}
      >
        <AppBar name={"Subscriptions"} link={"/"} />
      </div>
      <div
        style={{
          width: "100%",
          alignContent: "center",
        }}
      >
        <Main list={data} />
      </div>
      <BottomNavigation value={value} setValue={setValue} />
    </div>
  );
}

export default Wallet;