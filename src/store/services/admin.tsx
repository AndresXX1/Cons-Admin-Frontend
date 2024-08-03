import { apiUrls } from "@config/config";
import { axiosInstance } from "@store/actions/auth";
import { alertConfirm, alertError } from "@utils/alerts";

export const getAllAdmins = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getAllAdmins());
    if (response.data.ok) {
      return response.data.admins;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const deleteAdminById = async (id: string) => {
  try {
    const response = await axiosInstance.delete(apiUrls.deleteAdminById(id));
    if (response.data.ok) {
      alertConfirm("Admin eliminado");
      return true;
    } else {
      alertError("Error al eliminar admin");
      return false;
    }
  } catch (error) {
    alertError("Error al eliminar admin");
    return false;
  }
};

export const uploadImgAvatar = async (file: FormData) => {
  try {
    const response = await axiosInstance.post(apiUrls.uploadImgAvatar(), file, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.data.ok) {
      return response.data.avatar;
    } else {
      alertError("Error al subir imagen");
      return "";
    }
  } catch (error) {
    alertError("Error al subir imagen");
    return "";
  }
};

export const createAdmin = async (data: {
  full_name: string;
  email: string;
  password: string;
  avatar: string;
}) => {
  try {
    const response = await axiosInstance.post(apiUrls.createAdmin(), data);
    if (response.data.ok) {
      return true;
    } else {
      alertError("Error al crear admin");
      return false;
    }
  } catch (error) {
    alertError("Error al crear admin");
    return false;
  }
};
