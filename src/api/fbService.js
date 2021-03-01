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
    const data = res.toJSON();
    return Object.values(data);
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

    const allPosts = await this.getAllPosts();
    await firebase
      .database()
      .ref("posts")
      .set(
        allPosts.map((el, index) => {
          return {
            ...el,
            id: index,
          };
        })
      );
  };

  createPost = async (postData) => {
    const res = await firebase
      .database()
      .ref("posts")
      .orderByKey()
      .limitToLast(1)
      .get();
    const itemjson = res.toJSON();
    const item = Object.values(itemjson)[0];
    const { id } = item;
    await firebase
      .database()
      .ref(`posts/${id + 1}`)
      .set({ ...postData, id: id + 1 });
    return { ...postData, id: id + 1 };
  };
}

const fbService = new FbService();
export default fbService;
