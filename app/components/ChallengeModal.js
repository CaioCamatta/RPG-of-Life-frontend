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
          <Modal.Title>Challenge { this.props.friend }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Challenging a friend will allow you to compete directly on your five statistics.
          The challenge will last for a week and both you and your opponent's progresses will be tracked and compared.
          Whoever finishes the week having gained more stat points wins!
          Challenges begin immediately when accepted by the invitee.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.props.handleClose}>
            Challenge!
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
