import http from "../http-common";

class LoginDataService {
  getAll() {
    return http.get("/login");
  }

  get(id) {
    return http.get(`/login/${id}`);
  }

  create(data) {
    return http.post("/login", data);
  }

  update(id, data) {
    return http.put(`/login/${id}`, data);
  }

  delete(id) {
    return http.delete(`/login/${id}`);
  }

  deleteAll() {
    return http.delete(`/login`);
  }

  findByTitle(username) {
    return http.get(`/login?title=${username}`);
  }
}

export default new LoginDataService();