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

export const getMorePosts = (newStart, limit) => (dispatch) => {
  fbService.PostsService.getPosts(newStart, newStart + limit).then((data) => {
    dispatch({
      type: actionTypesPost.GET_MORE_POSTS,
      payload: { Posts: data },
    });
    dispatch({
      type: actionTypesPost.HES_MORE_POST,
      payload: { hesMorePost: data.length < limit ? false : true },
    });
  });
};

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

export const isPostsHesMore = (hesMorePost) => ({
  type: actionTypesPost.HES_MORE_POST,
  payload: { hesMorePost },
});

export const updatePost = (res) => ({
  type: actionTypesPost.UPDATE_POST,
  payload: { todo: res },
});
