import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./avatar.module.css";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="canvas d-flex">
        <img src="/char.png" alt="Vercel Logo" className="img-fluid h-100 mx-auto" />
      </div>
    );
  }
}
