import firebase from "firebase/app";
import "firebase/database";

import { dataTodo } from "data/dataMockup";

class TodoService {
  sendTodoToFirabase = () => {
    firebase.database().ref("todo").set(dataTodo);
  };

  getAllTodos = async () => {
    const res = await firebase.database().ref("todo").get();
    const data = res.toJSON();
    return Object.values(data);
  };

  deletePost = async (id) => {
    const postRef = firebase.database().ref(`todo/${id}`);
    await postRef.remove();

    const allPosts = await this.getAllTodos();
    await firebase
      .database()
      .ref("todo")
      .set(
        allPosts.map((el, index) => {
          return {
            ...el,
            id: index,
          };
        })
      );
  };

  getTodos = async (startAt = 0, endAt = 5) => {
    const res = await firebase
      .database()
      .ref("todo")
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();
    const data = res.toJSON();
    return Object.values(data);
  };

  moreTodo = async (startAt = 0, endAt = 5) => {
    const res = await firebase
      .database()
      .ref("todo")
      .orderByKey()
      .startAt(startAt.toString())
      .endAt(endAt.toString())
      .get();
    const data = res.toJSON();
    return Object.values(data);
  };

  createTodo = async (postData) => {
    const res = await firebase
      .database()
      .ref("todo")
      .orderByKey()
      .limitToLast(1)
      .get();
    const itemjson = res.toJSON();
    const item = Object.values(itemjson)[0];
    const { id } = item;
    await firebase
      .database()
      .ref(`todo/${id + 1}`)
      .set({ ...postData, id: id + 1 });
    return { ...postData, id: id + 1 };
  };

  readPost = async (id, completed) => {
    const postRef = firebase.database().ref(`todo/${id}`);
    await postRef.update(completed);
    const res = await postRef.get();
    return res.val();
  };
}
export default new TodoService();
