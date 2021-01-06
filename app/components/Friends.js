import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./friends.module.css";
import ChallengeModal from "./ChallengeModal.js";

export default class Friends extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showChallengeModal: false,
    };
  }

  handleChallengeModalToggle = () => {
    this.setState({ showChallengeModal: !this.state.showChallengeModal });
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
            <Button variant="primary" onClick={this.handleChallengeModalToggle}>
              Challenge
            </Button>
          </Col>
          <ChallengeModal
            show={this.state.showChallengeModal}
            handleClose={this.handleChallengeModalToggle}
          />
        </Row>
      </Container>
    );
  }
}
