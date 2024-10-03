import { useState } from "react";
import { apiUrls } from "@config/config";
import { IAdmin } from ".";
import { IconDelete } from "@utils/svg";
import { useSelector } from "react-redux";
import { RootState } from "@store";
import { alertError } from "@utils/alerts";
import { deleteAdminById } from "@store/services/admin";

interface AdminCardProps {
  admin: IAdmin;
  fetchAdmins: () => void;
}

const AdminCard = ({ admin, fetchAdmins }: AdminCardProps) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteAdmin = async () => {
    if (user?.role === "super_admin") {
      if (admin.role === "super_admin") {
        setIsModalOpen(true);
      } else {
        setIsModalOpen(true);
      }
    } else {
      alertError("No tienes permisos para realizar esta acción");
    }
  };

  const confirmDelete = async () => {
    const response = await deleteAdminById(admin.id);
    if (response) {
      fetchAdmins();
      setIsModalOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between pr-20 items-center">
        <div className="flex items-center gap-1">
          <img
            className="w-[50px] h-[50px]"
            src={apiUrls.avatarUser(admin.avatar)}
            alt={admin.full_name}
          />
          <p className="text-[1rem] text-argenpesos-textos font-book">
            {admin.full_name || "Nombre sin asignar"}
          </p>
        </div>
        <p className="text-[1rem] text-argenpesos-textos font-book">
          {admin.email}
        </p>
        <div
          className="flex justify-center items-center gap-1 cursor-pointer"
          onClick={handleDeleteAdmin}
        >
          <IconDelete />
          <p className="text-[1rem] font-book text-argenpesos-red">Eliminar</p>
        </div>
      </div>
      <div className="w-[100%] h-[1px] bg-argenpesos-gray2 mt-7 col-span-6 mb-7"></div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-md max-w-lg w-full">
            <p className="text-lg font-semibold mb-4">
              ¿Estás seguro de que deseas eliminar este administrador?
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded-md"
                onClick={() => setIsModalOpen(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md"
                onClick={confirmDelete}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCard;
