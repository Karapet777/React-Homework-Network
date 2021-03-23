import React, { Component } from "react";

import fbService from "api/fbService";
import ReactImg from "assets/ReactImg.png";
import ReduxImg from "assets/Redux.png";
import FirebaseImg from "assets/icon_Firebase.png";

import "./Home.scss";
import Button from "components/button/Button";

const initialState = {
  isReact: false,
  isRedux: false,
  isFirebase: false,
};
export class Home extends Component {
  state = {
    ...initialState,
  };
  componentDidMount() {
    // sendInitialStateDatabase
    fbService.TodoService.sendTodoToFirabase();
    fbService.PostsService.sendPostsToFirabase();

    this.setState({
      isReact: true,
    });
  }

  isReactToggle = () => {
    this.setState({
      ...initialState,
      isReact: true,
    });
  };
  isReduxToggle = () => {
    this.setState({
      ...initialState,
      isRedux: true,
    });
  };
  isFirebaseToggle = () => {
    this.setState({
      ...initialState,
      isFirebase: true,
    });
  };

  render() {
    const { isReact, isFirebase, isRedux } = this.state;
    return (
      <div className="app-home-container">
        <div className="app-home-container__block-imges">
          <p className="app-home-container__block-imges__names-lib">
            {isReact ? "React" : isFirebase ? "Firebase" : "Redux"}
          </p>
          <img
            className={
              isReact
                ? "app-home-container__block-imges__react"
                : "app-home-container__block-imges__react--show"
            }
            src={ReactImg}
            alt="ReactImg"
          />
          <img
            className={
              isRedux
                ? "app-home-container__block-imges__redux--show"
                : "app-home-container__block-imges__redux"
            }
            src={ReduxImg}
            alt="ReduxImg"
          />
          <img
            className={
              isFirebase
                ? "app-home-container__block-imges__firebase--show"
                : "app-home-container__block-imges__firebase"
            }
            src={FirebaseImg}
            alt="FirebaseImg"
          />
        </div>
        <div className="app-home-container__info">
          <div className="app-home-container__info__block-info">
            <p className="app-home-container__info__block-info__title">
              This website based by following sources FireBase, React and Redux.
            </p>
          </div>
          <p className="app-home-container__info__text">
            {isReact
              ? "A JavaScript library for building user interfaces"
              : isRedux
              ? "A Predictable State Container for JS Apps"
              : "Firebase helps build and run successful apps"}
          </p>
          <div>
            <Button
              className="app-home-container__info__btns"
              title="React"
              onClick={this.isReactToggle}
              disabled={isReact}
            />
            <Button
              className="app-home-container__info__btns"
              title="Firebase"
              onClick={this.isFirebaseToggle}
              disabled={isFirebase}
            />
            <Button
              className="app-home-container__info__btns"
              title="Redux"
              onClick={this.isReduxToggle}
              disabled={isRedux}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
