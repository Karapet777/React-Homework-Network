class Service {
  constructor() {
    this.baseUrl = "https://jsonplaceholder.typicode.com";
  }
  _request = (method, url, data = null) => {
    return fetch(`${this.baseUrl}${url}`, {
      method,
      headers: data ? { "Contenet-Type": "applicatin/json" } : {},
      body: data ? JSON.stringify(data) : null,
    }).then((res) => {
      if (res.status < 400) {
        return res.json();
      } else {
        throw new Error("Network Error");
      }
    });
  };

  getStartPosts = (start, limit) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(
          this._request("GET", `/posts?_start=${start}&_limit=${limit}`)
        );
      }, 1000);
    });
  };

  getPost = (id) => {
    return this._request("GET", `/posts/${id}`);
  };

  getPosts = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        return resolve(this._request("GET", "/posts"));
      }, 3000);
    });
  };

  deletePost = (id) => {
    return this._request("DELETE", `/posts/${id}`);
  };
}

const service = new Service();

export default service;
