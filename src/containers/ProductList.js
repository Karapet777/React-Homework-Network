import React, { Component } from "react";

import Post from "components/post/Post";
import Button from "components/button/Button";
import service from "api/service";
import fbService from "api/fbService";
import Loader from "components/loader/Loader";

import "containers/ProductList.scss";

const initialState = {
  Posts: null,
  loading: false,
  start: 0,
  hasMore: true,
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

  createPost = () => {
    fbService
      .createPost({
        title: "test",
        body: "create Post",
        userId: 1,
      })
      .then((data) => {
        this.setState({
          Posts: [...this.state.Posts, data],
        });
      });
  };

  render() {
    const { Posts, loading, hasMore } = this.state;

    if (!Posts) {
      return (
        <div className="app-product-container__loading">
          <Loader />
        </div>
      );
    }

    return (
      <div className="app-product-container">
        <div className="app-product-container__btn-block">
          <Button
            onClick={this.createPost}
            title="Create post"
            className="app-product-container__btn-block__create"
          />
          <Button
            onClick={this.requestPosts}
            className="app-product-container__btn-block__allPosts"
            title="Get all Posts"
          />
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
