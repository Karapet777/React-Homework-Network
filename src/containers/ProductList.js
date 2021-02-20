import React, { Component } from "react";

import Post from "components/post/Post";
import Button from "components/button/Button";
import "containers/ProductList.scss";
import service from "api/service";
import Loader from "components/loader/Loader";

const initialState = {
  Posts: null,
  loading: false,
  start: 0,
  hasMore: true,
};
const limit = 9;
class ProductList extends Component {
  state = {
    ...initialState,
  };

  componentDidMount() {
    // this.setState({
    //   loading: true,
    // });
    // service.getStartPosts(this.state.start, limit).then((data) => {
    //   this.setState({
    //     Posts: data,
    //     loading: false,
    //   });
    // });
    this.setState({
      loading: true,
    });
    service.getPosts().then((data) => {
      this.setState({
        Posts: data,
        loading: false,
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
    const newStart = this.state.start + limit;
    this.setState({
      loading: true,
      start: newStart,
    });
    service.getStartPosts(newStart, limit).then((data) => {
      this.setState({
        Posts: [...this.state.Posts, ...data],
        loading: false,
        hasMore: data.length < limit ? false : true,
      });
    });
  };

  render() {
    const { Posts, loading, hasMore } = this.state;

    if (!Posts) {
      return (
        <div className="app-product-container__block-product">
          <Loader />
        </div>
      );
    }
    if (Posts.length < 0) {
      <div className="app-product-container__block-product">No Resault</div>;
    }

    return (
      <div className="app-product-container">
        <div className="app-product-container__block-btns">
          <Button
            onClick={this.requestPosts}
            className="app-product-container__block-btns__btns"
            title="request Posts"
          />
        </div>
        {
          <div className="app-product-container__block-product">
            {Posts.map((el) => (
              <Post
                key={el.id}
                post={el}
                onClick={() => this.delete(el.id)}
                isLink
              />
            ))}
            {hasMore && (
              <Button
                onClick={this.getMore}
                className="app-product-container__block-btns__btns"
                title={
                  loading ? "loading..." : Posts.length < 0 ? "No" : "get more"
                }
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
