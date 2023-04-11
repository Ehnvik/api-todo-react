import axios from "axios";
import { IAccountDetails } from "../models/IAccountDetails";
import { ILoginResponse } from "../models/ILoginResponse";

const api = axios.create({ baseURL: "http://localhost:8008" });

api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const loginUser = async (loginDetails: IAccountDetails) => {
  let response = await axios.post<ILoginResponse>(
    `http://localhost:8008/users/login`,
    loginDetails
  );
  return response.data;
};

export const registerUser = async (newUser: IAccountDetails) => {
  let response = await axios.post(
    `http://localhost:8008/users/register`,
    newUser
  );
  return response.data;
};

export default api;
