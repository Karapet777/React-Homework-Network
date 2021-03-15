import React, { useContext } from "react";
import PropType from "prop-types";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Link from "components/Link/Link";
import { AppContext } from "context/AppContext";

import "./Post.scss";

const Post = ({ post, remove = () => {}, isLink = false, edit = () => {} }) => {
  const context = useContext(AppContext);
  const Wrapper = ({ children }) => {
    return isLink ? (
      <>
        <Link to={`/posts/${post.id}`}>{children}</Link>
        <div>
          <DeleteIcon className="post-container__btn" onClick={remove} />
        </div>
      </>
    ) : (
      <div>
        <EditIcon className="post-container__btn" onClick={edit} />
        {children}
      </div>
    );
  };

  return (
    <div className="post-container">
      {context.state.user ? (
        <Wrapper>
          <p className="post-container__title">{post?.title}</p>
          <p className="post-container__body">{post?.body}</p>
        </Wrapper>
      ) : (
        <>
          <p className="post-container__title">{post?.title}</p>
          <p className="post-container__body">{post?.body}</p>
        </>
      )}
    </div>
  );
};

Post.propType = {
  post: PropType.shape({
    title: PropType.string.isRequired,
    body: PropType.string.isRequired,
    remove: PropType.func,
  }),
  id: PropType.number,
  isLink: PropType.bool,
  edit: PropType.func,
};

export default Post;
