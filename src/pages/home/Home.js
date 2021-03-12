import React, { Component } from "react";
import fbService from "api/fbService";

// import { dataMockup } from "data/dataMockup";

import "./Home.scss";

export class Home extends Component {
  // componentDidMount() {
  //   fetch("https://react-test-354b0-default-rtdb.firebaseio.com/posts.json", {
  //     method: "PUT",
  //     body: JSON.stringify(dataMockup.map((el) => ({ ...el, id: el.id - 1 }))),
  //   });
  // }

  componentDidMount() {
    fbService.sendDataToFirebase();
  }

  render() {
    return <div className="app-home-container"></div>;
  }
}

export default Home;
