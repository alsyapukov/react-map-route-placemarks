import axios from "axios";

const API = 'http://localhost:8000';

export default axios.create({
  baseURL: API,
  headers: {
    "Content-Type": "application/json",
  },
});
