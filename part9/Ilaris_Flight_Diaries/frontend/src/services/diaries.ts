import axios from "axios"
import { NewDiaryEntry } from "../types";
import { apiBaseUrl } from "../constants";


const getAll = async () => {

    const { data } = await axios.get(`${apiBaseUrl}/diaries`);
    return data;
};

const createDiary = async (formData: NewDiaryEntry) => {
    try {
      console.log('herre')
      const response = await axios.post(`${apiBaseUrl}/diaries`, formData);
      return response.data;
    } catch (error) {
      console.error("Error creating diary:", error);
      throw error;
    }
  };

export default {
    getAll,
    createDiary
};