import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./challengeModal.module.css";

export default class ChallengeModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Save (just closes)
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
