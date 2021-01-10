import { Component } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import Avatar from "./Avatar";
import styles from "./profile.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faDumbbell,
  faPlusSquare,
  faBrain,
  faPalette,
  faHandHoldingHeart,
  faSpinner,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

var statIcons = {
  Health: faHandHoldingHeart,
  Strength: faDumbbell,
  Intelligence: faBrain,
  Creativity: faPalette,
  Charisma: faPlusSquare,
  Spinner: faSpinner,
  Empty: faFolderOpen,
};

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strength: "...",
      health: "...",
      intelligence: "...",
      charisma: "...",
      creativity: "...",
      coins: "...",
      xp: "...",
      taskList: [{ name: "Loading...", statType: "Spinner" }],
    };
  }

  componentDidMount() {
    this.populateProfile(this.props.globalUsername);
  }

  populateProfile = async (username) => {
    /* Returns "true" if successfully authenticated, "false" otherwise. 
    Logs an error the call returns an error. */
    let response = await fetch(
      "https://rpg-of-life-api.herokuapp.com/getPlayer/" + username,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      }
    ).catch((error) => {
      console.log("Error: ", error);
      return false;
    });

    let json = await response.json();

    this.setState({
      xp: json["xp"],
      coins: json["coins"],
      health: json["health"],
      intelligence: json["intelligence"],
      strength: json["strength"],
      creativity: json["creativity"],
      charisma: json["charisma"],
    });

    let answer = await fetch(
      "https://rpg-of-life-api.herokuapp.com/getTasks/" + username,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      }
    ).catch((error) => {
      console.log("Error: ", error);
      return false;
    });

    let tasks = await answer.json();
    let taskList = [];
    for (let i = 0; i < Object.keys(tasks).length; i++) {
      taskList.push(tasks[i]);
    }
    if (taskList.length === 0) {
      this.setState({
        taskList: [{ name: "No Tasks Available", statType: "Empty" }],
      });
    } else {
      this.setState({ taskList: taskList });
    }
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Button variant="link" onClick={() => this.props.navigateHome()}>
              Back
            </Button>
            <h1>this.props.globalUsername</h1>
            <Avatar />
            <p>Coins: {this.state.coins}</p>
            <p>XP: {this.state.xp}</p>
            <p>Health: {this.state.health}</p>
            <p>Strength: {this.state.strength}</p>
            <p>Intelligence: {this.state.intelligence}</p>
            <p>Charisma: {this.state.charisma}</p>
            <p>Creativity: {this.state.creativity}</p>
            <ListGroup>
              {this.state.taskList.map((task) => (
                <ListGroup.Item className="task-item">
                  <p>
                    <FontAwesomeIcon icon={statIcons[task["statType"]]} />{" "}
                    {task["name"]}
                  </p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}
