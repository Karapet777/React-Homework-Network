import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";

import Post from "components/post/Post";

import "./ProductInfo.scss";
import Button from "components/button/Button";
import Loader from "components/loader/Loader";
import fbService from "api/fbService";

export default class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isEditPopupOpen: false,
      titleValue: "",
      bodyValue: "",
    };
    console.log(props);
  }

  componentDidMount() {
    fbService.getPost(this.props.match.params.productId).then((data) => {
      this.setState({
        post: data,
        titleValue: data.title,
        bodyValue: data.body,
      });
    });
  }

  toggleEditPopup = () => {
    this.setState({
      isEditPopupOpen: !this.state.isEditPopupOpen,
    });
  };
  changeValue = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  savePost = () => {
    fbService
      .updatePost({
        ...this.state.post,
        title: this.state.titleValue,
        body: this.state.bodyValue,
      })
      .then((res) => {
        this.setState({
          post: {
            ...this.state.post,
            title: this.state.titleValue,
            body: this.state.bodyValue,
          },
          isEditPopupOpen: false,
        });
      });
  };

  render() {
    const { post, isEditPopupOpen, titleValue, bodyValue } = this.state;

    if (!post) {
      return <Loader />;
    }
    return (
      <div className="product-info">
        <Post post={post} onClick={() => {}} edit={this.toggleEditPopup} />
        <Modal
          className="product-info__modal"
          open={isEditPopupOpen}
          onClose={this.toggleEditPopup}
        >
          <div className="product-info__modal__block">
            <input
              value={titleValue}
              className="product-info__modal__block__input"
              type="text"
              onChange={(e) => this.changeValue("titleValue", e.target.value)}
            />
            <input
              value={bodyValue}
              className="product-info__modal__block__input"
              type="text"
              onChange={(e) => this.changeValue("bodyValue", e.target.value)}
            />
            <Button
              onClick={this.savePost}
              className="product-info__modal__block__btn"
              title="Save"
            />
          </div>
        </Modal>
      </div>
    );
  }
}
