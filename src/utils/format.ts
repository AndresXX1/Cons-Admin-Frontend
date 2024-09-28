import { parseISO, format } from "date-fns";
import { es } from "date-fns/locale";

import {
  IconHome,
  IconUser,
  IconProducts,
  IconEdits,
  IconNotifications,
  IconConfig,
} from "./svg";

export const links = [
  {
    to: "/dashboard/home",
    text: "Home",
    active: ["/dashboard/home", "/dashboard"],
    Icon: IconHome,
  },
  {
    to: "/dashboard/users",
    text: "Usuarios",
    active: ["/dashboard/users"],
    Icon: IconUser,
  },
  {
    to: "/dashboard/products",
    text: "Productos",
    active: ["/dashboard/products"],
    Icon: IconProducts,
  },
  {
    to: "/dashboard/edit-content",
    text: "Editar contenido",
    active: ["/dashboard/edit-content"],
    Icon: IconEdits,
  },
  {
    to: "/dashboard/notifications",
    text: "Notificaciones",
    active: ["/dashboard/notifications"],
    Icon: IconNotifications,
  },
  {
    to: "/dashboard/setting",
    text: "Configuración",
    active: ["/dashboard/setting"],
    Icon: IconConfig,
  },
];

export const formatDateString = (dateString: string) => {
  const date = parseISO(dateString);
  return format(date, "MMMM d yyyy, HH:mm'h'", { locale: es });
};

export const calculateAge = (birthDateString: string) => {
  if (!birthDateString) return "No disponible";
  const birthDate = new Date(birthDateString);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();
  const dayDifference = currentDate.getDate() - birthDate.getDate();
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }

  return age;
};
