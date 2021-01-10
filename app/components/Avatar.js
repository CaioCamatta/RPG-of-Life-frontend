import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./avatar.module.css";

import Canvas from './Canvas'
import slicer from './slicer'




class Avatar extends Component {
  constructor(props) {
    super(props);
    
  }


  displayHelmet(ctx, helm){
    var helmet = new Image()
    helmet.src = "/darkhelmet.png"
    helmet.onload = () => {
      ctx.drawImage(helmet,20,17,54,38);
    }
  }
  displayChest(ctx, body){
    var chest = new Image()
    chest.src = "/darkchest.png"
    chest.onload = () => {
      ctx.drawImage(chest,20,38,52,38);
    }
  }
  displayPants(ctx, legs){
    var pants = new Image()
    pants.src = "/underwear.png"
    pants.onload = () => {
      ctx.drawImage(pants,32,56,30,30)
    }
  }
  displayBoots(ctx, feet){

    var boots = new Image()
    boots.src = "/steeltoeboots.png"
    boots.onload = () => {
      ctx.drawImage(boots,32,62,28,33)
    }
  }
  displayWeapons(ctx){
    var sword = new Image()
    sword.src = "/trainingsword.png"
    sword.onload = () => {
      ctx.drawImage(sword,55.5,36,32,32)
    }
  }
  displayShield(){

  }

  componentDidMount(){
    // initailizes canvas reference
    const canvas = this.refs.canvas
    const ctx = canvas.getContext("2d")
    

    var gear = [101,129,132,138,146]
    // booleans
    var boots = true

    //basic body format, no items
    var headimage = new Image()
    headimage.src = "/head.png"
    headimage.onload = () => {
      ctx.drawImage(headimage,0,0)
      
    }
    var bodyimage = new Image()
    bodyimage.src = "/body.png"
    bodyimage.onload = () => {
      ctx.drawImage(bodyimage,0,0)
      
    }
    if (!boots){
      var legimage = new Image()
      legimage.src = "/legs.png"
      legimage.onload = () => {
        ctx.drawImage(legimage,0,0)
      }
    }
    var bootid = 146
    var pantid = 138
    var chestid = 132
    var headid = 129
    var weaponid = 101
    this.displayBoots(ctx, bootid)
    this.displayPants(ctx, pantid)
    this.displayChest(ctx, chestid)
    this.displayHelmet(ctx, headid)



    //arms are the last layer of the body sprite
    var armimage = new Image()
    armimage.src = "/arms.png"
    armimage.onload = () => {
      //ctx.drawImage(armimage,-22,-22,140,140)
      ctx.drawImage(armimage,0,0)
    }

    //sword
    this.displayWeapons(ctx, weaponid)

  }


  render() {
    return (
 
      <div id="avatardiv" className={styles.canvas}>
        <canvas ref="canvas" width={640} height={425} />
        

      </div>
    );

  }

}
export default Avatar;