import axios from "axios";
import { API_URL } from "./";

export default axios.create({
	baseURL: API_URL,
})