import { Component } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./authentication.module.css";

export default class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {}

  login = (e) => {
    e.preventDefault();

    this.setState({ loading: true }, async () => {
      let success = await this.props.authenticate(
        this.state.username,
        this.state.password
      );

      if (success) {
        this.setState({ loading: false }, () =>
          this.props.setGlobalUsername(this.state.username)
        );
      } else {
        this.setState({ loading: false, loginError: "Invalid Information" });
      }
    });
  };

  handleChange = (e) => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Authentication</h1>
            <Form onSubmit={this.login}>
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="CheeseWhiz74 "
                name="username"
                value={this.state.username}
                onChange={this.handleChange}
              />
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.loginError && (
                <p className="text-danger mb-2">{this.state.loginError}</p>
              )}
              <Button variant="primary" type="submit" className="mt-2">
                {!this.state.loading ? (
                  "Log In"
                ) : (
                  <FontAwesomeIcon icon={faSpinner} spin />
                )}
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
