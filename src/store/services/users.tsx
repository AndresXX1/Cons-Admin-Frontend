import { apiUrls } from "@config/config";
import { axiosInstance } from "@store/actions/auth";

export const getusers = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getUsers());
    if (response.data.ok) {
      return response.data.users;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
