import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./avatar.module.css";

export default class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.canvas}>
        <img src="/vercel.svg" alt="Vercel Logo" className="img-fluid" />
      </div>
    );
  }
}
