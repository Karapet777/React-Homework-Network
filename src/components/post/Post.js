import React from "react";
import PropType from "prop-types";
import EditIcon from "@material-ui/icons/Edit";

import "./Post.scss";
import Button from "components/button/Button";
import Link from "components/Link/Link";

const Post = ({
  post,
  onClick = () => {},
  isLink = false,
  edit = () => {},
}) => {
  const Wrapper = ({ children }) => {
    return isLink ? (
      <>
        <Link to={`/posts/${post.id}`}>{children}</Link>
        <div>
          <Button
            className="post-container__btn"
            onClick={onClick}
            title="Delete Post"
          />
        </div>
      </>
    ) : (
      <div>
        <Button onClick={edit} title={<EditIcon />} />
        {children}
      </div>
    );
  };

  return (
    <div className="post-container">
      <Wrapper>
        <p className="post-container__title">{post?.title}</p>
        <p className="post-container__body">{post?.body}</p>
      </Wrapper>
    </div>
  );
};

Post.propType = {
  title: PropType.string.isRequired,
  body: PropType.string.isRequired,
  onclick: PropType.func,
  id: PropType.number,
  isLink: PropType.bool,
  edit: PropType.func,
};

export default Post;
