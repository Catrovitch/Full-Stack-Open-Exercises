import axios from "axios"

import { apiBaseUrl } from "../constants";


const getAll = async () => {

    const { data } = await axios.get(`${apiBaseUrl}/diaries`);
    return data;
};


export default {
    getAll
};