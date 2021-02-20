import React, { Component } from "react";
import Modal from "@material-ui/core/Modal";

import service from "api/service";
import Post from "components/post/Post";

import "./ProductInfo.scss";
import Button from "components/button/Button";

export default class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isEditPopupOpen: false,
      titleValue: "",
    };
  }

  componentDidMount() {
    service.getPost(this.props.match.params.productId).then((data) => {
      this.setState({
        post: data,
        titleValue: data.title,
      });
    });
  }

  toggleEditPopup = () => {
    this.setState({
      isEditPopupOpen: !this.state.isEditPopupOpen,
    });
  };
  changeTitle = (e) => {
    this.setState({
      titleValue: e.target.value,
    });
  };
  savePost = () => {
    service
      .updatePost(this.state.post.id, {
        ...this.state.post,
        title: this.state.titleValue,
      })
      .then((res) => {
        this.setState({
          post: { ...this.state.post, title: this.state.titleValue },
          isEditPopupOpen: false,
        });
      });
  };

  render() {
    const { post, isEditPopupOpen, titleValue } = this.state;
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
              onChange={this.changeTitle}
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
