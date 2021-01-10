import { Component } from "react";
import { Modal, Button, Row } from "react-bootstrap";
import styles from "./challengeModal.module.css";

export default class ChallengeModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userXp: "loading...",
      otherXp: "loading...",
      start: "loading...",
      userGain: "loading...",
      otherGain: "loading...",
    };
  }

  handleChallengeAndClose = () => {
    console.log("challenging and closing");
    this.props.handleChallenge();
    this.props.handleClose();
    console.log("done");
  };

  componentDidMount() {
    this.populateChallenge();
  }

  populateChallenge = async () => {
    try{
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getChallenge/" +
          this.props.username +"/"+this.props.friend,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );
  
      let json = await response.json();
  
      if(this.props.friend == json['receiver']){
        this.setState({userXp: json['senderStartXp'],
        otherXp: json['receiverStartXp'],
        start: json['start'],
        userGain: json['senderGains'],
        otherGain: json['receiverGains'],})
      }
      else{
        this.setState({userXp: json['receiverStartXp'],
        otherXp: json['senderStartXp'],
        start: json['start'],
        userGain: json['receiverGains'],
        otherGain: json['senderGains'],})
      }
    }catch (error) {
      console.log("Error: ", error);
      return false;
    }
  };

  render() {
    if (this.props.state == "view") {
      return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.username} VS {this.props.friend}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>START TIME: {this.state.start}</p>
            <Row className="p-2">
              <p>
                {this.props.username} Starting XP: {this.state.userXp}
              </p>
              <p>
              {this.props.friend} Starting XP: {this.state.otherXp}
              </p>
            </Row>
            <Row className="p-2">
              <p>
                {this.props.username} Gain in XP: {this.state.userGain}
              </p>
              <p>
              {this.props.friend} Gain in XP: {this.state.otherGain}
              </p>
            </Row>
            
          </Modal.Body>
        </Modal>
      );
    } else {
      return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Challenge {this.props.friend}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Challenging a friend will allow you to compete directly on your five
            statistics. The challenge will last for a week and both you and your
            opponent's progresses will be tracked and compared. Whoever finishes
            the week having gained more stat points wins! Challenges begin
            immediately when accepted by the invitee.
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={this.handleChallengeAndClose}>
              Challenge!
            </Button>
          </Modal.Footer>
        </Modal>
      );
    }
  }
}
