import React from "react";

import { Box } from "@material-ui/core";
import "react-circular-progressbar/dist/styles.css";
import ListCard from "./ListCard5";
import "../App.css";

function Crew2() {
  return (
    <div style={{ width: "100%", alignContent: "center" }}>
      <div
        style={{
          marginTop: "2.956vh",
          marginRight: "24px",
          marginLeft: "24px",
        }}
      >
        <Box
          style={{
            margin: 0,
            padding: 0,
            filter: "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))",
          }}
        >
          <ListCard
            r1="12px"
            r2="12px"
            r3="12px"
            r4="12px"
            month="Mar"
            day="4"
            src="/Img/Aaptiv/[32].svg"
            name="Aaptiv"
            plan="5900원 / Monthly"
            share={0}
          ></ListCard>
        </Box>
        <Box
          style={{
            margin: 0,
            marginTop: 24,
            padding: 0,
            filter: "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))",
          }}
        >
          <ListCard
            r1="12px"
            r2="12px"
            r3="12px"
            r4="12px"
            month="Mar"
            day="4"
            src="/Img/AppleMusic/[32].svg"
            name="AppleMusic"
            plan="5900원 / Monthly"
            share={1}
          ></ListCard>
        </Box>
        <Box
          style={{
            margin: 0,
            marginTop: 24,
            padding: 0,
            filter: "drop-shadow(0px 2px 10px rgba(0, 0, 0, 0.1))",
          }}
        >
          <ListCard
            r1="12px"
            r2="12px"
            r3="0px"
            r4="0px"
            month="Dec"
            day="4"
            src="/Img/BarkBox/[32].svg"
            name="BarkBox"
            plan="5900원 / Monthly"
            share={1}
          ></ListCard>
          <ListCard
            r1="0px"
            r2="0px"
            r3="0px"
            r4="0px"
            month="Dec"
            day="6"
            src="/Img/AppleMusic/[32].svg"
            name="AppleMusic"
            plan="5900원 / Monthly"
            share={1}
          ></ListCard>
          <ListCard
            r1="0px"
            r2="0px"
            r3="12px"
            r4="12px"
            month="Dec"
            day="12"
            src="/Img/Avast/[32].svg"
            name="Avast"
            plan="5900원 / Monthly"
            share={1}
          ></ListCard>
        </Box>
      </div>
    </div>
  );
}

export default Crew2;
