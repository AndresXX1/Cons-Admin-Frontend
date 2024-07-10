import { apiUrls } from "@config/config";
import { ActualDayInterface } from "@pages/Admin/Fields/FieldCard";
import { axiosInstance } from "@store/actions/auth";

export const reservationField = async (
  data: {
    type: string;
    start_time: number;
    end_time: number;
    year: number;
    month: number;
    day: number;
  },
  fieldId: number,
  setError: (value: string | null) => void,
  setLoading: (value: boolean) => void,
  close: (value: boolean) => void,
  getClubs: () => void
) => {
  try {
    const response = await axiosInstance.post(
      apiUrls.reservationField(fieldId),
      data
    );
    if (response.data.ok) {
      getClubs();
      setError(null);
      close(false);
    } else {
      setError(response.data.message);
    }
  } catch (error) {
    setError("Error al reservar la cancha");
  } finally {
    setLoading(false);
  }
};

export const getEventsField = async (
  fieldId: number,
  actualDay: ActualDayInterface
) => {
  try {
    const response = await axiosInstance.get(
      apiUrls.getEventsField(
        fieldId,
        actualDay.year,
        actualDay.month,
        actualDay.day
      )
    );
    if (response.data.ok) {
      return response.data.events;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const getAllEvents = async (data: ActualDayInterface) => {
  try {
    const response = await axiosInstance.post(apiUrls.getAllEvents(), data);
    if (response.data.ok) {
      return response.data.events;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};

export const createOpenReservation = async (
  data: {
    time: string;
    start_time: number;
    year: number;
    month: number;
    day: number;
  },
  fieldId: number
) => {
  try {
    const response = await axiosInstance.post(
      apiUrls.createOpenReservation(fieldId),
      data
    );
    if (response.data.ok) {
      return response.data.event;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getEventById = async (eventId: number) => {
  try {
    const response = await axiosInstance.get(apiUrls.getEventById(eventId));
    if (response.data.ok) {
      return response.data.event;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const generatePaymentLink = async (eventId: number) => {
  try {
    const response = await axiosInstance.get(
      apiUrls.generatePaymentLink(eventId)
    );
    if (response.data.ok) {
      return response.data.mp;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
};

export const getAllOpenEvents = async () => {
  try {
    const response = await axiosInstance.get(apiUrls.getAllOpenEvents());
    if (response.data.ok) {
      return response.data.events;
    } else {
      return [];
    }
  } catch (error) {
    return [];
  }
};
