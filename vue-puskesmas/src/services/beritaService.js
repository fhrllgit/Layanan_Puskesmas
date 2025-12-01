import axios from "axios";

const API = "http://localhost:3003/api/berita";

export async function getAllBerita() {
  return axios.get(API);
}

export async function getBeritaById(id) {
  return axios.get(`${API}/${id}`);
}

export async function deleteBerita(id) {
  return axios.delete(`${API}/${id}`);
}

export async function addBerita(formData) {
  return axios.post(API, formData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
  });
}
