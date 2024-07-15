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
    to: "/home",
    text: "Home",
    active: ["/home"],
    Icon: IconHome,
  },
  {
    to: "/users",
    text: "Usuarios",
    active: ["/users"],
    Icon: IconUser,
  },
  {
    to: "/products",
    text: "Productos",
    active: ["/products"],
    Icon: IconProducts,
  },
  {
    to: "/edit-content",
    text: "Editar contenido",
    active: ["/edit-content"],
    Icon: IconEdits,
  },
  {
    to: "/notifications",
    text: "Notificaciones",
    active: ["/notifications"],
    Icon: IconNotifications,
  },
  {
    to: "/setting",
    text: "Configuración",
    active: ["/setting"],
    Icon: IconConfig,
  },
];
