import React from "react";
import PropType from "prop-types";

import "./Post.scss";
import Button from "components/button/Button";
import Link from "components/Link/Link";

const Post = ({ post, onClick = () => {} }) => {
  return (
    <div className="post-container">
      <Link to={`/product/${post.id}`}>
        <div>
          <p className="post-container__title">{post.title}</p>
          <p className="post-container__body">{post.body}</p>
        </div>
      </Link>
      <div>
        <Button
          className="post-container__btn"
          onClick={onClick}
          title="Delete Post"
        />
      </div>
    </div>
  );
};

Post.propType = {
  title: PropType.string.isRequired,
  body: PropType.string.isRequired,
  onclick: PropType.func,
  id: PropType.number,
};

export default Post;
