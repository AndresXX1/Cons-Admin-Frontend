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
