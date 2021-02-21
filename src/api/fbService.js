import firebase from "firebase/app";
import firebaseConfig from "api/firebaseConfig";
import "firebase/database";
import { dataMockup } from "data/dataMockup";

class FbService {
  constructor() {
    if (firebase.apps.length === 0) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  sendDataToFirebase = () => {
    firebase.database().ref("posts").set(dataMockup);
  };

  getAllPosts = async () => {
    const res = await firebase.database().ref("posts").get();
    return res.val();
  };

  getPosts = async (startAt = 0, endAt = 5) => {
    const res = await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();
    const data = res.toJSON();
    console.log(data);
    return Object.values(data);
  };

  getPost = async (id) => {
    const res = await firebase.database().ref(`posts/${id}`).get();
    return res.val();
  };

  updatePost = async (postData) => {
    const postRef = firebase.database().ref(`posts/${postData.id}`);
    await postRef.update(postData);
    const res = await postRef.get();
    return res.val();
  };

  deletePost = async (id) => {
    const postRef = firebase.database().ref(`posts/${id}`);
    await postRef.remove();
  };

  createPost = async (postData) => {
    const res = await firebase.database().ref("posts").push(postData);
    return (await res.get()).val();
  };
}

const fbService = new FbService();
export default fbService;
