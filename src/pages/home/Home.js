import React, { Component } from "react";
// import { dataMockup } from "data/dataMockup";

import "./Home.scss";

export class Home extends Component {
  // componentDidMount() {
  //   fetch("https://react-test-354b0-default-rtdb.firebaseio.com/posts.json", {
  //     method: "PUT",
  //     body: JSON.stringify(dataMockup.map((el) => ({ ...el, id: el.id - 1 }))),
  //   });
  // }

  render() {
    return <div className="app-home-page">Home</div>;
  }
}

export default Home;
