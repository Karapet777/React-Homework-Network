import React from "react";
import PropType from "prop-types";

import "./Post.scss";
import Button from "components/button/Button";

const Post = ({ title, body, onClick }) => {
  return (
    <div className="post-container">
      <div>
        <p className="post-container__title">{title}</p>
        <p className="post-container__body">{body}</p>
      </div>
      <div>
        <Button className="post-container__btn" onClick={onClick}>
          Delete Post
        </Button>
      </div>
    </div>
  );
};

Post.propType = {
  title: PropType.string.isRequired,
  body: PropType.string.isRequired,
  onclick: PropType.func,
};

export default Post;
