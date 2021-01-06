import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./authentication.module.css";

export default class Authentication extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Authentication</h1>
            <p>Click to login</p>
            <Button
              variant="primary"
              onClick={() => this.props.navigateHome()}
            >
              Log In
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
