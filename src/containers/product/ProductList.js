import React, { Component } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import Modal from "@material-ui/core/Modal";

import Post from "components/post/Post";
import Button from "components/button/Button";
import service from "api/service";
import fbService from "api/fbService";
import Loader from "components/loader/Loader";
import Input from "components/input/Input";

import "containers/product/ProductList.scss";

const initialState = {
  Posts: null,
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

  componentDidMount() {
    fbService.getPosts(this.state.start, limit).then((data) => {
      this.setState({
        Posts: data,
      });
    });
  }

  requestPosts = () => {
    this.setState({
      Posts: null,
      loading: true,
    });
    service.getPosts().then((data) => {
      this.setState({
        Posts: data,
        loading: false,
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
      this.setState({
        Posts: [...this.state.Posts, ...data],
        loading: false,
        hasMore: data.length < limit ? false : true,
      });
    });
  };

  chengeValue = (name, value) => {
    this.setState({
      // ...initialState,
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
        this.setState({
          Posts: [...this.state.Posts, data],
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
      Posts,
      loading,
      hasMore,
      showSetting,
      isOpenModal,
      createTitle,
      createBody,
    } = this.state;

    if (!Posts) {
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
            <p>New post</p>
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
            <Button title="Save post" onClick={this.createPost} />
          </div>
        </Modal>
        ;
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
                onClick={this.requestPosts}
                className="app-product-container__btn-block__btns"
                title="Get all Posts"
              />
            </>
          )}
        </div>
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
                title={loading ? "loading..." : "Get More"}
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
