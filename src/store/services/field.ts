import { apiUrls } from "@config/config";
import { DayData } from "@pages/Admin/Clubs";
import { axiosInstance } from "@store/actions/auth";
import { alertConfirm, alertError } from "@utils/alerts";

export const createField = async (name: string, clubId: number) => {
  try {
    const response = await axiosInstance.post(apiUrls.createField(clubId), {
      name,
    });
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

export const updateCalendarField = async (
  calendar: DayData,
  fieldId: number,
  setEditField: (boolean: boolean) => void
) => {
  try {
    const response = await axiosInstance.put(
      apiUrls.updateCalendarField(fieldId),
      {
        calendar,
      }
    );
    if (response.data.ok) {
      alertConfirm("Cancha Actualizada con exito");
      setEditField(false);
      return true;
    } else {
      alertError("Error al actualizar Cancha");
      return false;
    }
  } catch (error) {
    alertError("Error al actualizar Cancha");
    return false;
  }
};

export const getAllFields = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getAllFields());
    if (response.data.ok) {
      return response.data.field;
    } else {
      alertError("No se encontró ninguna cancha");
      return false;
    }
  } catch (error) {
    alertError("Error al buscar canchas");
    return false;
  }
};

export const createTag = async (name: string, fieldId: number) => {
  try {
    const response = await axiosInstance.post(apiUrls.createFieldTag(fieldId), {
      name,
    });
    if (response.data.ok) {
      alertConfirm("Tag creado correctamente");
      return true;
    } else {
      alertError("Error al crear el tag");
      return false;
    }
  } catch (error) {
    alertError("Error al crear el tag");
    return false;
  }
};

export const deleteFieldTag = async (fieldId: number, tag: string) => {
  try {
    console.error("fieldId", tag);
    const response = await axiosInstance.delete(
      apiUrls.deleteFieldTag(fieldId, tag)
    );
    if (response.data.ok) {
      alertConfirm("Tag eliminado correctamente");
      return true;
    } else {
      alertError("Error al eliminar el tag");
      return false;
    }
  } catch (error) {
    alertError("Error al eliminar el tag");
    return false;
  }
};

export const updatePriceField = async (
  prices: {
    price_60: number;
    price_90: number;
    price_120: number;
  },
  fieldId: number
) => {
  try {
    const response = await axiosInstance.put(
      apiUrls.updatePriceField(fieldId),
      {
        price_60: prices.price_60,
        price_90: prices.price_90,
        price_120: prices.price_120,
      }
    );
    if (response.data.ok) {
      alertConfirm("Precio actualizado correctamente");
      return true;
    } else {
      alertError("Error al actualizar el precio");
      return false;
    }
  } catch (error) {
    alertError("Error al actualizar el precio");
    return false;
  }
};
