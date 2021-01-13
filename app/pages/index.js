import Head from "next/head";
import Link from "next/link";
import MainApp from "../components/App";
import { Component } from "react";
import { Button } from "react-bootstrap";
import Avatar from "../components/Avatar";
import styles from "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCoins,
  faDumbbell,
  faPlusSquare,
  faBrain,
  faPalette,
  faHandHoldingHeart,
  faSpinner,
  faFolderOpen,
} from "@fortawesome/free-solid-svg-icons";

var statIcons = {
  health: faHandHoldingHeart,
  strength: faDumbbell,
  intelligence: faBrain,
  creativity: faPalette,
  charisma: faPlusSquare,
  spinner: faSpinner,
  empty: faFolderOpen,
};

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: "index",
    };
  }

  render() {
    return this.state.page === "app" ? (
      <MainApp />
    ) : (
      this.renderDefaultNextJsIndex()
    );
  }

  // Ignore this. It's the default page that comes with Next.JS
  // We will delete it eventually
  renderDefaultNextJsIndex() {
    return (
      <div id = "bod" className="container">
        <Head>
          <title>RPG Of Life</title>
          <link rel="icon" href="/items/lightsteelhelmet.png" />
        </Head>

        <main  className="container pt-5">
          <div className="text-center">
            
            <h1 className="title"><img id="icon1" src="/items/goldenbastard.png"/>RPG of Life<img id="icon2" src="/items/royalaxe.png"/></h1>
            
            <p className="description mb-5">Be the Hero of Your Dreams...and Your Day</p>

            <Button
            id = "entry"
              onClick={() => {
                this.setState({ page: "app" });
              }}
              variant="primary"
              className="mb-5"
            >
              Start Your Adventure!
            </Button>
          </div>
          <div>
          
          <h2>What is RPG of Life?</h2>
            <p className="description">
              Have you ever wanted to solve quests and handle tasks like an RPG Adventurer? 
              Using the RPG of Life app, you can do just that.
              <br>
              </br>
              All you have to do is create an account, then complete the tasks handed to you or create personal tasks everyday.
              Complete Solo Tasks to gain experience to upgrade your stats and gain gold to buy items, or compete against your friends in group challenges to be the Top Adventurer in your party
            </p>
            

          </div>
          <h3>The Stats</h3>
          <p className="description mb-5">As a new Adventurer, your stats divided into 5 categories:</p>
          <ul >
            <li className="description mb-1">Health: i.e. self-care and personal hygiene  </li>
            <li className="description mb-1">Strength: i.e. exercise</li>
            <li className="description mb-1">Intelligence: i.e. reading or studying</li>
            <li className="description mb-1">Charisma: i.e. social activities</li>
            <li className="description mb-1">Creativity: i.e. painting a picture  or working on a personal project</li>
          </ul>
          
          <p className="description mb-5">
              When you start with your new character, your stats start off at 1. To increase these stats, accomplish tasks that are categorized to these stats.
          </p>
          
          <h3>The Shop</h3>
          
          <p className="description mb-5">When you collect enough gold from doing tasks, you can purchase new cosmetic armour pieces and weapons to make your Avatar the hero that you wish to be.
            <br></br>
            </p>
          <p className="description mb-5">Armour and Weapons can range from: </p>
          <table>
            <tr>
              <th>Commoner's Set of Leather Armour with a Wooden Sword</th>
              <th>to</th>
              <th>The Dread Armour of Og'nil Far with an Acursed Blade of Corruption</th>
            </tr>
            <tr>
              <td><Avatar weapon="/items/trainingsword.png" boots="/items/commonersboots.png" chest ="/items/leatherarmour.png" pants="/items/knightlypants.png" hat="/items/leatherhelmet.png"/></td>
              <td><img src="/arrow.png" width="50"/></td>
              <td><Avatar weapon="/items/corruptsword.png" boots="/items/steeltoeboots.png" chest ="/items/dreadchest.png" pants="/items/knightlypants.png" hat="/items/dreadhelm.png"/></td>
            </tr>
          </table>
          
          <h3>Why RPG of Life?</h3>
          <p className="description mb-5">Using this application puts a more fun and rewarding experience to your daily activity scheduling. Here you can plan out 
            the tasks you wish to complete for that day, while having the sense of character development and progression only found in Roleplaying games.
            <br></br>
            Another benefit is the ability to challenge and compete with your friends/ party members to boost each other's productivity. Remember a party that works together can conquer anything.
          </p>
          <img className = "makewater"  id = "makewater4" src="/items/ryallsstaff.png"/>

          <h2> So what are you waiting for? Start adding tasks and begin your Adventure!</h2>
          
          <Button
              id = "start"
              onClick={() => {
                this.setState({ page: "app" });
              }}
              variant="primary"
              className="mb-5"
            >
              <p>Sign Up Now</p>
            </Button>
            <img className = "makewater" id="makewater1" src="/items/crystalhelmet.png" />
            <img className = "makewater" id="makewater2" src="/items/mystictrident.png"/>
            <img className = "makewater" id = "makewater3" src="/items/kingsword.png"/>
            
            
            
        </main>
        <style jsx>{`
          
          .container {
            min-height: 100vh;
            padding: 0 0.5rem;
            display: flex;
            flex-direction: column;
          }

          main {
            padding: 5rem 0;
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
          }

          .title {
            margin: 0;
            line-height: 1.15;
            font-size: 4rem;
          }

          .description {
            line-height: 1.5;
            font-size: 1.5rem;
          }
        `}</style>
      </div>
    );
  }
}
