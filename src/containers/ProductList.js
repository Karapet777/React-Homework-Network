import React, { Component } from "react";

import Post from "components/post/Post";
import Button from "components/button/Button";
import "containers/ProductList.scss";
import service from "api/service";
import Loader from "components/loader/Loader";

const initialState = {
  Posts: null,
  loading: false,
};
const limit = 9;
class ProductList extends Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    service.getStartPosts(0, limit).then((data) => {
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

  delete = (id) => {
    service.deletePost(id).then((data) => {
      this.setState({
        Posts: this.state.Posts.filter((el) => {
          return el.id !== id;
        }),
      });
    });
  };

  getMore = () => {
    this.setState({
      loading: true,
    });
    service.getStartPosts(limit, limit).then((data) => {
      this.setState({
        Posts: [...this.state.Posts, ...data],
        loading: false,
      });
    });
  };

  render() {
    const { Posts, loading } = this.state;
    return (
      <div className="app-product-container">
        <div className="app-product-container__block-btns">
          <Button
            onClick={this.requestPosts}
            className="app-product-container__block-btns__btns"
          >
            request Posts
          </Button>
        </div>
        {!loading && Posts ? (
          <div className="app-product-container__block-product">
            {Posts.map((el) => (
              <Post
                key={el.id}
                title={el.title}
                body={el.body}
                onClick={() => this.delete(el.id)}
              />
            ))}
            <Button
              onClick={this.getMore}
              className="app-product-container__block-btns__btns"
            >
              getMore
            </Button>
          </div>
        ) : (
          <div className="app-product-container__block-product">
            <Loader />
          </div>
        )}
      </div>
    );
  }
}

export default ProductList;
