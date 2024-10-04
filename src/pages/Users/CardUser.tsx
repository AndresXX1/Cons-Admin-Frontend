import { BlockedIcon, IconDelete, IconEdit, ThreePoints } from "@utils/svg";
import { User } from ".";
import { apiUrls } from "@config/config";
import { useState } from "react";
import { calculateAge, formatDateString } from "@utils/format";
import { checkStatus } from "@utils/validators";
import Modal from "@components/Modal";
import ModalAction from "@components/ModalAction";
import { putUserCuponizateById } from "@store/services/users";

interface CardUserProps {
  user: User;
  getUsersList: () => void;
}
const CardUser = ({ user, getUsersList }: CardUserProps) => {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const [modalActiveCuponizate, setModalActiveCuponizate] = useState(false);
  const toggleVisibility = () => {
    setMenuVisibility(!menuVisibility);
  };
  const handleAction = async () => {
    const response = await putUserCuponizateById(user.id);
    if (response) {
      getUsersList();
      setModalActiveCuponizate(false);
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
            description={`En caso de que quiera ${user.cuponizate ? "activarlo" : "desactivarlo"} más adelante podrá hacerlo desde este menú. Email de suuario: ${user.email}`}
            textCancel="Cancelar"
            textOk={user.cuponizate ? "Desactivar" : "Activar"}
          />
        }
      />
      <div
        className="grid grid-cols-6 gap-5 relative items-center"
        onMouseLeave={() => setMenuVisibility(false)}
      >
        <div className="flex items-center gap-1 z-[-1]">
          <img
            className="w-[50px] h-[50px]"
            src={apiUrls.avatarUser(user.avatar)}
            alt={user.first_name}
          />
          <p className="text-[1rem] text-argenpesos-textos font-book">
            {`${user.first_name} ${user.last_name}`}
          </p>
        </div>
        <button
          type="button"
          title={user.cuponizate ? "Desactivar" : "Activar"}
          onClick={() => setModalActiveCuponizate(true)}
          className={`text-[1rem] font-book border-[2px] rounded-xl py-[4px] w-[140px] ${
            user.cuponizate
              ? "text-argenpesos-skyBlue border-argenpesos-skyBlue"
              : "text-argenpesos-textos border-argenpesos-textos"
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
        <p className="text-[1rem] text-argenpesos-textos font-book">{user.points}</p>
        <p className="text-[1rem] text-argenpesos-textos font-book z-[-1]">
          {formatDateString(user.create)}
        </p>
        <div
          onClick={() => toggleVisibility()}
          className="absolute right-0 top-3 w-[0px]"
        >
          <button>
            <ThreePoints />
          </button>
          <div
            className={`transition-all duration-2000 ease-in-out ${
              menuVisibility ? "opacity-100 h-[132px]" : "opacity-0 max-h-0"
            } bg-argenpesos-white border-[1px] border-solid border-argenpesos-gray rounded-[7px] w-[158px] relative right-[7rem] z-[100]`}
          >
            <div className="flex flex-col w-full gap-3 items-center justify-center h-full">
              <p
                //   onClick={() => setOpenModalEdit(true)}
                className="flex items-center mr-7 cursor-pointer"
              >
                <IconEdit color="#575757" />
                Editar
              </p>
              <p className="flex items-center gap-1 cursor-pointer">
                <BlockedIcon />
                Bloquear
              </p>
              <p className="flex items-center mr-3 cursor-pointer">
                <IconDelete />
                Eliminar
              </p>
            </div>
          </div>
        </div>
        <div className="w-[100%] h-[1px] bg-argenpesos-gray mt-5 col-span-6 mb-10"></div>
      </div>
    </>
  );
};

export default CardUser;

/*
      <Modal
        isShown={openModal}
        element={
          <div className="px-6 py-6 flex flex-col gap-5 w-[481px] h-[192px]">
            <div className="flex justify-between items-center">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea bloquear este usuario?
              </p>
              <p className="cursor-pointer" onClick={() => setOpenModal(false)}>
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
              En caso de que quiero activarlo más adelante podrá hacerlo desde
              este menú.
            </p>
            <div className="flex gap-4">
              <button className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book">
                Bloquear
              </button>
              <button
                onClick={() => setOpenModal(false)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={openModalDelete}
        element={
          <div className="px-6 py-6 flex flex-col justify-center gap-5 w-[481px] h-[192px]">
            <div className="flex justify-between items-center">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea eliminar este usuario?
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setOpenModalDelete(false)}
              >
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
              Si lo elimina no podrá recuperarlo más adelante.
            </p>
            <div className="flex gap-4">
              <button className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book">
                Eliminar
              </button>
              <button
                onClick={() => setOpenModalDelete(false)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={openModalEdit}
        element={
          <form className="px-12 py-[50px] flex flex-col w-[969px] h-[675px]">
            <div className="flex justify-between items-center">
              <p className="text-[20px] text-argenpesos-textos font-bold pb-6">
                Editar usuario
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setOpenModalEdit(false)}
              >
                <IconX />
              </p>
            </div>
            <div className="flex gap-[50px]">
              <div>
                <img
                  className="w-[185px] h-[185px] object-cover"
                  src={info2[0].img}
                ></img>
                <div className="flex gap-2 mt-3 mb-5">
                  <p className="flex items-center gap-1 text-[14px] text-argenpesos-textos font-book">
                    <IconPencil />
                    Editar foto
                  </p>
                  <p className="flex items-center text-[14px] text-argenpesos-red font-book">
                    <IconDelete className="w-[22px] h-[22px]" />
                    Eliminar
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 mx-auto gap-6 max-w-[620px]">
                <div className="flex flex-col gap-1">
                  <label
                    className="flex items-center gap-2 text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Nombre y apellido <IconVerify />
                  </label>
                  <input
                    className="w-[304px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder={info2[0].name}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Teléfono
                  </label>
                  <input
                    className="w-[304px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder="maruubc00@gmail.com"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="flex items-center gap-2 text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Cuil <IconVerify />
                  </label>
                  <input
                    className="w-[304px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder="20-14800451-4"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Fecha de nacimiento
                  </label>
                  <input
                    className="w-[304px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder={info2[0].date}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10">
              <div className="flex">
                <div className="flex flex-col gap-1 w-[185px] mr-[50px]">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Cantidad de puntos
                  </label>
                  <input
                    className="w-[185px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder={info2[0].points}
                  />
                </div>
                <div className="flex flex-col gap-1 mr-[27px]">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Email
                  </label>
                  <input
                    className="w-[304px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder="maruubc00@gmail.com"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Domicilio
                  </label>
                  <input
                    className="w-[304px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder="Juan Domingo Perón 678"
                  />
                </div>
              </div>
              <div className="flex">
                <div className="flex flex-col gap-1 w-[185px] mr-[50px]">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Suscripción a cuponizate
                  </label>
                  <input
                    className="w-[185px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder={info2[0].status}
                  />
                </div>
                <div className="flex flex-col gap-1 mr-[27px]">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Banco donde cobra
                  </label>
                  <input
                    className="w-[304px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos placeholder:text-argenpesos-red"
                    type="text"
                    placeholder="Imcompleto"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Fecha de cobro
                  </label>
                  <input
                    className="w-[304px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos placeholder:text-argenpesos-red"
                    type="text"
                    placeholder="Imcompleto"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setOpenModalEdit(false)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
              <button className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book">
                Guardar
              </button>
            </div>
          </form>
        }
      ></Modal>*/
