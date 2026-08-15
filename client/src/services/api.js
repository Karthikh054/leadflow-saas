import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
    headers: {
        "content-Type" : "application/json",
    },
});

export default api;