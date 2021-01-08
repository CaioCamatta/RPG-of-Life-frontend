import { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./addTaskModal.module.css";

export default class AddTaskModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a Task</Modal.Title>
          </Modal.Header>
          <Form id="add-task-form" onSubmit={this.props.handleSubmit}className="m-5">
            <Form.Control name="name" placeholder="Task name" />
            <Form.Label className="mt-4">
              Category
            </Form.Label>
            <Form.Control name="stat" as="select">
              <option>Health</option>
              <option>Strength</option>
              <option>Intelligence</option>
              <option>Creativity</option>
              <option>Charisma</option>
            </Form.Control>
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="add-task-form" onClick={this.props.handleClose}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
