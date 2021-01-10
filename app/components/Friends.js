import { Component } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import styles from "./friends.module.css";
import ChallengeModal from "./ChallengeModal.js";

var friends = ["Person1", "Person2", "Person3"];

var friendsList = [];

export default class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChallengeModal: false,
      friendsList: [{"friend": "Loading...", "state": "challenge"}]
    };
  }

  componentDidMount() {
    this.populateFriends()
  }

  populateFriends = async () => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getFriends/"+this.props.globalUsername,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let friends = await response.json();
      console.log("friends is:", friends)
      friendsList = [];
      for (let i = 0; i < Object.keys(friends).length; i++) {
        friendsList.push({
          friend: friends[i]['friend'],
          state: friends[i]['state'],
        });
      }
      if(friendsList.length != 0){
        this.setState({friendsList: friendsList})
      }
      
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  }

  handleChallengeModalToggle = (name) => {
    this.setState({
      showChallengeModal: !this.state.showChallengeModal,
      selectedFriend: name,
    });
  };

  challengeFriend = async (name) => {
    //needs to create challenge between two players - fetch to the backend to create a challenge
    //have the challenge available to accept on the other end - in component didMount do a check to see what friends have challenges to accept
    //once accepted have both sides be able to view it - in componentDidMount also
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
              {this.state.friendsList.map((friend, state) => (
                <ListGroup.Item className="friend-card">
                  <p>{friend.friend}</p>
                  <p>{friend.state}</p>
                  <Button
                    variant="primary"
                    onClick={() => this.handleChallengeModalToggle(friend.name)}
                  >
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
            handleChallenge={() =>
              this.challengeFriend(this.state.selectedFriend)
            }
          />
        </Row>
      </Container>
    );
  }
}
