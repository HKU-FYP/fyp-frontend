import axios from "axios";
import { getAuthHeaders } from "../util/authUtils";

const BASE_URL = "http://localhost:8888/api/v1";

export const getStockDetailInfo = (ticker) => {
  return axios
    .get(`${BASE_URL}/stocks/info/detail`, {
      params: { ticker },
      headers: getAuthHeaders(),
    })
    .then((resp) => resp.data)
    .catch((err) => {
      throw err;
    });
};
