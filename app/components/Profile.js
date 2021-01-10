import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Avatar from "./Avatar";
import styles from "./profile.module.css";

export default class Profile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Button variant="link" onClick={() => this.props.navigateHome()}>
              Back
            </Button>
            <h1>Profile</h1>
            <Avatar helm="" chest="" pants = ""  boots = "" weapon = ""/>
          </Col>
        </Row>
      </Container>
    );
  }
}
