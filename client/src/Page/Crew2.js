import React from "react";

import "../App.css";
import AppBar from "../components/Appbar3";
import Main from "../components/MainCrew2";
import BottomNavigation from "../components/BottomNavigation";

function Crew2(props) {
  props.setValue(2);
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
    </div>
  );
}

export default Crew2;
