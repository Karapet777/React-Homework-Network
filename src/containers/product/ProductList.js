import React, { Component } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "@material-ui/core/Modal";
import SaveIcon from "@material-ui/icons/Save";

import Post from "components/post/Post";
import Button from "components/button/Button";
import fbService from "api/fbService";
import Loader from "components/loader/Loader";
import Input from "components/input/Input";
import { AppContext } from "context/AppContext";
import { actionTypes } from "context/actionTypes";

import "containers/product/ProductList.scss";

const initialState = {
  loading: false,
  start: 0,
  hasMore: true,
  showSetting: false,
  isOpenModal: false,
  createTitle: "",
  createBody: "",
};
const limit = 5;
class ProductList extends Component {
  state = {
    ...initialState,
  };

  static contextType = AppContext;

  componentDidMount() {
    if (!this.context.state.Posts) {
      fbService.getPosts(this.state.start, limit).then((data) => {
        this.context.dispatch({
          type: actionTypes.SET_POSTS,
          payload: { Posts: data },
        });
      });
    }
  }

  getAllPosts = () => {
    const {
      state: { Posts },
    } = this.context;
    if (Posts) {
      return (this.context.state.Posts = null);
    }
    this.setState({
      loading: true,
    });
    fbService.getAllPosts().then((data) => {
      this.context.dispatch({
        type: actionTypes.GET_ALL_POSTS,
        payload: { posts: data },
      });
      this.setState({
        loading: false,
        hasMore: false,
      });
    });
  };

  deletePost = (id) => {
    fbService
      .deletePost(id)
      .then((data) => {
        this.setState({
          Posts: this.state.Posts.filter((el) => {
            return el.id !== id;
          }),
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  getMore = () => {
    const newStart = this.state.start + limit + 1;
    this.setState({
      loading: true,
      start: newStart,
    });
    fbService.getPosts(newStart, newStart + limit).then((data) => {
      this.context.dispatch({
        type: actionTypes.GET_MORE_POSTS,
        payload: { Posts: data },
      });
      this.setState({
        loading: false,
        hasMore: data.length < limit ? false : true,
      });
    });
  };

  chengeValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };

  createPost = () => {
    this.newPost();
    fbService
      .createPost({
        title: this.state.createTitle,
        body: this.state.createBody,
        userId: 1,
      })
      .then((data) => {
        this.context.dispatch({
          type: actionTypes.CREATE_POSTS,
          payload: { post: data },
        });
      });
  };

  newPost = () => {
    this.setState({
      isOpenModal: !this.state.isOpenModal,
      createTitle: "",
      createBody: "",
    });
  };

  toggleSetting = () => {
    this.setState({
      showSetting: !this.state.showSetting,
    });
  };

  render() {
    const {
      loading,
      hasMore,
      showSetting,
      isOpenModal,
      createTitle,
      createBody,
    } = this.state;

    const {
      state: { Posts },
    } = this.context;

    if (!Posts || loading) {
      return (
        <div className="app-product-container__loading">
          <Loader />
        </div>
      );
    }

    return (
      <div className="app-product-container">
        <Modal
          className="app-product-container__modal"
          open={isOpenModal}
          onClose={this.newPost}
        >
          <div className="app-product-container__modal__block">
            <p className="app-product-container__modal__block__titil">
              New post
            </p>
            <Input
              className="app-product-container__modal__block__input"
              value={createTitle}
              placeholder="Title"
              onChenge={(e) => this.chengeValue("createTitle", e.target.value)}
            />
            <Input
              className="app-product-container__modal__block__input"
              value={createBody}
              placeholder="body"
              onChenge={(e) => this.chengeValue("createBody", e.target.value)}
            />
            <SaveIcon onClick={this.createPost} />
          </div>
        </Modal>
        ;
        {this.context.state.user && (
          <div className="app-product-container__btn-block">
            <SettingsIcon
              onClick={this.toggleSetting}
              className="app-product-container__btn-block__setting"
            />
            {showSetting && (
              <>
                <Button
                  onClick={this.newPost}
                  title="New post"
                  className="app-product-container__btn-block__btns"
                />
                <Button
                  onClick={this.getAllPosts}
                  className="app-product-container__btn-block__btns"
                  title="Get all posts"
                />
              </>
            )}
          </div>
        )}
        {
          <div className="app-product-container__block-product">
            {Posts.length > 0 ? (
              Posts.map((el) => (
                <Post
                  key={el.id}
                  post={el}
                  remove={() => this.deletePost(el.id)}
                  isLink
                />
              ))
            ) : (
              <div>No results</div>
            )}
            {hasMore && (
              <Button
                onClick={this.getMore}
                className="app-product-container__block-product__get-more"
                title={loading ? "...loading " : "Get More"}
                disabled={loading ? true : false}
              />
            )}
          </div>
        }
      </div>
    );
  }
}

export default ProductList;
