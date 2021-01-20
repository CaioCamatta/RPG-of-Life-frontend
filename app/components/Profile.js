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
  health: faHandHoldingHeart,
  strength: faDumbbell,
  intelligence: faBrain,
  creativity: faPalette,
  charisma: faPlusSquare,
  spinner: faSpinner,
  empty: faFolderOpen,
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
      lore: "..."
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
      ...json,
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
    let taskList = Object.values(tasks);
    if (taskList.length === 0) {
      this.setState({
        taskList: [{ name: "No Tasks Available", statType: "empty" }],
      });
    } else {
      this.setState({ taskList: taskList });
    }

    let story = await fetch(
      "https://rpg-of-life-api.herokuapp.com/getLore/" + username,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        mode: "cors",
      }
    ).catch((error) => {
      console.log("Error: ", error);
      return false;
    });

    let lore = await story.json()
    this.setState({lore: lore['lore']})
  };

  render() {
    return (
      <Container className="mt-4">
        <Button variant="secondary" onClick={() => this.props.navigateHome()}>
          Back
        </Button>
        <div className="text-center mt-3">
          <h1 className="breathefire">{this.props.globalUsername}</h1>

          <Row>
            <div className="d-flex mx-auto mb-3 mt-2">
              <div className=" align-self-center mx-2 -mt-3 avatar-block">
                <Avatar
                  hat={`/items/${this.state.hat?.url}`}
                  chest={`/items/${this.state.chest?.url}`}
                  pants={`/items/${this.state.pants?.url}`}
                  boots={`/items/${this.state.boots?.url}`}
                  weapon={`/items/${this.state.weapon?.url}`}
                />
                <p className="mb-2 big fa-coins">
                  <FontAwesomeIcon icon={faCoins} /> {this.state.coins}{" "}
                </p>
                <p className="mb-2 ">
                  {" "}
                  {this.state.xp} <span className="small stat-name">XP</span>
                </p>
              </div>
              <div className="mb-3 mx-2 align-self-center">
                <p className="mb-1">
                  <FontAwesomeIcon icon={faPlusSquare} /> {this.state.health}{" "}
                  <span className="small stat-name">Health</span>
                </p>
                <p className="mb-1">
                  <FontAwesomeIcon icon={faDumbbell} /> {this.state.strength}{" "}
                  <span className="small stat-name">Strength</span>
                </p>
                <p className="mb-1">
                  <FontAwesomeIcon icon={faBrain} /> {this.state.intelligence}{" "}
                  <span className="small stat-name">Intelligence</span>
                </p>
                <p className="mb-1">
                  <FontAwesomeIcon icon={faHandHoldingHeart} /> {this.state.charisma}{" "}
                  <span className="small stat-name">Charisma</span>
                </p>
                <p className="mb-1">
                  <FontAwesomeIcon icon={faPalette} />{" "}
                  {this.state.creativity}{" "}
                  <span className="small stat-name">Creativity</span>
                </p>
              </div>
            </div>
          </Row>

          <div className="d-absolute list ">
            <div>
              <p className="mb-4 px-3 small stat-name">
                {this.state.lore}
              </p>
            </div>
            <ListGroup className="">
              {this.state.taskList.map((task) => (
                <ListGroup.Item className="task-item">
                  <p>
                    <FontAwesomeIcon icon={statIcons[task["statType"]]} className="mr-2"/>
                    {task["name"]}
                  </p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </div>
      </Container>
    );
  }
}
