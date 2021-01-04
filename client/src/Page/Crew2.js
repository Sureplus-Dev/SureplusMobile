import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "../App.css";
import AppBar from "../components/Appbar3";
import Main from "../components/MainCrew2";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({}));

function Crew2() {
  const [value, setValue] = React.useState(2);
  return (
    <div style={{ width: "100%", alignContent: "center", height: "100vh" }}>
      <div
        style={{
          width: "100%",
          height: "11.4vh",
          backgroundColor: "white",
        }}
      >
        <AppBar
          Text={"Groups"}
          Tab1="Created"
          Tab2="Joined"
          Link={"Crew"}
          state={1}
        />
      </div>
      <div
        style={{
          width: "100%",

          alignContent: "center",
        }}
      >
        <Main />
      </div>
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100vw",
          height: "10vh",
          "& .MuiBottomNavigationAction-root": {
            "@media (max-width: 768px)": {
              minWidth: "auto",
              padding: "0px",
            },
          },
        }}
      >
        <BottomNavigationAction
          component={Link}
          to="/"
          style={{ margin: 0, padding: 0, minWidth: "auto" }}
          icon={
            <img
              style={{ width: "3.92vh", height: "3.92vh" }}
              src="Icon/Wallet.svg"
            ></img>
          }
        />
        <BottomNavigationAction
          component={Link}
          to="/Subscription"
          style={{ margin: 0, padding: 0, minWidth: "auto" }}
          icon={
            <img
              style={{ width: "3.92vh", height: "3.92vh" }}
              src="Icon/Subscriptions.svg"
            ></img>
          }
        />
        <BottomNavigationAction
          style={{ margin: 0, padding: 0, minWidth: "auto" }}
          icon={
            <img
              style={{ width: "3.92vh", height: "3.92vh" }}
              src="Icon/Search.svg"
            ></img>
          }
        />
        <BottomNavigationAction
          style={{ margin: 0, padding: 0, minWidth: "auto" }}
          icon={
            <img
              style={{ width: "3.92vh", height: "3.92vh" }}
              src="Icon/Activity.svg"
            ></img>
          }
        />
        <BottomNavigationAction
          style={{ margin: 0, padding: 0, minWidth: "auto" }}
          icon={
            <img
              style={{ width: "3.92vh", height: "3.92vh" }}
              src="Icon/More.svg"
            ></img>
          }
        />
      </BottomNavigation>
    </div>
  );
}

export default Crew2;
