import Modal from "@components/Modal";
import {
  IconDelete,
  IconEyes,
  IconEyesOff,
  IconPencil,
  IconX,
} from "@utils/svg";
import { useState } from "react";

const DataAdmin = () => {
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalPassword, setModalPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };
  return (
    <>
      <Modal
        isShown={modalPassword}
        element={
          <div className="px-12 py-[50px] flex flex-col w-[751px] h-[446px]">
            <div className="flex justify-between items-center max-w-[640px] px-2">
              <p className="text-[32px] text-argenpesos-textos font-bold pb-6">
                Cambiar contraseña
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setModalPassword(false)}
              >
                <IconX />
              </p>
            </div>

            <div className="flex flex-col gap-10 mx-auto">
              <div className="flex flex-col gap-1">
                <label
                  className="flex items-center gap-2 text-[14px] text-argenpesos-textos font-bold"
                  htmlFor=""
                >
                  Contraseña vieja
                </label>
                <input
                  className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                  type="password"
                  placeholder="*********"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-[14px] text-argenpesos-textos font-bold"
                  htmlFor=""
                >
                  Ingrese nueva contraseña
                </label>
                <div className="relative w-[625px]">
                  <input
                    className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type={showPassword ? "text" : "password"}
                    placeholder="**************"
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-5 cursor-pointer"
                  >
                    {showPassword ? <IconEyesOff /> : <IconEyes />}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10 max-w-[640px]">
              <button
                onClick={() => setModalPassword(false)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
              <button
                onClick={() => setModalPassword(false)}
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Guardar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={modalDelete}
        element={
          <div className="px-6 py-6 flex flex-col justify-center w-[481px] h-[192px]">
            <div className="flex justify-between items-start">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea eliminar su cuenta?
              </p>
              <p
                className="cursor-pointer mt-[6px]"
                onClick={() => setModalDelete(false)}
              >
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px] mb-10 mt-1">
              Si la elimina ya no se podrá recuperarla.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setModalDelete(false);
                }}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  setModalDelete(false);
                }}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={modalEdit}
        element={
          <form className="px-12 py-[50px] flex flex-col w-[969px] h-[540px]">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold pb-6">
                Editar usuario
              </p>
              <p className="cursor-pointer" onClick={() => setModalEdit(false)}>
                <IconX />
              </p>
            </div>
            <div className="flex gap-[50px]">
              <div>
                <img
                  src="/image_user.png"
                  className="w-[185px] h-[185px] object-cover"
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
              <div className="flex flex-col gap-10">
                <div className="flex flex-col gap-1">
                  <label
                    className="flex items-center gap-2 text-[14px] text-argenpesos-textos font-bold"
                    htmlFor=""
                  >
                    Nombre y apellido
                  </label>
                  <input
                    className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder="Maria Becerra"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold flex gap-3 items-center"
                    htmlFor=""
                  >
                    Email
                  </label>
                  <input
                    className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder="maruubc00@gmail.com"
                    readOnly
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold flex gap-3 items-center"
                    htmlFor=""
                  >
                    Contraseña
                    <p
                      onClick={() => setModalPassword(true)}
                      className="text-argenpesos-skyBlue font-light text-[1rem] cursor-pointer"
                    >
                      Cambiar contraseña
                    </p>
                  </label>
                  <div className="relative">
                    <input
                      className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                      type="text"
                      placeholder="**************"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setModalEdit(false)}
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
      ></Modal>
      <div className="mb-10">
        <h4 className="text-[23px] font-bold text-argenpesos-textos mb-5 mt-8">
          Información de tu cuenta
        </h4>

        <p className="text-[14px] text-argenpesos-textos font-bold">
          Nombre y Apellido
        </p>
        <input
          className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px] text-argenpesos-textos font-book leading-[23.04px]"
          type="text"
          placeholder="Felix Bilbao"
          readOnly
        />
        <p className="text-[14px] text-argenpesos-textos font-bold">Email</p>
        <input
          className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px] text-argenpesos-textos font-book leading-[23.04px]"
          type="email"
          placeholder="felixbilbao01@gmail.com"
          readOnly
        />
        <p className="text-[14px] text-argenpesos-textos font-bold">
          Contraseña
        </p>
        <input
          className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px] text-argenpesos-textos font-book leading-[23.04px]"
          type="password"
          placeholder="*******************"
          readOnly
        />

        <div className="flex gap-5 mt-10 mb-14">
          <button
            onClick={() => setModalEdit(true)}
            className="flex w-[147px] h-[38px] items-center justify-center bg-argenpesos-skyBlue text-[1rem] text-argenpesos-white font-book rounded-[5px]"
          >
            Editar cuenta
          </button>
          <button
            onClick={() => setModalDelete(true)}
            className="flex w-[147px] border-[1px] border-argenpesos-red h-[38px] items-center justify-center text-[1rem] text-argenpesos-red font-book rounded-[5px]"
          >
            Eliminar cuenta
          </button>
        </div>
      </div>
    </>
  );
};

export default DataAdmin;
