import http from "../http-common";

class SubjectDataService {
  getAll() {
    return http.get("/subjects");
  }

  get(id) {
    return http.get(`/subject/${id}`);
  }

  create(data) {
    return http.post("/subject", data);
  }

  update(id, data) {
    return http.put(`/subject/${id}`, data);
  }

  delete(id) {
    return http.delete(`/subject/${id}`);
  }

  deleteAll() {
    return http.delete(`/subject`);
  }

  findByname(name){
    return http.get(`/subject?name=${name}`);
  }
}

export default new SubjectDataService();