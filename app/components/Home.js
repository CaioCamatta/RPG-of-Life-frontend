import { Component } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import styles from "./home.module.css";
import { PROFILE, SHOP, FRIENDS } from "./App";
import AddTaskModal from "./AddTaskModal";

var tasks = [
  "Eat Vegetables"
]

var statIcons = {
  "Health":"https://img.icons8.com/material-sharp/24/000000/like--v1.png",
  "Strength":"https://img.icons8.com/ios-filled/50/000000/dumbbell.png",
  "Intelligence":"https://img.icons8.com/ios-glyphs/30/000000/open-book--v1.png",
  "Creativity":"https://img.icons8.com/ios-glyphs/24/000000/paint.png",
  "Charisma":"https://img.icons8.com/pastel-glyph/64/000000/groups--v4.png"
}

var taskList = [];

export default class Home extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showAddTaskModal: false,
    };

    taskList = [];

    for (let i = 0; i < tasks.length; i++) {
      taskList.push({
        name: tasks[i],
        stat: "Health"
      });
    }

    this.state = { taskList };
  }

  handleComplete = (index) => {
    delete taskList[index];
    this.setState({ taskList: taskList });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    taskList.push({
      name: evt.target.name.value,
      stat: evt.target.stat.value
    })
    this.setState({ taskList: taskList });
    //making a post request with the fetch API
    /*fetch('/server', {
        method: 'POST',
        headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
            firstName:this.state.firstName
          })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))
    });*/
  };

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
        <div className="scroll-view">
          <ListGroup>
            {this.state.taskList.map((task, index) => (
              <ListGroup.Item className="task-item">
                <p>
                  <img width="16" height="16" className="mr-2" src={ statIcons[task.stat] }/>
                  { task.name }
                </p>
                <Button variant="success" size="sm" className="" onClick={() => this.handleComplete(index)}>Complete</Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button
            variant="primary"
            onClick={this.handleAddTaskModalToggle}
            className="m-3 mx-auto"
          >
            Add Task
          </Button>
          <AddTaskModal
            show={this.state.showAddTaskModal}
            handleClose={this.handleAddTaskModalToggle}
            handleSubmit={this.handleSubmit}
          />
        </div>
      </Container>
    );
  }
}
