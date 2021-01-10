import { Component } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faDotCircle,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./shop.module.css";
import Avatar from "./Avatar";

const SHOP_ITEM_WIDTH = 32;
const SHOP_ITEM_HEIGHT = 32;

function ShopItem({
  name,
  price,
  type,
  url,
  purchased,
  equipped,
  showPurchaseModal,
  onClickToEquip,
}) {
  return (
    <div
      className="shop-item m-2 p-2 border border-secondary"
      onClick={
        !purchased ? showPurchaseModal : !equipped ? onClickToEquip : null
      }
    >
      <img
        src={`/items/${url}`}
        alt={name}
        className="img-fluid mx-auto"
        height={SHOP_ITEM_HEIGHT}
        width={SHOP_ITEM_WIDTH}
      />
      <p className="mb-1 text-center">
        {!purchased ? (
          <>
            <FontAwesomeIcon icon={faCoins} className="mt-1" />
            {price}
          </>
        ) : equipped ? (
          <FontAwesomeIcon icon={faCheckCircle} className="mt-1" />
        ) : (
          <FontAwesomeIcon icon={faDotCircle} type="regular" className="mt-1" />
        )}
      </p>
    </div>
  );
}

export default class Shop extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showPurchaseModal: false,
      itemsOwned: [],
      itemsEquipped: [],
    };
  }

  componentDidMount() {
    this.fetchShopItems();
    this.fetchItemsOwned();
    this.fetchItemsEquipped();
  }

  // In a parallel universe, where we have actual pages for shop, friends, etc,
  //  this function would be called from getStaticProps() to allow static generation
  fetchShopItems = async () => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getShop",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      let json = await response.json();

      console.log("Fetched " + Object.keys(json).length + " shop items.");

      let items = Object.values(json);

      this.setState({
        shopItems: items,
      });
    } catch (error) {
      console.log("fetchShopItems error: ", error);
    }
  };

  fetchItemsOwned = async () => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getItemsOwned/" +
          this.props.globalUsername,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let json = await response.json();

      console.log("Fetched " + Object.keys(json).length + " items owned.");

      let items = Object.values(json);

      var itemNames = [];
      items.forEach((element) => itemNames.push(element.name));

      console.log("items owned: ", itemNames);

      this.setState({
        itemsOwned: itemNames,
      });
    } catch (error) {
      console.log("fetchItemsOwned error: ", error);
    }
  };

  // In a parallel universe, where we have actual pages for shop, friends, etc,
  //  this function would be called from getStaticProps() to allow static generation
  fetchItemsEquipped = async () => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/getItemsEquipped/" +
          this.props.globalUsername,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          mode: "cors",
        }
      );

      let json = await response.json();

      console.log("Fetched " + Object.keys(json).length + " items equipped.");

      let items = Object.values(json);

      var itemNames = [];
      items.forEach((element) => itemNames.push(element?.name));

      console.log("items equipped: ", itemNames);

      this.setState({
        itemsEquipped: itemNames,
      });
    } catch (error) {
      console.log("fetchItemsOwned error: ", error);
    }
  };

  onClickToPurchase = async () => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/purchaseItem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.props.globalUsername,
            name: this.state.itemToPurchase.name,
          }),
          mode: "cors",
        }
      );

      let json = await response.json();

      let success = Object.values(json)[0];

      if (success) {
        console.log("Purchased " + this.state.itemToPurchase.name);

        this.togglePurchaseConfirmationModel();
        this.fetchItemsOwned();
      }
    } catch (error) {
      console.log("onClickToPurchase error: ", error);
    }
  };

  onClickToEquip = async (itemName) => {
    try {
      let response = await fetch(
        "https://rpg-of-life-api.herokuapp.com/equipItem",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.props.globalUsername,
            name: itemName,
          }),
          mode: "cors",
        }
      );

      let json = await response.json();

      let success = Object.values(json);
      console.log(json);

      if (success) {
        console.log("Equipped " + itemName);
        this.fetchItemsEquipped();
      }
    } catch (error) {
      console.log("onClickToEquip error: ", error);
    }
  };

  togglePurchaseConfirmationModel = (item) => {
    this.setState({
      showPurchaseModal: !this.state.showPurchaseModal,
      itemToPurchase: this.state.showPurchaseModal ? null : item,
    });
  };

  renderPurchaseConfirmationModal = ({ item, show, onHide, onConfirm }) => {
    return (
      <Modal show={show} onHide={onHide} className="mx-auto" size="sm">
        <Modal.Header closeButton>
          <Modal.Title>Purchase?</Modal.Title>
        </Modal.Header>
        <div className="p-3 d-flex">
          <img
            src={`/items/${item.url}`}
            alt={item.name}
            className="img-fluid mx-auto"
            height={SHOP_ITEM_HEIGHT}
            width={SHOP_ITEM_WIDTH}
          />
        </div>
        <p className="mb-1 text-center">
          <FontAwesomeIcon icon={faCoins} className="mr-2" />
          {item.price}
        </p>
        <Modal.Footer className="mt-2">
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            Purchase
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    return (
      <Container className="mt-5">
        <Row>
          <Col>
            <Button variant="link" onClick={() => this.props.navigateHome()}>
              Back
            </Button>
            <h1>Shop</h1>
            <div className="blacksmith d-flex">
              <img
                src="/blacksmith.png"
                alt="Blacksmith"
                className="img-fluid h-100 mx-auto"
              />
            </div>
            <Avatar />
          </Col>
        </Row>
        <Row>
          {this.state?.shopItems?.map((item, index) => {
            return (
              <ShopItem
                key={index}
                name={item.name}
                type={item.type}
                price={item.price}
                url={item.url}
                equipped={this.state.itemsEquipped.includes(item.name)}
                purchased={this.state.itemsOwned.includes(item.name)}
                showPurchaseModal={() =>
                  this.togglePurchaseConfirmationModel(item)
                }
                onClickToEquip={() => this.onClickToEquip(item.name)}
              />
            );
          })}
        </Row>
        {this.state.itemToPurchase && (
          <this.renderPurchaseConfirmationModal
            item={this.state.itemToPurchase}
            show={this.state.showPurchaseModal}
            onHide={this.togglePurchaseConfirmationModel}
            onConfirm={this.onClickToPurchase}
          />
        )}
      </Container>
    );
  }
}
