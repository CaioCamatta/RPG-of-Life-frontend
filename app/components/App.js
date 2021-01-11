import { Component } from "react";
import Authentication from "./Authentication.js";
import Friends from "./Friends.js";
import Home from "./Home.js";
import Profile from "./Profile.js";

import styles from "./app.module.css";

// Screens
export const HOME = "home";
export const FRIENDS = "friends";
export const SHOP = "shop";
export const AUTHENTICATION = "authentication";
export const PROFILE = "profile";

// This component is the parent of all other pages.
// If you need a ""global variable"" or something similar, put it here
export default class MainApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pageToShow: AUTHENTICATION,
    };
  }

  navigateHome = () => {
    this.setState({ pageToShow: HOME });
  };

  navigate = (page) => {
    this.setState({ pageToShow: page });
  };

  setGlobalUsername = (globalUsername) => {
    // Sets global username to be used by children and navitages to home page
    this.commonProps.globalUsername = globalUsername;
    this.setState({ globalUsername }, this.navigateHome);
  };

  authenticate = async (username, password) => {
    /* Returns "true" if successfully authenticated, "false" otherwise. 
    Logs an error the call returns an error. */
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: username, password: password }),
          mode: "cors",
        }
      );

      let json = await response.json();

      console.log(
        "Login successful? " + (json.message === "success").toString()
      );

      // To whom it may concern, we know this is not secure authentication
      return json.message === "success";
    } catch (error) {
      console.log("Authentication error: ", error);
      return false;
    }
  };

  render() {
    switch (this.state.pageToShow) {
      case AUTHENTICATION:
        return (
          <Authentication
            {...this.commonProps}
            setGlobalUsername={this.setGlobalUsername}
          />
        );

      case HOME:
      case SHOP:
        return (
          <Home {...this.commonProps} SHOP={this.state.pageToShow === SHOP} />
        );

      case FRIENDS:
        return <Friends {...this.commonProps} />;

      case PROFILE:
        return <Profile {...this.commonProps} />;

      default:
        return <Home {...this.commonProps} />;
    }
  }

  commonProps = {
    navigateHome: this.navigateHome,
    navigate: this.navigate,
    authenticate: this.authenticate,
  };
}
