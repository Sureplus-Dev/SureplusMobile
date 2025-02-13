import React, { useContext, useEffect, useState, useMemo } from "react";
import { useStyles } from "../styles/Report.style";
import "../App.css";
import { API, graphqlOperation } from "aws-amplify";

import {
  serviceByUser,
  getUser,
  notificationsByUser,
} from "../graphql/queries";
import PullToRefresh from "react-simple-pull-to-refresh";
import { AuthContext } from "../context/auth";

import { onCreateSubscriptionServices } from "../graphql/subscriptions";
import { createSubscriptionServices } from "../graphql/mutations";

import ToolBar from "../components/ToolBar";
import Main from "../components/MainReport";
import Main2 from "../components/MainReport2";
import Typography from "@material-ui/core/Typography";

import { Link, useLocation } from "react-router-dom";

import Drawer from "@material-ui/core/Drawer";
import { Box, Button } from "@material-ui/core";
//import { AuthContext } from "../context/auth";

import Loading from "../components/Loading";
import FirstLinkDrawer from "../components/FirstLinkDrawer";

export function Report(props) {
  const {
    user,
    setUser,
    subscriptions,
    setSubscriptions,
    loading,
    setLoading,
    link,
    setLink,
    openbottom,
    setOpenbottom,
  } = useContext(AuthContext);
  const location = useLocation();
  props.setValue(0);

  var num = 0;
  if (location.param1 != null) {
    num = 1;
  }
  var op = false;
  if (location.param2 != null) {
    op = true;
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const classes = useStyles();

  const [ind, setIndex] = React.useState(num);
  const [open, setOpen] = React.useState(op);

  //const context = useContext(AuthContext);
  //props.userData.sub --> userID used for query

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  const check_empty = async (str) => {
    console.log("check_empty");
    if (str == "" || !str) {
      setOpenbottom(true);
      setLink(true);
    } else {
    }
  };
  // Listen to Service Creation Event
  async function waitCreateSubs() {
    const serviceCreated = await API.graphql(
      graphqlOperation(onCreateSubscriptionServices)
    ).subscribe({
      next: (serviceData) => {
        console.log("CREATED", serviceData);
      },
    });
  }

  async function callServiceByUser() {
    const subscriptionData = await API.graphql({
      query: serviceByUser,
      variables: {
        userID: user.sub,
      },
    });

    //console.log("subscrption", subscriptionData);

    setSubscriptions(subscriptionData.data.serviceByUser.items);
  }

  async function callgetUser() {
    const linkData = await API.graphql({
      query: getUser,
      variables: {
        id: user.sub,
      },
    });

    check_empty(linkData.data.getUser.Token);
    return linkData;
  }

  async function testApi() {
    await API.get("plaidhandler", "/transactions", {
      queryStringParameters: {
        token: "",
        userID: "",
      },
    })
      .then((res) => {
        console.log("Transactions Update Successful!");

        //HERE!
        console.log("transactions", res.transactions);
        //this.props.setState();
      })
      .catch((error) => {
        console.log("transactions err", error);
      });
    await API.post("transaction2service", "/extract/subscription", {
      body: {
        userid: "9943a4d1-772f-44b1-b1ee-dc22ad42ad59",
      },
    }).then(async (response) => {
      console.log("transaction2service", response);
    });
  }

  useEffect(() => {
    //testApi();
    setUser(props.userData);

    if (user) {
      if (loading) {
        onRefreshUser();
      }

      callServiceByUser();

      waitCreateSubs();
    }
  }, [user]);

  const onRefresh = () => {
    return Promise.all([
      new Promise((resolve) => setTimeout(resolve, 2000)),
    ]).then(callServiceByUser());
  };

  const _sleep = (delay) =>
    new Promise((resolve) => setTimeout(resolve, delay));

  const onRefreshUser = async () => {
    await callgetUser();
    await _sleep(2000);
    await setLoading(false);
  };

  return loading === false && user ? (
    <div>
      <div>
        <div
          position="absolute"
          style={{
            width: "100%",
            height: "5.73vh",
          }}
        >
          <div style={{ width: "100%" }}>
            <Box
              display="flex"
              alignItems="center"
              style={{
                margin: 0,
                padding: "4px 16px 4px 16px",
                height: "5.72vh",
              }}
            >
              <Box p={1} flexGrow={1} style={{ margin: 0, padding: 0 }}>
                <Button
                  onClick={handleDrawerOpen}
                  style={{
                    padding: 0,
                    margin: 0,
                    minHeight: 0,
                    minWidth: 0,
                    borderRadius: "100%",
                  }}
                >
                  <img
                    alt="name"
                    src="ProfileIcon.png"
                    style={{ width: "4.16vh", height: "4.16vh" }}
                  ></img>
                </Button>
              </Box>

              {/* <Box
                p={1}
                style={{
                  margin: 0,
                  padding: 0,
                }}
              >
                <Button
                  component={Link}
                  to="/Notification"
                  style={{
                    padding: 0,
                    margin: 0,
                    minHeight: 0,
                    minWidth: 0,
                    borderRadius: "100%",
                  }}
                >
                  <img
                    src="/Icons[32]/Type=Notifications.svg"
                    alt="name"
                    style={{ width: "4.16vh", height: "4.16vh" }}
                  ></img>
                </Button>
              </Box> */}
            </Box>
          </div>
        </div>
        <div>
          <PullToRefresh
            refreshingContent={
              <div style={{ height: "70px" }}>
                <Loading />
              </div>
            }
            pullingContent={<div></div>}
            canFetchMore={true}
            onRefresh={onRefresh}
          >
            <div
              position="fixed"
              style={{
                width: "100%",
                height: "5.73vh",
                marginTop: "1.56vh",
              }}
            >
              <ToolBar value={ind} setValue={setIndex} />
            </div>

            <div
              position="fixed"
              style={{
                width: "100%",
                alignContent: "center",
              }}
            >
              {(() => {
                if (ind == 0) {
                  return (
                    <Main
                      list={subscriptions}
                      empty={link}
                      open={openbottom}
                      setOpen={setOpenbottom}
                    />
                  );
                } else {
                  return (
                    <Main2
                      userData={user}
                      empty={link}
                      open={openbottom}
                      setOpen={setOpenbottom}
                    />
                  );
                }
              })()}
            </div>
          </PullToRefresh>
        </div>
        <div position="fixed"></div>
      </div>

      <Drawer
        className={classes.drawer}
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
        onClick={toggleDrawer("left", false)}
      >
        <div
          style={{
            marginTop: 16,
            padding: "12px 20px 12px 20px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <img
            alt="name"
            src="ProfileIcon.png"
            style={{ width: "4.16vh", height: "4.16vh" }}
          ></img>

          <Typography
            style={{
              margin: 0,
              padding: 0,
              marginLeft: 16,
              fontWeight: 500,
              fontSize: 17,
              alignItems: "center",
            }}
          >
            {user.name}
          </Typography>
        </div>
        {/* Notice List */}
        <Button
          component={Link}
          to="/Profile"
          style={{
            margin: 0,
            padding: 0,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 16,
            height: 48,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 12,
            paddingBottom: 12,
            textTransform: "none",
          }}
        >
          <img
            alt="Profile"
            src="/Icons[24]/Type=Profile.svg"
            style={{ width: "3.125vh", height: "3.125vh" }}
          ></img>

          <Typography
            style={{
              margin: 0,
              padding: 0,
              marginLeft: 16,
              fontWeight: 500,
              fontSize: 17,
              alignItems: "center",
            }}
          >
            Profile
          </Typography>
        </Button>
        {/* <Button
          component={Link}
          to="/Notification"
          style={{
            margin: 0,
            padding: 0,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 16,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 12,
            paddingBottom: 12,
            height: 48,
            textTransform: "none",
          }}
        >
          <img
            alt="Notification"
            src="/Icons[24]/Type=Notice.svg"
            style={{ width: "3.125vh", height: "3.125vh" }}
          ></img>
          <Typography
            style={{
              margin: 0,
              padding: 0,
              marginLeft: 16,
              fontWeight: 500,
              fontSize: 17,
              alignItems: "center",
            }}
          >
            Notice
          </Typography>
        </Button> */}
        <Button
          component={Link}
          to="/Customersupport"
          style={{
            margin: 0,
            padding: 0,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 16,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 12,
            paddingBottom: 12,
            height: 48,
            textTransform: "none",
          }}
        >
          <img
            alt="name"
            src="/Icons[24]/Type=CustomerSupport.svg"
            style={{ width: "3.125vh", height: "3.125vh" }}
          ></img>
          <Typography
            style={{
              margin: 0,
              padding: 0,
              marginLeft: 16,
              fontWeight: 500,
              fontSize: 17,
              alignItems: "center",
            }}
          >
            Customer Support
          </Typography>
        </Button>

        <div
          style={{ backgroundColor: "grey", height: "0.5px", marginTop: 16 }}
        ></div>
        {/* Privacy and Settings */}
        <Button
          component={Link}
          to="/TermofService"
          style={{
            margin: 0,
            padding: 0,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 16,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 12,
            paddingBottom: 12,
            height: 48,
            textTransform: "none",
          }}
        >
          <Typography
            style={{
              margin: 0,
              padding: 0,
              fontWeight: 500,
              fontSize: 17,
              alignItems: "center",
            }}
          >
            Term of Service
          </Typography>
        </Button>

        <Button
          component={Link}
          to="/PrivacyPolicy"
          style={{
            margin: 0,
            padding: 0,

            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            marginTop: 6,
            paddingLeft: 20,
            paddingRight: 20,
            paddingTop: 12,
            paddingBottom: 12,
            height: 48,
            textTransform: "none",
          }}
        >
          <Typography
            style={{
              margin: 0,
              padding: 0,
              fontWeight: 500,
              fontSize: 17,
              alignItems: "center",
            }}
          >
            Privacy Policy
          </Typography>
        </Button>

        {/* Customer Support */}
      </Drawer>
      <FirstLinkDrawer
        userData={user}
        open={openbottom}
        setOpen={setOpenbottom}
      />
    </div>
  ) : (
    <div
      style={{
        backgroundImage: "linear-gradient(90deg, #8610EB, #430985)",
        height: "100vh",
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img alt="logo" src="/images/logo.png" style={{ maxHeight: 40 }}></img>
    </div>
  );
}

export default Report;
