import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./avatar.module.css";

class Avatar extends Component {
  constructor(props) {
    super(props);
  }

  displayHelmet(ctx) {
    var helmet = new Image();
    helmet.src = this.props.helm;
    if (!this.props.helm) {
      this.displayArms(ctx);
    }
    helmet.onload = () => {
      ctx.drawImage(helmet, 20, 17, 54, 38);
      this.displayArms(ctx);
    };
  }
  displayChest(ctx) {
    var chest = new Image();
    chest.src = this.props.chest;
    if (!this.props.chest) {
      this.displayHead(ctx);
    }
    chest.onload = () => {
      ctx.drawImage(chest, 25.5, 37, 45, 38);
      this.displayHead(ctx);
    };
  }
  displayPants(ctx) {
    var pants = new Image();
    pants.src = this.props.pants;
    if (!this.props.pants) {
      this.displayChest(ctx);
    }
    pants.onload = () => {
      ctx.drawImage(pants, 30.5, 56, 32, 30);
      this.displayChest(ctx);
    };
  }
  displayBoots(ctx) {
    var boots = new Image();
    boots.src = this.props.boots;
    if (!this.props.boots) {
      this.displayPants(ctx);
    }
    boots.onload = () => {
      ctx.drawImage(boots, 33, 70, 28, 20);
      this.displayPants(ctx);
    };
  }
  displayWeapons(ctx) {
    var sword = new Image();
    sword.src = this.props.weapon;
    sword.onload = () => {
      ctx.drawImage(sword, 55.5, 36, 32, 32);
    };
  }
  
  //Body
  displayHead(ctx) {
    var headimage = new Image();
    headimage.src = "/head.png";
    headimage.onload = () => {
      ctx.drawImage(headimage, 0, 0);
      this.displayHelmet(ctx);
    };
  }
  displayBod(ctx) {
    var bodyimage = new Image();
    bodyimage.src = "/body.png";
    bodyimage.onload = () => {
      ctx.drawImage(bodyimage, 0, 0);
      this.displayLegs(ctx);
    };
  }
  displayLegs(ctx) {
    var pants = new Image();
    pants.src = "/underwear.png";
    pants.onload = () => {
      ctx.drawImage(pants, 32, 56, 30, 30);
      this.displayBoots(ctx);
    };
  }
  displayFeet(ctx) {
    var legimage = new Image();
    legimage.src = "/legs.png";
    legimage.onload = () => {
      ctx.drawImage(legimage, 0, 12);
      this.displayBod(ctx);
    };
  }
  displayArms(ctx) {
    var armimage = new Image();
    armimage.src = "/arms.png";
    armimage.onload = () => {
      ctx.drawImage(armimage, 0, 0);
      this.displayWeapons(ctx);
    };
  }

  componentDidMount() {
    this.drawAvatar();
  }
  componentDidUpdate() {
    this.drawAvatar();
  }
  drawAvatar = () => {
    // initailizes canvas reference

    const canvas = this.refs.canvas;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    this.displayFeet(ctx);
  };

  render() {
    return (
      <div id="avatardiv" className={styles.canvas}>
        <canvas ref="canvas" id="avatarcanvas" width={95} height={115} />
      </div>
    );
  }
}
export default Avatar;
