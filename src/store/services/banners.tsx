import { apiUrls } from "@config/config";
import { axiosInstance } from "@store/actions/auth";
import { alertConfirm, alertError } from "@utils/alerts";

export const getBanners = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getBanners());
    if (response.data.ok) {
      return response.data.banners;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const uploadImgBanner = async (file: FormData) => {
  try {
    const response = await axiosInstance.post(apiUrls.uploadBanner(), file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.ok) {
      alertConfirm("Avatar actualizado");
      return true;
    } else {
      alertError("Error al actualizar avatar");
      return false;
    }
  } catch (error) {
    alertError("Error al actualizar avatar");
    return false;
  }
};

export const deleteBannerById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(apiUrls.deleteBanner(id));
    if (response.data.ok) {
      alertConfirm("Banner eliminado");
      return true;
    } else {
      alertError("Error al eliminar banner");
      return false;
    }
  } catch (error) {
    alertError("Error al obtener banners");
    return false;
  }
};
