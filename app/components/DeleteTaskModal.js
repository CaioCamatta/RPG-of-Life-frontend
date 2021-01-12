import { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./deleteTaskModal.module.css";

export default class DeleteTaskModal extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmitAndClose = () => {
    this.props.handleSubmit();
    this.props.handleClose();
  }

  render() {
    return (
      
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
          </Modal.Header>
          <Modal.Body>Are you sure you'd like to delete this task? You will be able to add it back at any time.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleSubmitAndClose}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
