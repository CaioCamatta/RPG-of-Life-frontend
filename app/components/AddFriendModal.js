import { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import styles from "./addFriendModal.module.css";

export default class AddFriendModal extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add a Friend</Modal.Title>
          </Modal.Header>
          <Form id="add-friend-form" onSubmit={this.props.handleSubmit}className="m-5">
            <Form.Control name="name" placeholder="Friend username" />
          </Form>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" form="add-friend-form" onClick={this.props.handleClose}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
    );
  }
}
