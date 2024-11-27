import React, { useState } from "react";
import { BlockedIcon, IconEdit, ThreePoints } from "@utils/svg";
import { User } from "@store/types/user";
import { apiUrls } from "@config/config";
import { calculateAge, formatDateString } from "@utils/format";
import { checkStatus } from "@utils/validators";
import Modal from "@components/Modal";
import ModalAction from "@components/ModalAction";
import { putUserCuponizateById } from "@store/services/users";
import { EditUserModal, UserFormData } from "./editUserModal";
import { blockUserAsync } from "@store/actions/user";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@store";

interface UserRowProps {
  user: User;
  getUsersList: () => Promise<void>;
  handleEditUser: (user: User) => void;
  handleBlockUser?: (userId: string) => Promise<void>;
}

const UserRow = ({ user, getUsersList }: UserRowProps) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [modalActiveCuponizate, setModalActiveCuponizate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserFormData | null>(null);

  const dispatch = useDispatch<AppDispatch>();

  const toggleVisibility = () => {
    setMenuVisibility(!menuVisibility);
  };

  const handleAction = async () => {
    const response = await putUserCuponizateById(Number(user.id));
    if (response) {
      getUsersList();
      setModalActiveCuponizate(false);
    }
  };

  const handleBlockUser = async () => {
    const response = await dispatch(blockUserAsync(Number(user.id)));
    if (response.payload) {
      getUsersList();  // Actualiza la lista de usuarios
    }
  };

  const openEditModal = (user: User) => {
    const userFormData: UserFormData = {
      firstName: user.first_name || "N/A",
      lastName: user.last_name || "N/A",
      phone: user.phone || "N/A",
      birthday: user.birthday || "N/A",
      points: user.points || 0,
      image: user.avatar ? apiUrls.avatarUser(user.avatar) : null,
      address: user.address || [{ street: "N/A", city: "N/A" }],
      cuil: user.cuil || "N/A",
      gender: user.gender || "N/A",
      subscriptionStatus: undefined,
      id: Number(user.id),
      avatar: "",
    };
    setUserToEdit(userFormData);
    setModalEdit(true);
  };

  const truncateName = (name: string) =>
    name.length > 25 ? `${name.slice(0, 22)}...` : name;

  const handleSave = async (user: UserFormData): Promise<void> => {
    try {
      console.log(user)
      // Llama a getUsersList para actualizar la lista
      await getUsersList();
      setModalEdit(false);
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
    <>
      <Modal
        closeModal={setModalActiveCuponizate}
        isShown={modalActiveCuponizate}
        element={
          <ModalAction
            close={() => setModalActiveCuponizate(false)}
            handleAction={handleAction}
            title={`¿Está seguro que desea ${user.cuponizate ? "desactivar" : "activar"} este usuario?`}
            description={`En caso de que quiera ${user.cuponizate ? "activarlo" : "desactivarlo"} más adelante podrá hacerlo desde este menú. Email de usuario: ${user.email}`}
            textCancel="Cancelar"
            textOk={user.cuponizate ? "Desactivar" : "Activar"}
          />
        }
      />
      
      <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_1fr_auto] gap-6 relative items-center justify-start">
        {/* Información del usuario */}
        <div className="flex items-center gap-1 self-center">
          <img className="w-[40px] h-[40px] rounded-full mr-2" src={apiUrls.avatarUser(user.avatar)} alt={user.first_name} />
          <p className="text-[1rem] text-argenpesos-textos font-book text-left self-center">
            {truncateName(`${user.first_name || "N/A"} ${user.last_name || "N/A"}`)}
          </p>
        </div>
        
        {/* Teléfono */}
        <p className="text-[1rem] text-argenpesos-textos font-book text-center">{user.phone || "N/A"}</p>

        {/* Dirección */}
        {user.address && user.address.length > 0 ? (
          <p className="text-[0.9rem] text-argenpesos-textos font-book text-center">
            {user.address[0].street || "N/A"},{user.address[0].number || "N/A"}, {user.address[0].province || "N/A"}
          </p>
        ) : (
          <p className="text-[0.9rem] text-argenpesos-textos font-book text-center">N/A</p>
        )}

        {/* Cuponizate */}
        <button
          type="button"
          title={user.cuponizate ? "Desactivar" : "Activar"}
          onClick={() => setModalActiveCuponizate(true)}
          className={`text-[0.9rem] font-book border-[2px] rounded-full py-[4px] w-[80%] ${user.cuponizate ? "text-argenpesos-skyBlue" : "text-argenpesos-textos"}`}
        >
          {user.cuponizate ? "Activo" : "Inactivo"}
        </button>

        {/* Estado de login */}
        <p className="text-[1rem] text-argenpesos-textos font-book text-center">{checkStatus(user.last_login) || "N/A"}</p>

        {/* Edad */}
        <p className="text-[1rem] text-argenpesos-textos font-book text-center">{calculateAge(user.birthday) || "N/A"}</p>

        {/* Puntos (Mover a la izquierda) */}
        <p className="text-[1rem] text-argenpesos-textos font-book text-left">{user.points || "N/A"}</p>

        {/* Fecha de registro */}
        <p className="text-[0.9rem] text-argenpesos-textos font-book text-center">{formatDateString(user.create).slice(0, 13) || "N/A"}</p>

        {/* Estado de bloqueo (Mover a la izquierda) */}
        <p className="text-[1rem] text-argenpesos-textos font-book text-left translate-x-5">
          {user.isBlocked ? "Bloqueado" : "Activo"}
        </p>

        {/* Menú de Opciones */}
        <div
          onClick={() => toggleVisibility()}
          className="absolute right-0 top-[5%] w-[30px] h-[30px] p-2 cursor-pointer z-[1] translate-x-[65px] translate-y-[0px]"
        >
          <button className="w-full h-full">
            <ThreePoints />
          </button>

          <div
            className={`transition-all duration-200 ease-in-out ${menuVisibility ? "opacity-100 h-[100px]" : "opacity-0 max-h-0"} bg-white border-[1px] border-solid border-gray-300 rounded-[7px] w-[130px] absolute right-0 z-[10]`}
          >
            <div className="flex flex-col w-full gap-2 items-start justify-center h-full py-2 px-3">
              <p onClick={() => openEditModal(user)} className="flex items-center cursor-pointer text-gray-700">
                <IconEdit color="#575757" />
                Editar
              </p>
              <p onClick={handleBlockUser} className="flex items-center gap-1 cursor-pointer text-gray-700">
                <BlockedIcon />
                Bloquear
              </p>
            </div>
          </div>
        </div>

        <div className="w-[160%] h-[1px] bg-argenpesos-gray mt-5 col-span-6 mb-10 -ml-[5%]"></div>
      </div>

      {/* Modal de edición */}
      {modalEdit && userToEdit && (
        <Modal
          isShown={modalEdit}
          closeModal={() => setModalEdit(false)}
          element={
            <EditUserModal
                  user={userToEdit}
                  onClose={() => setModalEdit(false)}
                  onSave={handleSave}
                  getUsersList={getUsersList} // Pasamos getUsersList a EditUserModal
                  setModalEdit={function (value: React.SetStateAction<boolean>): void {
                    console.log(value)
                      throw new Error("Function not implemented.");
                  } }            />
          }
        />
      )}
    </>
  );
};

export default UserRow
