import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers["accept"] = "application/json";
axios.defaults.headers.post["Content-Type"] = "application/json";

export default axios;
