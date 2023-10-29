import axios, { AxiosError } from "axios"
import { DiaryFormEmpty } from "../types";
import { apiBaseUrl } from "../constants";


const getAll = async () => {

    const { data } = await axios.get(`${apiBaseUrl}/diaries`);
    return data;
};

const createDiary = async (formData: DiaryFormEmpty) => {
    try {
      const response = await axios.post(`${apiBaseUrl}/diaries`, formData);
      return response.data;
    } catch (e) {
      throw e as AxiosError;
    }
  };

export default {
    getAll,
    createDiary
};