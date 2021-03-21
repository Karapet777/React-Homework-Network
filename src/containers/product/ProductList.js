import React, { useState, useEffect, useContext } from "react";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import SaveIcon from "@material-ui/icons/Save";

import fbService from "api/fbService";
import { AppContext } from "context/AppContext";
import Button from "components/button/Button";
import Loader from "components/loader/Loader";
import Post from "components/post/Post";
import Input from "components/input/Input";
import SettingIcon from "components/SettingsIcon/SettingsIcon";
import {
  AllPosts,
  setPosts,
  getMorePosts,
  createPost,
  postsLength,
} from "actions/postActions";

import "containers/product/ProductList.scss";

const ProductList = (props) => {
  const [state, setState] = useState({
    loading: false,
    showSetting: false,
    isOpenModal: false,
    createTitle: "",
    createBody: "",
  });
  const [start, setStart] = useState(0);
  const limit = 5;

  const context = useContext(AppContext);

  useEffect(() => {
    if (!props.Posts) {
      props.setPosts(start, limit);
    }
  }, []);

  const getAllPosts = () => {
    setState({
      ...state,
      loading: true,
    });
    props.AllPosts();
    props.postsLength(false);
    setState({
      ...state,
      loading: false,
    });
  };

  const deleteTodo = (id) => {
    fbService.PostsService.deletePost(id)
      .then(() => {
        fbService.PostsService.getPosts(
          0,
          start !== 0 ? start + limit : limit
        ).then((res) => {
          props.setPosts(res);
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMore = () => {
    const newStart = start + limit + 1;
    setStart(newStart);
    setState({
      ...state,
      loading: true,
    });
    fbService.PostsService.getPosts(newStart, newStart + limit).then((data) => {
      props.getMorePosts(data);
      props.postsLength(data.length < limit ? false : true);
    });
    setState({
      ...state,
      loading: false,
    });
  };

  const chengeValue = (name, value) => {
    setState({
      ...state,
      [name]: value,
    });
  };

  const createPost = () => {
    newPost();
    props.createPost(state.createTitle, state.createBody);
  };

  const newPost = () => {
    setState({
      ...state,
      isOpenModal: !state.isOpenModal,
      createTitle: "",
      createBody: "",
    });
  };

  const toggleSetting = () => {
    setState({
      ...state,
      showSetting: !state.showSetting,
    });
  };

  const { loading, showSetting, isOpenModal, createTitle, createBody } = state;
  const {
    state: { user },
  } = context;

  if (!props.Posts || loading) {
    return (
      <div className="app-product-container__loading">
        <Loader />
      </div>
    );
  }
  const keyEnterHandlerEvent = (e) => {
    if (e.keyCode === 13) {
      createPost();
    }
  };
  return (
    <div className="app-product-container">
      <Modal
        className="app-product-container__modal"
        open={isOpenModal}
        onClose={newPost}
      >
        <div className="app-product-container__modal__block">
          <p className="app-product-container__modal__block__titil">New post</p>
          <Input
            className="app-product-container__modal__block__input"
            value={createTitle}
            placeholder="Title"
            onChenge={(e) => chengeValue("createTitle", e.target.value)}
            onKeyDown={keyEnterHandlerEvent}
          />
          <Input
            className="app-product-container__modal__block__input"
            value={createBody}
            placeholder="body"
            onChenge={(e) => chengeValue("createBody", e.target.value)}
            onKeyDown={keyEnterHandlerEvent}
          />
          <SaveIcon onClick={createPost} />
        </div>
      </Modal>
      {user && (
        <div className="app-product-container__btn-block">
          <SettingIcon onClick={toggleSetting} />
          {showSetting && (
            <>
              <Button
                onClick={newPost}
                title="New post"
                className="app-product-container__btn-block__btns"
              />
              <Button
                onClick={getAllPosts}
                className="app-product-container__btn-block__btns"
                title="Get all posts"
              />
            </>
          )}
        </div>
      )}
      {
        <div className="app-product-container__block-product">
          {props.Posts.length > 0 ? (
            props.Posts.map((el) => (
              <Post
                key={el.id}
                post={el}
                remove={() => deleteTodo(el.id)}
                isLink
              />
            ))
          ) : (
            <div>No results</div>
          )}
        </div>
      }

      {props.hesMorePost && (
        <Button
          onClick={getMore}
          className="app-product-container__block-product__get-more"
          title={loading ? "...loading " : "Get More"}
          disabled={loading ? true : false}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    Posts: state.postReducer.Posts,
    hesMorePost: state.postReducer.hesMorePost,
  };
};
const mapDispatchToProps = {
  AllPosts,
  setPosts,
  getMorePosts,
  createPost,
  postsLength,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
