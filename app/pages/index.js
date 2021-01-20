import Head from "next/head";
import Link from "next/link";
import { Component } from "react";
import { Button, Row } from "react-bootstrap";
import Avatar from "../components/Avatar";

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
  }

  render() {
    return (
      <div id="bod">
        <Row>
          <Head>
            <title>RPG Of Life</title>
            <link rel="icon" href="/items/lightsteelhelmet.png" />
          </Head>

          <main className="pt-5">
            <div className="text-center container">
              <h1 className="title">
                <img id="icon1" src="/items/goldenbastard.png" />
                RPG of Life
                <img id="icon2" src="/items/royalaxe.png" />
              </h1>

              <p className="description mb-5">
                Be the Hero of Your Dreams...and Your Day
              </p>

              <Link href="app">
                <Button id="entry" variant="primary" className="mb-5" size="lg">
                  Start Your Adventure!
                </Button>
              </Link>
            </div>

            <div id="gs1" className="gs my-4 py-5">
              <div className="container">
                <h2 className="text-center mt-1 mb-4">What is RPG of Life?</h2>

                <p className="">
                  Have you ever wanted to solve quests and handle tasks like an
                  RPG Adventurer? Using the RPG of Life app, you can do just
                  that.
                  <br></br>
                  All you have to do is create an account, then complete the
                  tasks handed to you or create personal tasks everyday.
                  Complete Solo Tasks to gain experience to upgrade your stats
                  and gain gold to buy items, or compete against your friends in
                  group challenges to be the Top Adventurer in your party
                </p>
              </div>
            </div>

            <div id="gs2" className="gs mb-5 container">
              <h2 className="text-center mt-1 mb-4">The Stats</h2>
              <p className="mb-2">
                As a new Adventurer, your stats divided into 5 categories:
              </p>
              <ul>
                <li className=" mb-1">
                  Health: i.e. self-care and personal hygiene{" "}
                </li>
                <li className=" mb-1">Strength: i.e. exercise</li>
                <li className=" mb-1">
                  Intelligence: i.e. reading or studying
                </li>
                <li className=" mb-1">Charisma: i.e. social activities</li>
                <li className=" mb-1">
                  Creativity: i.e. painting a picture or working on a personal
                  project
                </li>
              </ul>

              <p>
                When you start with your new character, your stats start off at
                1.
                <br></br>
                To increase these stats, accomplish tasks that are categorized
                to these stats.
              </p>
            </div>

            <div id="gs3" className="gs py-5">
              <div className="container">
                <h2 className="text-center mt-1 mb-4">The Shop</h2>

                <p className="">
                  When you collect enough gold from doing tasks, you can
                  purchase new cosmetic armour pieces and weapons to make your
                  Avatar the hero that you wish to be.
                  <br></br>
                </p>
                <p className=" mb-5">Armour and Weapons can range from: </p>
                <table>
                  <tr>
                    <th>
                      Commoner's Set of Leather Armour with a Wooden Sword
                    </th>
                    <th>to</th>
                    <th>
                      The Dread Armour of Og'nil Far with an Acursed Blade of
                      Corruption
                    </th>
                  </tr>
                  <tr>
                    <td>
                      <Avatar
                        weapon="/items/trainingsword.png"
                        boots="/items/commonersboots.png"
                        chest="/items/leatherarmour.png"
                        pants="/items/knightlypants.png"
                        hat="/items/leatherhelmet.png"
                      />
                    </td>
                    <td>
                      <img src="/arrow.png" width="50" />
                    </td>
                    <td>
                      <Avatar
                        weapon="/items/corruptsword.png"
                        boots="/items/steeltoeboots.png"
                        chest="/items/dreadchest.png"
                        pants="/items/knightlypants.png"
                        hat="/items/dreadhelm.png"
                      />
                    </td>
                  </tr>
                </table>
              </div>
            </div>

            <div id="gs4" className="gs py-5">
              <div className="container">
                <h3 className="text-center mt-1 mb-4">Why RPG of Life?</h3>
                <p className=" mb-5">
                  Using this application puts a more fun and rewarding
                  experience to your daily activity scheduling. Here you can
                  plan out the tasks you wish to complete for that day, while
                  having the sense of character development and progression only
                  found in Roleplaying games.
                  <br></br>
                  Another benefit is the ability to challenge and compete with
                  your friends/ party members to boost each other's
                  productivity. Remember a party that works together can conquer
                  anything.
                </p>
              </div>
            </div>

            <div className="text-center mt-5">
              <h4 className="text-center mt-1 mb-4">
                {" "}
                Start adding tasks and begin your Adventure!
              </h4>
              <Link href="app">
                <Button
                  id="start"
                  variant="primary"
                  className="mb-5 mt-3"
                  size="lg"
                >
                  Sign Up Now
                </Button>
              </Link>
            </div>

            <img
              className="makewater"
              id="makewater1"
              src="/items/crystalhelmet.png"
            />
            <img
              className="makewater"
              id="makewater2"
              src="/items/mystictrident.png"
            />
            <img
              className="makewater"
              id="makewater3"
              src="/items/kingsword.png"
            />
            <img
              className="makewater"
              id="makewater4"
              src="/items/ryallsstaff.png"
            />
          </main>
        </Row>
        <style jsx>{`
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

          body {
            /*background-image: linear-gradient(#F17105,#E6C229,#1A8FE3);*/
            background-repeat: no-repeat;
            background-size: cover;
            text-align: justify;
            font-size: 90%;
          }
          p {
            word-wrap: break-word;
            font-size: 1.2rem;
          }
          table {
            margin-left: auto;
            margin-right: auto;
          }
          td {
            text-align: center;
          }
          th {
            text-align: center;
            font-size: 1.3rem;
          }

          h1,
          h2,
          h3 {
            font-family: "breathefire";
            font-size: 4rem;
          }

          #icon1 {
            padding-right: 1rem;
            padding-left: 0;
          }
          #icon2 {
            padding-left: 1rem;
            padding-right: 0;
          }

          .makewater {
            position: absolute;
            width: 20%;
            opacity: 0.2;
            float: none;
            padding: 0;
          }
          #makewater1 {
            right: 10%;
            top: 30%;
          }
          #makewater2 {
            top: 60%;
          }
          #makewater3 {
            right: 10%;
            bottom: -60%;
          }

          #makewater4 {
            left: 10%;
            bottom: -120%;
          }

          #gs1 {
            background-color: rgba(202, 202, 202, 0.527);
          }

          #gs2 ul {
            display: inline-block;
            text-align: left;
          }

          #gs3 {
            background-color: gainsboro;
          }

          #gs4 {
            background-color: #ff9d4de0;
          }

          #entry {
            width: 60%;
            font-size: 150%;
          }

          @media only screen and (max-width: 343px) {
            #icon1 {
              position: relative;
              top: -3rem;
              right: -8rem;
              margin: 0;
              padding-right: 0;
            }

            #start {
              width: 100%;

              padding-left: 2rem;
              padding-right: 2rem;
            }
          }

          @media only screen and (max-width: 343px) {
            #icon1 {
              position: relative;
              top: -3rem;
              right: -8rem;
              margin: 0;
              padding-right: 0;
            }
          }
        `}</style>
      </div>
    );
  }
}
