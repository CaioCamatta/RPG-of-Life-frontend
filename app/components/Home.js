import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./home.module.css";
import { PROFILE, SHOP, FRIENDS } from "./App";
import AddTaskModal from "./AddTaskModal";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddTaskModal: false,
    };
  }

  handleAddTaskModalToggle = () => {
    this.setState({ showAddTaskModal: !this.state.showAddTaskModal });
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Home</h1>
            <div>
              <Button
                onClick={() => this.props.navigate(FRIENDS)}
                outline
                variant="primary"
                className="m-1"
              >
                Friends
              </Button>
              <Button
                onClick={() => this.props.navigate(SHOP)}
                outline
                variant="primary"
                className="m-1"
              >
                Shop
              </Button>
              <Button
                onClick={() => this.props.navigate(PROFILE)}
                outline
                variant="primary"
                className="m-1"
              >
                Profile
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button
              variant="primary"
              onClick={this.handleAddTaskModalToggle}
              className="m-1 mt-5"
            >
              Add Task
            </Button>
            <AddTaskModal
              show={this.state.showAddTaskModal}
              handleClose={this.handleAddTaskModalToggle}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
