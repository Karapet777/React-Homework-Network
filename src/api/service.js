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
  getAllPhotos = () => {
    return this._request("GET", "/photos");
  };

  // ---------- CreatePost
  // createPost = (data) => {
  //   return this._request('POST', '/posts', data)
  // }

  // ---------- Patch

  // ubdatePost = (id,data) => {
  //   return this._request('PATCH', `/posts ${id}`,data)
  // }
}

const service = new Service();

export default service;
