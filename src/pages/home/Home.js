import React, { Component } from "react";

import fbService from "api/fbService";

import "./Home.scss";

export class Home extends Component {
  // sendInitialDatabase
  componentDidMount() {
    fbService.TodoService.sendTodoToFirabase();
    fbService.PostsService.sendPostsToFirabase();
  }

  render() {
    return <div className="app-home-container">Home </div>;
  }
}

export default Home;
