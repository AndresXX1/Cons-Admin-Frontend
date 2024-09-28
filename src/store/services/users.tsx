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

export const putUserCuponizateById = async (userId: number) => {
  try {
    const response = await axiosInstance.put(apiUrls.putUserCuponizate(userId));
    if (response.data.ok) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};
