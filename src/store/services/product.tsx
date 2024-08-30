import { apiUrls } from "@config/config";
import { axiosInstance } from "@store/actions/auth";

export const getProductsAll = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getProductsAll());
    if (response.data.ok) {
      return response.data.products;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
