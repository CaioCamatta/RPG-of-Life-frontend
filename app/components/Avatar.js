import { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import styles from "./avatar.module.css";

class Avatar extends Component {
  constructor(props) {
    super(props);
    
  }


  displayHelmet(ctx, helm){
    var helmet = new Image()
    helmet.src = helm
    helmet.onload = () => {
      ctx.drawImage(helmet,20,17,54,38);
    }
  }
  displayChest(ctx, body){
    var chest = new Image()
    chest.src = body
    chest.onload = () => {
      ctx.drawImage(chest,20,37,52,38);
    }
  }
  displayPants(ctx, legs){
    var pants = new Image()
    pants.src = legs
    pants.onload = () => {
      ctx.drawImage(pants,32,56,30,30)
    }
  }
  displayBoots(ctx, feet){

    var boots = new Image()
    boots.src = feet
    boots.onload = () => {
      ctx.drawImage(boots,33,70,28,20)
    }
  }
  displayWeapons(ctx,weapon){
    var sword = new Image()
    sword.src = weapon
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

    //ids sent into corresponding display functions
    var bootid = this.props.boots
    var pantid = this.props.pants
    var chestid = this.props.chest
    var headid = this.props.helm
    var weaponid = this.props.weapon

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
    var pants = new Image()
    pants.src = "/underwear.png"
    pants.onload = () => {
      ctx.drawImage(pants,32,56,30,30)
    }
    
    var legimage = new Image()
    legimage.src = "/legs.png"
    legimage.onload = () => {
      ctx.drawImage(legimage,0,12)
    }
    

    /*Armour section*/
    //first boots, then pants, the chest, then head, then helmet, then arms, then weapon
    this.displayBoots(ctx, bootid)
    this.displayPants(ctx, pantid)
    this.displayChest(ctx, chestid)

    var headimage = new Image()
    headimage.src = "/head.png"
    headimage.onload = () => {
      ctx.drawImage(headimage,0,0)
      
    }

    this.displayHelmet(ctx, headid)



    //arms are the last layer of the body sprite
    var armimage = new Image()
    armimage.src = "/arms.png"
    armimage.onload = () => {
      ctx.drawImage(armimage,0,0)
    }

    //sword
    this.displayWeapons(ctx, weaponid)

  }

  render() {
    return (
 
      <div id="avatardiv" className={styles.canvas}>
        <canvas ref="canvas" id = "avatarcanvas" width={95} height={115} />
      </div>

    );

  }

}
export default Avatar;