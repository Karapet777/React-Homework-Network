import actionTypesPost from "redux/actionTypesPost";
import fbService from "api/fbService";

export const AllPosts = (data) => (dispatch) => {
  fbService.PostsService.getAllPosts().then((data) => {
    dispatch({
      type: actionTypesPost.GET_ALL_POSTS,
      payload: { Posts: data },
    });
  });
};

export const setPosts = (start, limit) => (dispatch) => {
  fbService.PostsService.getPosts(start, limit).then((data) => {
    dispatch({
      type: actionTypesPost.SET_POSTS,
      payload: { Posts: data },
    });
  });
};

export const getMorePosts = (data) => ({
  type: actionTypesPost.GET_MORE_POSTS,
  payload: { Posts: data },
});

export const createPost = (createTitle, createBody) => (dispatch) => {
  fbService.PostsService.createPost({
    title: createTitle,
    body: createBody,
    userId: 1,
  }).then((data) => {
    dispatch({
      type: actionTypesPost.CREATE_POSTS,
      payload: { Posts: data },
    });
  });
};

export const postsLength = (hesMorePost) => ({
  type: actionTypesPost.HES_MORE_POST,
  payload: { hesMorePost },
});
