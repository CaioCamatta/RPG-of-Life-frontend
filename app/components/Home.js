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
import Shop from "./Shop.js";
import Avatar from "./Avatar";

import styles from "./home.module.css";

var tasks = ["Eat Vegetables"];

var statIcons = {
  Health: "https://img.icons8.com/material-sharp/24/000000/like--v1.png",
  Strength: "https://img.icons8.com/ios-filled/50/000000/dumbbell.png",
  Intelligence: "https://img.icons8.com/ios-glyphs/30/000000/open-book--v1.png",
  Creativity: "https://img.icons8.com/ios-glyphs/24/000000/paint.png",
  Charisma: "https://img.icons8.com/pastel-glyph/64/000000/groups--v4.png",
};

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
        stat: "Health",
      });
    }

    this.state = { taskList };
  }

  handleComplete = (index) => {
    delete taskList[index];
    this.setState({ taskList: taskList });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    taskList.push({
      name: evt.target.name.value,
      stat: evt.target.stat.value,
    });
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
  fetchProfile = async () => {
    let response = await fetch(
      "https://rpg-of-life-api.herokuapp.com/getPlayer/" +
        this.props.globalUsername,
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

    this.setState((state) => {
      state.profile = {
        ...json,
      };
      return state;
    });
  };

  handleAddTaskModalToggle = () => {
    this.setState({ showAddTaskModal: !this.state.showAddTaskModal });
  };

  render() {
    return (
      <div>
        <div className="p-3 profile-header w-100">
          <div className="pl-2 d-inline-block">
            <Avatar
              hat={`/items/${this.state.profile?.hat?.url}`}
              chest={`/items/${this.state.profile?.chest?.url}`}
              pants={`/items/${this.state.profile?.pants?.url}`}
              boots={`/items/${this.state.profile?.boots?.url}`}
              weapon={`/items/${this.state.profile?.weapon?.url}`}
            />
          </div>
          <div className="mt-1 d-inline-block ml-2">
            <p className="mb-1 font-weight-bold h5">
              {this.props.globalUsername ?? "Username"}
            </p>
            <p className="mb-0">XP {this.state.profile?.xp ?? "0"}</p>
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
                    {this.state.profile.health}
                  </span>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faDumbbell} />{" "}
                    {this.state.profile.strength}
                  </span>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faBrain} />{" "}
                    {this.state.profile.intelligence}
                  </span>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faPalette} />{" "}
                    {this.state.profile.creativity}
                  </span>
                  <span className="mr-2">
                    <FontAwesomeIcon icon={faHandHoldingHeart} />{" "}
                    {this.state.profile.charisma}
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
                onClick={
                  this.props.SHOP
                    ? () => this.props.navigateHome()
                    : () => this.props.navigate(SHOP)
                }
                outline
                variant="secondary"
                className="m-1 px-1 py-0 small"
              >
                {this.props.SHOP ? "Tasks" : "Shop"}
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
        {this.props.SHOP ? (
          <Shop {...this.props} />
        ) : (
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
        )}
      </div>
    );
  }
}
