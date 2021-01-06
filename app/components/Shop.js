import { Component } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import styles from "./shop.module.css";

export default class Shop extends Component {
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
            <h1>Shop</h1>
          </Col>
        </Row>
      </Container>
    );
  }
}
