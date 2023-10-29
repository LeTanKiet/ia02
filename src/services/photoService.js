import axiosClient from "./axiosClient";

const photoService = {
  getPhotos: async (page = 1) =>
    axiosClient.get("photos", {
      params: {
        page,
      },
    }),
  searchPhotos: async (keyword = "", page = 1) =>
    axiosClient.get("search/photos", {
      params: {
        query: keyword,
        page,
      },
    }),
};

export default photoService;
