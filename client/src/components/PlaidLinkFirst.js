import React, { Component } from "react";
import { PlaidLink } from "react-plaid-link";
import { withStyles } from "@material-ui/styles";
//import Button from "@material-ui/core/Button";
import axios from "axios";
import "../App.css";
import { API, graphqlOperation } from "aws-amplify";
import { Button, Typography } from "@material-ui/core";

import { updateUser } from "../graphql/mutations";
import { withRouter } from "react-router-dom";

//plaid iframe id: plaid-link-iframe-1

const useStyles = (theme) => ({
  root: {
    backgroundColor: "#FFFFFF",
    minHeight: 332,
    maxHeight: 332,
    borderRadius: "10px",
  },
  ListItemSize5: {
    color: "#7610EB",
    borderColor: "white",
    outline: "none",
    backgroundColor: "white",
    fontSize: "14px",
    fontWeight: 400,
    alignItems: "center",
    borderRadius: 5,
    textTransform: "none",
    height: "40px",
    marginLeft: "16px",
  },
  plaidWrapper: {
    display: "flex",
  },
});

class PlaidLogin extends Component {
  //declaring contextType should behave the same as useContext API for functional components

  constructor(props, context) {
    super(props, context);

    console.log("props", props.userData);

    this.state = {
      transactions: [],
      accounts: [],
      userData: props.userData,
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleOnSuccess = this.handleOnSuccess.bind(this);
    this.handleOnExit = this.handleOnExit.bind(this);
  }

  handleOnSuccess(public_token, metadata) {
    this.props.setState();

    API.post("plaidhandler", "/auth/publictoken", {
      body: {
        public_token: public_token,
        userData: this.props.userData.sub,
      },
    })
      .then(async (response) => {
        const plaidTokenUpdated = await API.graphql(
          graphqlOperation(updateUser, {
            input: {
              id: this.props.userData.sub,
              plaidToken: response.access_token,
            },
          })
        );

        console.log("plaidTokenUpdated", plaidTokenUpdated);

        API.get("plaidhandler", "/transactions", {}).then((res) => {
          this.setState({ transactions: res.transactions.transactions });
          this.setState({ accounts: res.transactions.accounts });
        });
      })
      .catch((err) => {
        console.log("auth err", err);
      });
    console.log("handleOnSuccess");
  }

  handleOnExit() {
    // handle the case when your user exits Link
    console.log("User has exited plaid link prompt");
  }

  handleClick(res) {
    console.log("Handle Click");
  }

  // 1. Have to call Mutation from PlaidLink Component after the access_token state has been set
  // 2. Have to call the updateAccessToken function in one of the events --> not working well

  render() {
    const { classes } = this.props;
    return (
      <PlaidLink
        clientName="React Plaid Setup"
        env="sandbox"
        product={["auth", "transactions"]}
        publicKey="d74564d1fca97dd00ec3f9f421eae9"
        onExit={this.handleOnExit}
        onSuccess={this.handleOnSuccess}
        style={{
          margin: 0,
          padding: 0,
          border: "none",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            style={{
              position: "absolute",
              bottom: 48,
              margin: 0,
              padding: 0,
              height: "48px",
              borderRadius: "24px",
              background: "linear-gradient(90deg, #8610EB 0%, #430985 100%)",
              color: "white",
              textTransform: "none",
              width: "calc(100% - 48px)",
            }}
          >
            <Typography
              style={{
                margin: 0,
                padding: 0,
                color: "white",

                fontWeight: 500,
                fontSize: "17px",
              }}
            >
              Link bank
            </Typography>
          </Button>
        </div>
      </PlaidLink>
    );
  }
}

export default withRouter(withStyles(useStyles)(PlaidLogin));
