import { apiUrls } from "@config/config";
import { axiosInstance } from "@store/actions/auth";
import axios from "axios";

interface UpdateUserData {
  first_name: string;
  last_name: string;
  cuil: string;
  birthday: string;
  phone: string;
}

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
export const updateAvatar = async (avatarFile: File, token: string) => {
  const formData = new FormData();
  formData.append('file', avatarFile);  // Cambié 'avatar' por 'file' para que coincida con lo que espera el backend

  try {
    // Llama a la URL correcta (sin el parámetro 'img')
    const urlString = apiUrls.avatarUserimage();  // Sin parámetros

    console.log("URL Generada:", urlString); // Verifica que la URL sea correcta

    const response = await axios.put(urlString, formData, {
      headers: {
        "Content-Type": "multipart/form-data",  // Asegúrate de que el Content-Type sea correcto
        "Authorization": `Bearer ${token}`  // Aquí es donde se incluye el token de autenticación
      },
    });

    if (response.data.ok) {
      return response.data;  // Devuelve la respuesta si todo está bien
    } else {
      throw new Error(response.data.message || 'Error desconocido');
    }
  } catch (error) {
    const errorMessage = 'Error en la actualización del avatar';
    console.error(errorMessage, error);
    throw new Error(errorMessage);  // Lanza un error en caso de fallos
  }
};


export const updateUserById = async (userId: number, userData: UpdateUserData, token: string) => {
  try {
    const response = await axiosInstance.put(apiUrls.putUserById(userId), userData, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
    });

    if (response.data.ok) {
      return response.data.user; // Retorna los datos del usuario actualizado
    } else {
      throw new Error(response.data.message || 'Error desconocido');
    }
  } catch (error) {
    throw new Error('Error en la actualización del usuario');
  }
};
