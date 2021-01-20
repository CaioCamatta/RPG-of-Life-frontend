import { Component } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

import styles from "./authentication.module.css";

export default class Authentication extends Component {
  constructor(props) {
    super(props);

    this.state = { showSignUpModel: false };
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

  createAccount = async (signUpUsername, signUpPassword, signUpEmail) => {
    /* Returns "true" if successfully authenticated, "false" otherwise. 
    Logs an error the call returns an error. */
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/addPlayer",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: signUpUsername,
            password: signUpPassword,
            email: signUpEmail,
          }),
          mode: "cors",
        }
      );

      let json = await response.json();

      console.log(
        "Sign Up successful? " + (json.message === "success").toString()
      );

      // To whom it may concern, we know this is not secure authentication
      return json.message === "success";
    } catch (error) {
      console.log("Sign Up error: ", error);
      return false;
    }
  };

  signup = async (e) => {
    e.preventDefault();

    if (this.state.signUpPassword === this.state.signUpPasswordconfirm) {
      this.setState({ loading: true }, async () => {
        let success = await this.createAccount(
          this.state.signUpUsername,
          this.state.signUpPassword,
          this.state.signUpEmail
        );

        if (success) {
          this.setState({ loading: false }, () =>
            this.props.setGlobalUsername(this.state.signUpUsername)
          );
        } else {
          this.setState({ loading: false, signUpError: "Invalid Information" });
        }
      });
    } else {
      this.setState({ signUpError: "Passwords don't match" });
    }
  };

  handleChange = (e) => {
    e.preventDefault();

    this.setState({ [e.target.name]: e.target.value });
  };

  handleSignUpModalToggle = () => {
    this.setState({ showSignUpModel: !this.state.showSignUpModel });
  };

  renderSignUpModal = () => {
    return (
      <Modal
        show={this.state.showSignUpModel}
        onHide={this.handleSignUpModalToggle}
      >
        <Modal.Header closeButton>
          <Modal.Title>Sign Up</Modal.Title>
        </Modal.Header>
        <div className="p-3">
          <Form onSubmit={this.signup}>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Username"
              name="signUpUsername"
              value={this.state.signUpUsername}
              onChange={this.handleChange}
              className="mb-2"
            />
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="jane.doe@gmail.com"
              name="signUpEmail"
              value={this.state.signUpEmail}
              onChange={this.handleChange}
              className="mb-2"
            />
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="signUpPassword"
              value={this.state.signUpPassword}
              onChange={this.handleChange}
              className="mb-2"
            />
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              name="signUpPasswordconfirm"
              value={this.state.signUpPasswordconfirm}
              onChange={this.handleChange}
              className="mb-2"
            />
            {this.state.signUpError && (
              <p className="text-danger mb-2">{this.state.signUpError}</p>
            )}
            <Modal.Footer className="mt-2">
              <Button
                variant="secondary"
                onClick={this.handleSignUpModalToggle}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Create Account
              </Button>
            </Modal.Footer>
          </Form>
        </div>
      </Modal>
    );
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
                placeholder="Username"
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
            <Button
              variant="outline-primary"
              type="submit"
              className="mt-3"
              onClick={this.handleSignUpModalToggle}
            >
              {!this.state.loading ? (
                "Sign Up"
              ) : (
                <FontAwesomeIcon icon={faSpinner} spin />
              )}
            </Button>
            {this.renderSignUpModal()}
          </Col>
        </Row>
      </Container>
    );
  }
}
