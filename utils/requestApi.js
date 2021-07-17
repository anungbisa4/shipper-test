import axios from "axios";

  export const fetcher = async (...args) => {
    const Axios = axios.create({
      baseURL: process.env.baseURL,
      timeout: 10000,
    });
    try{
      const fetcher = await Axios(...args);
      return fetcher.data
    } catch (error) {
      throw error
    }
  }
