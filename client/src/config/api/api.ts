import axios from "axios";
import { API_URL } from "./";

export default axios.create({
	baseURL: API_URL,
})

export const axios_private = axios.create({
	baseURL: API_URL,
	headers: {
		"Content-Type": "application/json"
	},
	withCredentials: true,
})