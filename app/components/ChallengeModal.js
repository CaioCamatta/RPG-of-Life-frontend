import { Component } from "react";
import { Modal, Button, Row, Col } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import styles from "./challengeModal.module.css";
import Avatar from "./Avatar";

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
            <Modal.Title>Progress</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="time">
              {this.props.days > 1 ? (
                <p>
                  Remaining Time: {this.props.days} Days and {this.props.hours}{" "}
                  Hours{" "}
                </p>
              ) : (
                <p>
                  Remaining Time: {this.props.days} Day and {this.props.hours}{" "}
                  Hours
                </p>
              )}
            </div>
            <Row>
              <Col className="centering">
                <div className="bold">
                  {this.props.username.toUpperCase()}
                </div>

                <Avatar
                  hat={"./items/" + this.props.userHat}
                  chest={"./items/" + this.props.userChest}
                  boots={"./items/" + this.props.userBoots}
                  pants={"./items/" + this.props.userPants}
                  weapon={"./items/" + this.props.userWeapon}
                />
                <p>Starting XP: {this.props.yourXp}</p>
              </Col>
              <Col className="centering">
                <div className="bold">{this.props.friend.toUpperCase()}</div>
                <Avatar
                  hat={"./items/" + this.props.friendHat}
                  chest={"./items/" + this.props.friendChest}
                  boots={"./items/" + this.props.friendBoots}
                  pants={"./items/" + this.props.friendPants}
                  weapon={"./items/" + this.props.friendWeapon}
                />
                <p>Starting XP: {this.props.otherXp}</p>
              </Col>
            </Row>
            <Col className="mt-4">
              <div className="time">
                <p className="bold">Gains in XP</p>
              </div>
              <Row>
                <Doughnut
                  data={this.props.graph}
                  options={{ responsive: true }}
                />
              </Row>
            </Col>
          </Modal.Body>
        </Modal>
      );
    } else if (this.props.state == "lastChallenge") {
      return (
        <Modal show={this.props.show} onHide={this.props.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Results</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col className="centering">
                <div className="bold">
                  {this.props.username.toUpperCase()}
                </div>

                <Avatar
                  hat={"./items/" + this.props.userHat}
                  chest={"./items/" + this.props.userChest}
                  boots={"./items/" + this.props.userBoots}
                  pants={"./items/" + this.props.userPants}
                  weapon={"./items/" + this.props.userWeapon}
                />
                <p>Starting XP: {this.props.yourXp}</p>
              </Col>
              <Col className="centering">
                <div className="bold">{this.props.friend.toUpperCase()}</div>
                <Avatar
                  hat={"./items/" + this.props.friendHat}
                  chest={"./items/" + this.props.friendChest}
                  boots={"./items/" + this.props.friendBoots}
                  pants={"./items/" + this.props.friendPants}
                  weapon={"./items/" + this.props.friendWeapon}
                />
                <p>Starting XP: {this.props.otherXp}</p>
              </Col>
            </Row>
            <Col className="mt-4">
              <div className="time">
                <p className="bold">Final Total XP</p>
              </div>
              <Row>
                <Doughnut
                  data={this.props.graph}
                  options={{ responsive: true }}
                />
              </Row>
            </Col>
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
