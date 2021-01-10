import { Component } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import { PROFILE, SHOP, FRIENDS } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faDumbbell,
  faPlusSquare,
  faBrain,
  faPalette,
  faHandHoldingHeart,
} from "@fortawesome/free-solid-svg-icons";
import AddTaskModal from "./AddTaskModal";
import Avatar from "./Avatar";

import styles from "./home.module.css";

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
    
  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = () => {
    // This method will be connected to the API
    console.log("Fetching Profile from Home page.");
    let profile = {
      username: "Kanye99",
      XP: 101,
      coins: 412,
      stats: {
        health: 13,
        strength: 12,
        intelligence: 39,
        creativity: 16,
        charisma: 21,
      },
    };

    this.setState({ profile: profile });
  };

  handleAddTaskModalToggle = () => {
    this.setState({ showAddTaskModal: !this.state.showAddTaskModal });
  };

  render() {
    return (
      <div>
        <Row>
          <Col className="p-0">
            <div className="py-3 px-3 profile-header w-100 d-flex">
              <div className="pl-2 d-inline-block">
                <Avatar />
              </div>
              <div className="mt-1 d-inline-block ml-2">
                <p className="mb-1 font-weight-bold h5">
                  {this.props.globalUsername ?? "Username here"}
                </p>
                <p className="mb-0">XP {this.state.profile?.XP ?? "0"}</p>
                <p className="mb-0">
                  {" "}
                  <FontAwesomeIcon icon={faCoins} className="mr-2" />
                  {this.state.profile?.coins ?? "0"}
                </p>
                <p className="mb-0 stats-display">
                  {this.state.profile && (
                    <>
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faPlusSquare} />{" "}
                        {this.state.profile.stats.health}
                      </span>
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faDumbbell} />{" "}
                        {this.state.profile.stats.strength}
                      </span>
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faBrain} />{" "}
                        {this.state.profile.stats.intelligence}
                      </span>
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faPalette} />{" "}
                        {this.state.profile.stats.creativity}
                      </span>
                      <span className="mr-2">
                        <FontAwesomeIcon icon={faHandHoldingHeart} />{" "}
                        {this.state.profile.stats.charisma}
                      </span>
                    </>
                  )}
                </p>

                <div className="align-right mt-1">
                  <Button
                    onClick={() => this.props.navigate(FRIENDS)}
                    outline
                    variant="secondary"
                    className="m-1 px-1 py-0 small"
                  >
                    Friends
                  </Button>
                  <Button
                    onClick={() => this.props.navigate(SHOP)}
                    outline
                    variant="secondary"
                    className="m-1 px-1 py-0 small"
                  >
                    Shop
                  </Button>
                  <Button
                    onClick={() => this.props.navigate(PROFILE)}
                    outline
                    variant="secondary"
                    className="m-1 px-1 py-0 small"
                  >
                    Profile
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <Container>
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
      </div>
    );
  }
}
