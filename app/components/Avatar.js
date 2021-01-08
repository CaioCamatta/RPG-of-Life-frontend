import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./avatar.module.css";

export default class Avatar extends Component {
  constructor(props) {
    super(props);

    const { createCanvas, loadImage} = require('canvas');
    const canvas = createCanvas(200, 200);
    const ctx = canvas.getContext('2d');
    
  }
  /*item ids
      mainhand: 96-101,104,106-109,116-119
      off-hand: 112-114
      hat:128
      helmet:129-131
      chest:132-135
      pants:138,139
      boots:146,147
      
  */
  imageslicer(){

  }



  render() {
    return (
      <div id = "avatardiv" className={styles.canvas}>
        <img src="/head.png" alt="head" id = "head" className="avatar" />
        <img src="/arms.png" alt="arms" id = "arms" className="avatar" />
        <img src="/body.png" alt="body" id = "body" className="avatar" />
        <img src="/legs.png" alt="legs" id = "legs" className="avatar" />

      </div>
    );
  }
}
