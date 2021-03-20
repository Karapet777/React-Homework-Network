import actionTypesPost from "redux/actionTypesPost";

export const AllPosts = (data) => ({
  type: actionTypesPost.GET_ALL_POSTS,
  payload: { Posts: data },
});

export const setPosts = (data) => ({
  type: actionTypesPost.SET_POSTS,
  payload: { Posts: data },
});

export const getMorePosts = (data) => ({
  type: actionTypesPost.GET_MORE_POSTS,
  payload: { Posts: data },
});

export const createPost = (data) => ({
  type: actionTypesPost.CREATE_POSTS,
  payload: { Posts: data },
});
export const postsLength = (hesMorePost) => ({
  type: actionTypesPost.HES_MORE_POST,
  payload: { hesMorePost },
});
export const updatePost = (data) => ({
  type: actionTypesPost.HES_MORE_POST,
  payload: { data },
});
