import axios from "axios";
import { getAuthHeaders } from "../util/authUtils";

const BASE_URL = "http://localhost:8888/api/v1";

export const existUserStock = () => {
  return axios
    .get(`${BASE_URL}/users/exist-user-stock`, {
      headers: getAuthHeaders(),
    })
    .then((resp) => resp.data.exist)
    .catch((err) => {
      throw err;
    });
};
