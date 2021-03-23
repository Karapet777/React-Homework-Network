import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import SaveIcon from "@material-ui/icons/Save";

import Post from "components/post/Post";
import Button from "components/button/Button";
import Loader from "components/loader/Loader";
import fbService from "api/fbService";
import { AppContext } from "context/AppContext";
import { updateInPost } from "actions/postActions";

import "./ProductInfo.scss";

class ProductInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
      isEditPopupOpen: false,
      titleValue: "",
      bodyValue: "",
    };
  }
  static contextType = AppContext;

  componentDidMount() {
    fbService.PostsService.getPost(this.props.match.params.productId).then(
      (data) => {
        this.setState({
          post: data,
        });
      }
    );
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
    fbService.PostsService.updatePost({
      ...this.state.post,
      title: this.state.titleValue,
      body: this.state.bodyValue,
    }).then((res) => {
      const newData = {
        ...this.state.post,
        title: this.state.titleValue,
        body: this.state.bodyValue,
      };
      this.setState({
        post: newData,
        isEditPopupOpen: false,
      });
      const { Posts } = this.props;

      if (Posts && Posts.find((el) => el.id === this.state.post.id)) {
        this.props.updateInPost(newData);
      }
      this.props.history.push("/product");
    });
  };

  keyEvent = (e) => {
    if (e.keyCode === 13) {
      return this.savePost();
    }
  };

  render() {
    const { post, isEditPopupOpen, titleValue, bodyValue } = this.state;

    if (!post) {
      return (
        <div className="loader">
          <Loader />
        </div>
      );
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
            <Button
              title="&#9747;"
              onClick={this.toggleEditPopup}
              className="product-info__modal__close"
            />
            <input
              value={titleValue}
              className="product-info__modal__block__input"
              type="text"
              placeholder="Title"
              onChange={(e) => this.changeValue("titleValue", e.target.value)}
              onKeyDown={this.keyEvent}
            />
            <input
              value={bodyValue}
              className="product-info__modal__block__input"
              type="text"
              placeholder="Text"
              onChange={(e) => this.changeValue("bodyValue", e.target.value)}
              onKeyDown={this.keyEvent}
            />
            <SaveIcon
              className="product-info__modal__block__btn"
              onClick={this.savePost}
            />
          </div>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    Posts: state.postReducer.Posts,
  };
};

const mapDispatchToProps = {
  updateInPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProductInfo));
