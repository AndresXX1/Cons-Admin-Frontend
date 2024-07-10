import { apiUrls } from "@config/config";
import { axiosInstance } from "@store/actions/auth";
import { IErrorResponse } from "@store/types/auth";
import { alertConfirm, alertError } from "@utils/alerts";

export const getClub = async (id: number) => {
  try {
    const response = await axiosInstance.get(apiUrls.getClub(id));
    if (response.data.ok) {
      return response.data.club;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getClubs = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getClubs());
    if (response.data.ok) {
      return response.data.clubs;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const createClub = async (name: string) => {
  try {
    const response = await axiosInstance.post(apiUrls.createClub(), { name });
    if (response.data.ok) {
      alertConfirm("Club creado correctamente");
      return true;
    } else {
      alertError("Error al crear el club");
      return false;
    }
  } catch (error) {
    alertError("Error al crear el club");
    return false;
  }
};

export const updateImgClub = async (clubId: number, getClubs: () => void) => {
  try {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nextjs");
      const response = await axiosInstance.put(
        apiUrls.updateImgClub(clubId),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.ok) {
        alertConfirm("Imagen actualizada");
        getClubs();
      } else {
        alertError("Error al actualizar imagen");
      }
    };
  } catch (error) {
    alertError("Error al actualizar imagen");
  }
};

export const updateStateClub = async (
  id: number,
  status: string,
  getClubs: () => void
) => {
  try {
    const response = await axiosInstance.put(
      apiUrls.updateStateClub(id, status),
      {}
    );
    if (response.data.ok) {
      getClubs();
      alertConfirm("Club actualizado");
    } else {
      alertError("Error al actualizar club");
    }
  } catch (error) {
    alertError("Error al actualizar club");
  }
};

export const updateClub = async (
  data: {
    id: number;
    name: string;
    address: string;
    lat: number;
    lon: number;
  },
  setActive: (boolean: boolean) => void,
  setError: (error: string) => void,
  getClubs: () => void,
  close: () => void
) => {
  try {
    const response = await axiosInstance.put(apiUrls.updateClub(data.id), data);
    if (response.data.ok) {
      alertConfirm("Club actualizado");
      close();
      getClubs();
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    const message =
      (error as IErrorResponse).response.data.message ||
      "Error al iniciar sesión";
    setError(message);
  } finally {
    setActive(false);
  }
};

export const myClub = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.myClub());
    if (response.data.ok) {
      return response.data.club;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};
