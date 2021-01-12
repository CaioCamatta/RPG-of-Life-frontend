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
  faTrashAlt
} from "@fortawesome/free-solid-svg-icons";
import AddTaskModal from "./AddTaskModal";
import DeleteTaskModal from "./DeleteTaskModal";
import Shop from "./Shop.js";
import Avatar from "./Avatar";

import styles from "./home.module.css";

var statIcons = {
  health: faPlusSquare,
  strength: faDumbbell,
  intelligence: faBrain,
  creativity: faPalette,
  charisma: faHandHoldingHeart,
};

var taskList = [];

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddTaskModal: false,
      showDeleteTaskModal: false,
      taskToDelete: "",
    };

    this.state = { taskList : [{"name": "Loading...", "stat": "health", "id": "0"}] };
  }

  populateTasks = async () => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getTasks/"+this.props.globalUsername,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let tasks = await response.json();
      console.log("tasks are:", tasks)
      taskList = [];
      for (let i = 0; i < Object.values(tasks).length; i++) {
        if (Object.values(tasks)[i]['completedToday'] == false) {
          taskList.push({
            name: Object.values(tasks)[i]['name'],
            stat: Object.values(tasks)[i]['statType'],
            id: Object.values(tasks)[i]['id']
          });
        }
      }
      
      this.setState({taskList: taskList})
      
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  }

  handleComplete = async (id) => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/completeTask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            username: this.props.globalUsername,
            id: id
          })
        }
      );
      this.populateTasks();
      this.props.fetchProfile();
      
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  handleSubmitDeleteTask = async (id) => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/deleteTask",
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            username: this.props.globalUsername,
            id: id
          })
        }
      );
      this.populateTasks();
      
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/addTask",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            name: evt.target.name.value, 
            statType: evt.target.stat.value.toLowerCase(),
            statVal: 1,
            completionTime: "",
            username: this.props.globalUsername
          })
        }
      );
      this.populateTasks();
      
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  componentDidMount() {
    this.props.fetchProfile();
    this.populateTasks();
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

  handleDeleteTaskModalToggle = (id) => {
    this.setState({ showDeleteTaskModal: !this.state.showDeleteTaskModal, taskToDelete: id });
  };

  render() {
    return (
      <div>
        <div className="p-0">
          <div className="py-3 px-3 profile-header w-100 d-flex">
            <div className="pl-2 d-inline-block">
              <Avatar
                hat={`/items/${this.props.profile?.hat?.url}`}
                chest={`/items/${this.props.profile?.chest?.url}`}
                pants={`/items/${this.props.profile?.pants?.url}`}
                boots={`/items/${this.props.profile?.boots?.url}`}
                weapon={`/items/${this.props.profile?.weapon?.url}`}
              />
            </div>
            <div className="mt-1 d-inline-block ml-2">
              <p className="mb-1 font-weight-bold h5">
                {this.props.globalUsername ?? "Username"}
              </p>
              <p className="mb-0">XP {this.props.profile?.xp ?? "0"}</p>
              <p className="mb-0">
                {" "}
                <FontAwesomeIcon icon={faCoins} className="mr-2" />
                {this.props.profile?.coins ?? "0"}
              </p>
              <p className="mb-0 stats-display">
                {this.props.profile && (
                  <>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faPlusSquare} />{" "}
                      {this.props.profile.health}
                    </span>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faDumbbell} />{" "}
                      {this.props.profile.strength}
                    </span>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faBrain} />{" "}
                      {this.props.profile.intelligence}
                    </span>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faPalette} />{" "}
                      {this.props.profile.creativity}
                    </span>
                    <span className="mr-2">
                      <FontAwesomeIcon icon={faHandHoldingHeart} />{" "}
                      {this.props.profile.charisma}
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
        </div>
        {this.props.SHOP ? (
          <Shop {...this.props} />
        ) : (
          <Container>
            <div className="scroll-view">
              <ListGroup>
                {this.state.taskList.map((task) => (
                  <ListGroup.Item className="task-item">
                    <p>
                      <FontAwesomeIcon icon={statIcons[task.stat]} />{" "}
                      { task.name }
                    </p>
                    <p>
                      <Button variant="success" size="sm" className="" onClick={() => this.handleComplete(task.id)}>Complete</Button>
                      {" "}
                      <Button variant="danger" size="sm" className="" onClick={() => this.handleDeleteTaskModalToggle(task.id)}><FontAwesomeIcon icon={faTrashAlt} /></Button>
                    </p>
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
              <DeleteTaskModal
                show={this.state.showDeleteTaskModal}
                handleClose={this.handleDeleteTaskModalToggle}
                handleSubmit={() => this.handleSubmitDeleteTask(this.state.taskToDelete)}
                taskToDelete={this.state.taskToDelete}
              />
            </div>
          </Container>
        )}
      </div>
    );
  }
}
