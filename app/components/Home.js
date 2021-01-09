import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showAddTaskModal: false,
    };
  }

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
                  {this.state.profile?.username ?? "Username"}
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
          <Row>
            <Col className="text-center">
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
      </div>
    );
  }
}
