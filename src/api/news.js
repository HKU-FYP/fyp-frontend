import axios from "axios";
import {getAuthHeaders} from "../util/authUtils.js";

const BASE_URL = "http://localhost:8888/api/v1";

export const getNewsByUserStockId = (user_stock_id) => {
    return axios
        .get(`${BASE_URL}/user-stocks/${user_stock_id}/news`, {
            headers: getAuthHeaders(),
        })
        .then((resp) => resp.data)
        .catch((err) => {
            throw err;
        });
}

export const getNewsDetailByNewsId = (news_id) => {
    return axios
        .get(`${BASE_URL}/news/${news_id}`, {
            headers: getAuthHeaders(),
        })
        .then((resp) => resp.data)
        .catch((err) => {
            throw err;
        });
}