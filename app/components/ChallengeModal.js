import { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import styles from "./challengeModal.module.css";

export default class ChallengeModal extends Component {
  constructor(props) {
    super(props);
  }

  handleChallengeAndClose = () => {
    console.log("challenging and closing");
    this.props.handleChallenge();
    this.props.handleClose();
    console.log("done");
  };


  render() {
    if (this.props.state == "view") {
      return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {this.props.username.toUpperCase()} VS {this.props.friend.toUpperCase()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Remaining Time: {this.props.days} Days and {this.props.hours} Hours </p>
            <Row className="p-2">
              <Col>
                <p>
                  {this.props.username.toUpperCase()} Starting XP: {this.props.yourXp}
                </p>
                <p>
                  {this.props.username.toUpperCase()} Gain in XP: {this.props.yourGains}
                </p>
              </Col>
              <Col>
                <p>
                  {this.props.friend.toUpperCase()} Starting XP: {this.props.otherXp}
                </p>
                <p>
                  {this.props.friend.toUpperCase()} Gain in XP: {this.props.otherGains}
                </p>
              </Col> 
            </Row>           
          </Modal.Body>
        </Modal>
      );
    } 
    else if(this.props.state == "lastChallenge"){
      return(
      <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <p>CHALLENGE RESULTS</p>
              {this.props.username.toUpperCase()} VS {this.props.friend.toUpperCase()}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Remaining Time: {this.props.days} Days and {this.props.hours} Hours </p>
            <Row className="p-2">
              <Col>
                <p>
                  {this.props.username.toUpperCase()} Starting XP: {this.props.yourXp}
                </p>
                <p>
                  {this.props.username.toUpperCase()} Gain in XP: {this.props.yourGains}
                </p>
              </Col>
              <Col>
                <p>
                  {this.props.friend.toUpperCase()} Starting XP: {this.props.otherXp}
                </p>
                <p>
                  {this.props.friend.toUpperCase()} Gain in XP: {this.props.otherGains}
                </p>
              </Col> 
            </Row>           
          </Modal.Body>
        </Modal>
      )
    }
    else {
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
