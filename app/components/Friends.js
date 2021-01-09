import { Component } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import styles from "./friends.module.css";
import ChallengeModal from "./ChallengeModal.js";

var friends = [
  "Person1",
  "Person2",
  "Person3"
]

var friendsList = [];  

export default class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChallengeModal: false,
    };

    friendsList = [];

    for (let i = 0; i < friends.length; i++) {
      friendsList.push({
        name: friends[i],
        challenge_state: 0
      });
    }

    this.state = { friendsList };
  }

  handleChallengeModalToggle = (name) => {
    this.setState({ showChallengeModal: !this.state.showChallengeModal, selectedFriend: name });
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Button variant="link" onClick={() => this.props.navigateHome()}>
              Back
            </Button>
            <h1>Friends</h1>
            <ListGroup>
              {this.state.friendsList.map((friend, index) => (
                <ListGroup.Item className="friend-card">
                  <p>
                    { friend.name }
                  </p>
                  <Button variant="primary" onClick={() => this.handleChallengeModalToggle(friend.name)}>
                    Challenge
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Col>
          <ChallengeModal
            show={this.state.showChallengeModal}
            handleClose={() => this.handleChallengeModalToggle(null)}
            friend={this.state.selectedFriend}
          />
        </Row>
      </Container>
    );
  }
}
