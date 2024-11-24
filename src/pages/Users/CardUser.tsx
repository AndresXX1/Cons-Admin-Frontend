import { BlockedIcon, IconEdit, ThreePoints } from "@utils/svg";
import { User } from ".";
import { apiUrls } from "@config/config";
import { useState } from "react";
import { calculateAge, formatDateString } from "@utils/format";
import { checkStatus } from "@utils/validators";
import Modal from "@components/Modal";
import ModalAction from "@components/ModalAction";
import { putUserCuponizateById } from "@store/services/users";
import { EditUserModal, UserFormData } from "./editUserModal"; 



interface CardUserProps {
  user: User;
  getUsersList: () => void;
  onEdit: (user: User) => void; 
}


const CardUser = ({ user, getUsersList }: CardUserProps) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [modalActiveCuponizate, setModalActiveCuponizate] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [userToEdit, setUserToEdit] = useState<UserFormData | null>(null);




  
  const toggleVisibility = () => {
    setMenuVisibility(!menuVisibility);
  };

  const handleAction = async () => {
    // Convierte el id a number si es un string
    const response = await putUserCuponizateById(Number(user.id)); // Convierte el id a number
    if (response) {
      getUsersList();
      setModalActiveCuponizate(false);
    }
  };

  const openEditModal = (user: User) => {
    // Convertir User a UserFormData
    const userFormData: UserFormData = {
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      birthday: user.birthday,
      points: user.points,
      image: user.avatar ? apiUrls.avatarUser(user.avatar) : null, // Si no tiene imagen, es null
      address: user.address,
      cuil: user.cuil,
      gender: user.gender,
      subscriptionStatus: undefined,
      id: Number(user.id),
      avatar: ""
    };
 console.log("Abriendo modal con el siguiente user:", user)
    setUserToEdit(userFormData);
    setModalEdit(true);
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
      
      <div className="grid grid-cols-[1fr_140px_120px_140px_100px_1fr] gap-6 relative items-center justify-start">
        <div className="flex items-center justify-start gap-1">
          <img
            className="w-[25px] h-[25px]"
            src={apiUrls.avatarUser(user.avatar)}
            alt={user.first_name}
          />
          <p className="text-[1rem] text-argenpesos-textos font-book">
            {`${(user.first_name + " " + user.last_name).length > 25
              ? (user.first_name + " " + user.last_name).slice(0, 22) + "..."
              : user.first_name + " " + user.last_name}`}
          </p>
        </div>

        <button
          type="button"
          title={user.cuponizate ? "Desactivar" : "Activar"}
          onClick={() => setModalActiveCuponizate(true)}
          className={`text-[0.9rem] font-book border-[2px] rounded-full py-[4px] w-[80%] ${
            user.cuponizate
              ? "text-argenpesos-skyBlue border-argenpesos-skyBlue hover:bg-argenpesos-skyBlue hover:text-argenpesos-white transition-all"
              : "text-argenpesos-textos border-argenpesos-textos hover:bg-argenpesos-textos hover:text-argenpesos-white transition-all"
          }`}
        >
          {user.cuponizate ? "Activo" : "Inactivo"}
        </button>

        <p className="text-[1rem] text-argenpesos-textos font-book">
          {checkStatus(user.last_login)}
        </p>
        <p className="text-[1rem] text-argenpesos-textos font-book">
          {calculateAge(user.birthday)}
        </p>
        <p className="text-[1rem] text-argenpesos-textos font-book max-w-[100px] truncate">
          {user.points}
        </p>
        <p className="text-[0.9rem] text-argenpesos-textos font-book">
          {formatDateString(user.create).slice(0, 13)}
        </p>

        {/* Mostrar teléfono y dirección */}
        <p className="text-[0.9rem] text-argenpesos-textos font-book">{user.phone}</p>
        {user.address && user.address.length > 0 && (
          <p className="text-[0.9rem] text-argenpesos-textos font-book">
            {user.address[0].street}, {user.address[0].city}
          </p>
        )}

        {/* Menú de opciones */}
        <div
          onClick={() => toggleVisibility()}
          className="absolute right-0 top-[5%] w-[30px] h-[30px] p-2 cursor-pointer z-[1] translate-x-[45px] translate-y-[-15px]"
        >
          <button className="w-full h-full">
            <ThreePoints />
          </button>

          {/* Menú desplegable */}
          <div
            className={`transition-all duration-200 ease-in-out ${menuVisibility ? "opacity-100 h-[100px]" : "opacity-0 max-h-0"} bg-white border-[1px] border-solid border-gray-300 rounded-[7px] w-[130px] absolute right-0 z-[10]`}
          >
            <div className="flex flex-col w-full gap-2 items-start justify-center h-full py-2 px-3">
              <p onClick={() => openEditModal(user)} className="flex items-center cursor-pointer text-gray-700">
                <IconEdit color="#575757" />
                Editar
              </p>
              <p className="flex items-center gap-1 cursor-pointer text-gray-700">
                <BlockedIcon />
                Bloquear
              </p>
            </div>
          </div>
        </div>

        <div className="w-[100%] h-[1px] bg-argenpesos-gray mt-5 col-span-6 mb-10"></div>
      </div>

      {/* Modal de edición */}
      {modalEdit && userToEdit && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 20 }}>
          <Modal
            isShown={modalEdit}
            closeModal={() => setModalEdit(false)}
            element={
              <EditUserModal
                user={userToEdit} // Pasamos los datos del usuario a editar
                onClose={() => setModalEdit(false)} // Cerrar el modal
                onSave={(updatedUser) => {
                  console.log('User updated:', updatedUser);
                  setModalEdit(false); // Cerramos el modal después de guardar
                }}
              />
            }
          />
        </div>
      )}

    
   
    </>
  );
};

export default CardUser
