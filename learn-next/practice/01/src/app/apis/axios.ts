import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    Authorization: `Bearer ${process.env.API_KEY}`,
    Accept: "application/json",
  },
});

export const getMovieList = async (params: string) => {
  try {
    const movieList = await axiosInstance.get("/movie/" + params);
    return movieList;
  } catch (e) {
    console.error(e);
  }
};
