import { Component } from "react";
import Authentication from "./Authentication.js";
import Friends from "./Friends.js";
import Home from "./Home.js";
import Shop from "./Shop.js";
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

  render() {
    switch (this.state.pageToShow) {
      case AUTHENTICATION:
        return <Authentication {...this.commonProps} />;

      case HOME:
        return <Home {...this.commonProps} />;

      case FRIENDS:
        return <Friends {...this.commonProps} />;

      case PROFILE:
        return <Profile {...this.commonProps} />;

      case SHOP:
        return <Shop {...this.commonProps} />;

      default:
        return <Home {...this.commonProps} />;
    }
  }

  commonProps = {
    navigateHome: this.navigateHome,
    navigate: this.navigate,
  };
}
