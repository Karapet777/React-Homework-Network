import firebase from "firebase/app";
import firebaseConfig from "api/firebaseConfig";

import PostsService from "./postService";
import TodoService from "./todoService";
import UserService from "./userService";

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const service = {
  PostsService,
  TodoService,
  UserService,
};

export default service;
