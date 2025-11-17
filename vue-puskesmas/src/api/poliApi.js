import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3003/api", 
});
const token = localStorage.getItem("token")
const config = {
    headers: {
        Authorization: `Bearer ${token}`
    }
}
export const getPoli = () => api.get("/poli", config);
export const addPoli = (data) => api.post("/poli", data, config);
export const updatePoli = (id, data) => api.put(`/poli/${id}`, data, config);
export const deletePoli = (id) => api.delete(`/poli/${id}`, config);
