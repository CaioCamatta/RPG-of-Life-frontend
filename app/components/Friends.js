import { Component } from "react";
import { Container, Row, Col, Button, ListGroup } from "react-bootstrap";
import styles from "./friends.module.css";
import ChallengeModal from "./ChallengeModal.js";
import AddFriendModal from "./AddFriendModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus
} from "@fortawesome/free-solid-svg-icons";

var buttonTypes = {
  "challenge": "primary",
  "pending": "outline-secondary",
  "accept": "success",
  "view": "info"
}

export default class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChallengeModal: false,
      showAddFriendModal: false,
      friendsList: [{ friend: "Loading...", state: "challenge" }],
      userXp: "loading...",
      otherXp: "loading...",
      time: "loading...",
      userGain: "loading...",
      otherGain: "loading...",
      userHat: null,
      userPants: null,
      userBoots: null,
      userChest: null,
      userWeapon: null,
      friendHat: null,
      friendPants: null,
      friendBoots: null,
      friendChest: null,
      friendWeapon: null,
      showLastChallenge: false,
      selectedFriend: "loading..."
    };
  }

  componentDidMount() {
    this.populateFriends();
  }

  populateFriends = async () => {
    try {
      await fetch(
        "https://rpg-of-life-api.herokuapp.com/checkChallenges/" +
          this.props.globalUsername,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getFriends/" +
          this.props.globalUsername,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let chall = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getChallenges/" +
          this.props.globalUsername,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let challenges = await chall.json();
      let friends = await response.json();
      let friendsWithCompleted = []
      for(let i = 0; i < Object.keys(challenges).length; i++){
        if(Object.values(challenges)[i]['completed'] && Object.values(challenges)[i]['accepted']){
          friendsWithCompleted.push(Object.keys(challenges)[i])
        }
      }
     
      let friendsList = [];
      for (let i = 0; i < Object.keys(friends).length; i++) {
        if(friendsWithCompleted.includes(friends[i]["friend"])){
          friendsList.push({
            friend: friends[i]["friend"],
            state: friends[i]["state"],
            hasCompletedChallenge: true
          });
        }
        else{
          friendsList.push({
            friend: friends[i]["friend"],
            state: friends[i]["state"],
            hasCompletedChallenge: false
          });
        }
      }
      if (friendsList.length != 0) {
        this.setState({ friendsList: friendsList });
      }
      else{
        this.setState({ friendsList: [{ friend: "Add Some Friends!", state: "challenge" }] });
      }
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  toggleLastChallenge = async (name) => {
    console.log(name)
    this.setState(
      {
        selectedFriend: name,
      },
      async () => {
        if (name != null) {
          await this.populateChallenge();
        }
        this.setState({
          showLastChallenge: !this.state.showLastChallenge,
        });
      }
    );
  }

  handleChallengeModalToggle = async (state, name) => {
    if (state == "challenge") {
      this.setState({
        showChallengeModal: !this.state.showChallengeModal,
        selectedFriend: name,
        selectedFriendChallengeState: "challenge",
      });
    } else if (state == "accept") {
      try {
        let response = await fetch(
          "https://rpg-of-life-api.herokuapp.com/acceptChallenge",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            mode: "cors",
            body: JSON.stringify({
              receiver: this.props.globalUsername,
              sender: name,
            }),
          }
        );
        this.populateFriends();
      } catch (error) {
        console.log("Error: ", error);
        return false;
      }
    } else if (state == "view") {
      this.setState(
        {
          selectedFriend: name,
          selectedFriendChallengeState: "view",
        },
        async () => {
          if (name != null) {
            await this.populateChallenge();
          }
          this.setState({
            showChallengeModal: !this.state.showChallengeModal,
          });
        }
      );
    } else if (state == "pending") {
      alert("Please wait until your friend accepts your challenge!");
    }
  };

  challengeFriend = async (name) => {
    try {
      console.log(
        JSON.stringify({ sender: this.props.globalUsername, receiver: name })
      );
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/addChallenge",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            sender: this.props.globalUsername,
            receiver: name,
          }),
        }
      );
      this.populateFriends();
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  handleSubmitAddFriend = async (evt) => {
    evt.preventDefault();
    try {
      console.log(
        JSON.stringify({ sender: this.props.globalUsername, receiver: name })
      );
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/addFriend",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
          body: JSON.stringify({
            username: this.props.globalUsername,
            friend: evt.target.name.value,
          }),
        }
      );

      let json = await response.json();
      if (json["message"] != true) {
        alert(json["message"]);
      } else {
        alert("Friend Successfully added!");
      }

      this.populateFriends();
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  handleAddFriendModalToggle = () => {
    this.setState({ showAddFriendModal: !this.state.showAddFriendModal });
  };

  populateChallenge = async () => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getChallenge/" +
          this.props.globalUsername +
          "/" +
          this.state.selectedFriend,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let json = await response.json();

      let plusWeek = new Date(json["start"]);
      plusWeek.setDate(plusWeek.getDate() + 7);

      let days =
        (plusWeek.getTime() - new Date(Date.now()).getTime()) /
        (1000 * 60 * 60 * 24);
      let floorDays = Math.floor(days);
      let hours = (
        (plusWeek.getTime() - new Date(Date.now()).getTime()) /
          (1000 * 60 * 60) -
        floorDays * 24
      ).toFixed(2);

      let userResponse = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getItemsEquipped/" +
          this.props.globalUsername,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let friendResponse = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getItemsEquipped/" +
          this.state.selectedFriend,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let friendItems = await friendResponse.json();
      let userItems = await userResponse.json();

      if (this.state.selectedFriend == json["receiver"]) {
        this.setState({
          userXp: json["senderStartXp"],
          otherXp: json["receiverStartXp"],
          days: floorDays,
          hours: hours,
          userGain: json["senderGains"],
          otherGain: json["receiverGains"],
          userHat: userItems.hat?.url,
          userPants: userItems.pants?.url,
          userBoots: userItems.boots?.url,
          userChest: userItems.chest?.url,
          userWeapon: userItems.weapon?.url,
          friendHat: friendItems.hat?.url,
          friendPants: friendItems.pants?.url,
          friendBoots: friendItems.boots?.url,
          friendChest: friendItems.chest?.url,
          friendWeapon: friendItems.weapon?.url,
        });
      } else {
        this.setState({
          userXp: json["receiverStartXp"],
          otherXp: json["senderStartXp"],
          days: floorDays,
          hours: hours,
          userGain: json["receiverGains"],
          otherGain: json["senderGains"],
          userHat: userItems.hat?.url,
          userPants: userItems.pants?.url,
          userBoots: userItems.boots?.url,
          userChest: userItems.chest?.url,
          userWeapon: userItems.weapon?.url,
          friendHat: friendItems.hat?.url,
          friendPants: friendItems.pants?.url,
          friendBoots: friendItems.boots?.url,
          friendChest: friendItems.chest?.url,
          friendWeapon: friendItems.weapon?.url,
        });
      }
    } catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  render() {
    return (
      <Container className="main">
        <Row>
          <Col>
            <Button variant="link" onClick={() => this.props.navigateHome()}>
              Back
            </Button>
            <div className="header">
              <h1>Friends</h1>
            </div>
            <ListGroup>
              {this.state.friendsList.map((friend) => (
                <ListGroup.Item className="friend-card">
                  <div className="friendNameContainer">
                    <p>{friend.friend}</p>
                  </div>
                  {friend.hasCompletedChallenge ? <div className="mainButtonContainer"><Button variant="warning" onClick={() => this.toggleLastChallenge(friend.friend)}>Results</Button></div> : null}
                  <div className="mainButtonContainer">
                    <Button
                      variant={buttonTypes[friend.state]}
                      onClick={() =>
                        this.handleChallengeModalToggle(
                          friend.state,
                          friend.friend
                        )
                      }
                    >
                      {friend.state.charAt(0).toUpperCase() +
                        friend.state.slice(1)}
                    </Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <div className="addButtonContainer">
              <Button
                variant="light"
                className="addButton mt-2"
                onClick={this.handleAddFriendModalToggle}
              >
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </div>
          </Col>

          <ChallengeModal
            show={this.state.showChallengeModal}
            handleClose={() =>
              this.handleChallengeModalToggle(
                this.state.selectedFriendChallengeState,
                this.state.selectedFriend
              )
            }
            friend={this.state.selectedFriend}
            username={this.props.globalUsername}
            state={this.state.selectedFriendChallengeState}
            handleChallenge={() =>
              this.challengeFriend(this.state.selectedFriend)
            }
            yourXp={this.state.userXp}
            yourGains={this.state.userGain}
            otherXp={this.state.otherXp}
            otherGains={this.state.otherGain}
            days={this.state.days}
            hours={this.state.hours}
            userHat={this.state.userHat}
            userChest={this.state.userChest}
            userBoots={this.state.userBoots}
            userPants={this.state.userPants}
            userWeapon={this.state.userWeapon}
            friendHat={this.state.friendHat}
            friendChest={this.state.friendChest}
            friendBoots={this.state.friendBoots}
            friendPants={this.state.friendPants}
            friendWeapon={this.state.friendWeapon}
            graph={{
              labels: [this.props.globalUsername.toUpperCase(), this.state.selectedFriend.toUpperCase()],
              datasets: [
                {
                  data: [this.state.userGain, this.state.otherGain],
                  backgroundColor: ["#F7464A", "#46BFBD"],
                  hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1"
                  ]
                }
              ]
            }}
          />
          <ChallengeModal
            show={this.state.showLastChallenge}
            handleClose={() =>
              this.toggleLastChallenge(
                this.state.selectedFriend
              )
            }
            friend={this.state.selectedFriend}
            username={this.props.globalUsername}
            state={"lastChallenge"}
            yourXp={this.state.userXp}
            yourGains={this.state.userGain}
            otherXp={this.state.otherXp}
            otherGains={this.state.otherGain}
            days={this.state.days}
            hours={this.state.hours}
            userHat={this.state.userHat}
            userChest={this.state.userChest}
            userBoots={this.state.userBoots}
            userPants={this.state.userPants}
            userWeapon={this.state.userWeapon}
            friendHat={this.state.friendHat}
            friendChest={this.state.friendChest}
            friendBoots={this.state.friendBoots}
            friendPants={this.state.friendPants}
            friendWeapon={this.state.friendWeapon}
            graph={{
              labels: [this.props.globalUsername.toUpperCase(), this.state.selectedFriend.toUpperCase()],
              datasets: [
                {
                  data: [this.state.userGain, this.state.otherGain],
                  backgroundColor: ["#F7464A", "#46BFBD"],
                  hoverBackgroundColor: [
                    "#FF5A5E",
                    "#5AD3D1"
                  ]
                }
              ]
            }}
          />
          <AddFriendModal
            show={this.state.showAddFriendModal}
            handleClose={this.handleAddFriendModalToggle}
            handleSubmit={this.handleSubmitAddFriend}
          />
        </Row>
      </Container>
    );
  }
}
