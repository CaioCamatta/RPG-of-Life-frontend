import Head from "next/head";
import Link from "next/link";
import MainApp from "../components/App";
import { Component } from "react";
import { Button } from "react-bootstrap";

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
      <div className="container">
        <Head>
          <title>RPG Of Life</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="container pt-5">
          <div className="text-center">
            <h1 className="title">RPG of Life</h1>

            <p className="description mb-5">Your life as an RPG game.</p>

            <Button
              onClick={() => {
                this.setState({ page: "app" });
              }}
              variant="primary"
              className="mb-5"
            >
              Go to app
            </Button>
          </div>

          <h2>What is RPG of Life?</h2>
          <p className="description">Welcome</p>
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
