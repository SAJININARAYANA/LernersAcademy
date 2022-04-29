import http from "../http-common";

class FacultyDataService {
  getAll() {
    return http.get("/faculties");
  }

  get(id) {
    return http.get(`/faculties/${id}`);
  }

  create(data) {
    return http.post("/faculties", data);
  }

  update(id, data) {
    return http.put(`/faculties/${id}`, data);
  }

  delete(id) {
    return http.delete(`/faculties/${id}`);
  }

  deleteAll() {
    return http.delete(`/faculties`);
  }

  findByFacultyname(facultyname){
    return http.get(`/faculties?facultyname=${facultyname}`);
  }
}

export default new FacultyDataService();