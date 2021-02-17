import React, { Component } from "react";

import service from "api/service";
import Post from "components/post/Post";

import "./ProductInfo.scss";

export default class ProductInfo extends Component {
  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      post: [],
    };
  }

  componentDidMount() {
    service.getPost(this.props.match.params.productId).then((data) => {
      this.setState({
        post: data,
      });
    });
  }

  render() {
    const { post } = this.state;
    return (
      <div className="product-info">
        <Post post={post} onClick={() => {}} />
      </div>
    );
  }
}
