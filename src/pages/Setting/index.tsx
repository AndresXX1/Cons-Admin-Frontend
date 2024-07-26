import { IconDelete, IconX, IconPencil, IconEyes, IconUser } from "@utils/svg";
import { useState } from "react";
import Modal from "@components/Modal";

const Setting = () => {
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalPassword, setModalPassword] = useState<boolean>(false);
  const [modalEmail, setModalEmail] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const info = [
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      email: "maruubc00@gmail.com",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      email: "maruubc00@gmail.com",
    },
  ];
  return (
    <>
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
                    <p
                      onClick={() => setModalEmail(true)}
                      className="text-argenpesos-skyBlue font-light text-[1rem] cursor-pointer"
                    >
                      Cambiar email
                    </p>
                  </label>
                  <input
                    className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder="maruubc00@gmail.com"
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
                    <div className="absolute right-4 top-5">
                      <IconEyes />
                    </div>
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
                    type="text"
                    placeholder="**************"
                  />
                  <div className="absolute right-4 top-5">
                    <IconEyes />
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
        isShown={modalEmail}
        element={
          <div className="px-12 py-[50px] flex flex-col w-[751px] h-[446px]">
            <div className="flex justify-between items-center max-w-[640px] px-2">
              <p className="text-[32px] text-argenpesos-textos font-bold pb-6">
                Cambiar email
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setModalEmail(false)}
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
                  Email viejo
                </label>
                <input
                  className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                  type="email"
                  placeholder="maruubc00@gmail.com"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label
                  className="text-[14px] text-argenpesos-textos font-bold"
                  htmlFor=""
                >
                  Ingrese nuevo email
                </label>
                <div className="relative w-[625px]">
                  <input
                    className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="email"
                    placeholder="Email"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10 max-w-[640px]">
              <button
                onClick={() => setModalEmail(false)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
              <button
                onClick={() => setModalEmail(false)}
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Guardar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={modalCreate}
        element={
          <form className="px-12 py-[50px] flex flex-col w-[969px] h-[540px]">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold pb-6">
                Nuevo Administrador
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setModalCreate(false)}
              >
                <IconX />
              </p>
            </div>
            <div className="flex gap-[50px]">
              <div>
                <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                  <img
                    src="/products/image_default.png"
                    className="w-[84px] h-[84px] object-cover"
                  ></img>
                </div>
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
                    placeholder="Nombre y Apellido"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label
                    className="text-[14px] text-argenpesos-textos font-bold flex gap-3 items-center"
                    htmlFor=""
                  >
                    Email
                    <p
                      onClick={() => setModalEmail(true)}
                      className="text-argenpesos-skyBlue font-light text-[1rem] cursor-pointer"
                    >
                      Cambiar email
                    </p>
                  </label>
                  <input
                    className="w-[625px] h-[54px] rounded-[5px] text-[14px] font-book text-argenpesos-textos"
                    type="text"
                    placeholder="Email"
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
                      placeholder="Contraseña"
                    />
                    <div className="absolute right-4 top-5">
                      <IconEyes />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setModalCreate(false)}
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

      <div className="flex flex-col pl-16 pt-12 px-10 h-[100%] w-[1100px]">
        <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
          Configuración
        </p>
        <div className="flex justify-between">
          <h4 className="text-[23px] font-bold text-argenpesos-textos mb-5">
            Permisos de administrador
          </h4>

          <button
            onClick={() => setModalCreate(true)}
            className="w-[228px] h-[54px] bg-argenpesos-skyBlue rounded-[13px] flex items-center justify-center text-argenpesos-white gap-2 text-[15.36px] font-book"
          >
            <IconUser className="w-[20px] h-[20px]" color="#FFFFFF" />
            Nuevo administrador
          </button>
        </div>

        <div className="flex justify-between gap-5 my-8 max-w-[950px]">
          <p className="text-[1rem] text-argenpesos-textos font-bold">Nombre</p>

          <p className="text-[1rem] text-argenpesos-textos font-bold">Email</p>
          <p className="text-[1rem] text-argenpesos-textos font-bold"></p>
        </div>
        {info.map((inf, key) => (
          <div>
            <div className="flex justify-between pr-20 items-center" key={key}>
              <div className="flex items-center gap-1">
                <img
                  className="w-[50px] h-[50px]"
                  src={inf.img}
                  alt={inf.name}
                />
                <p className="text-[1rem] text-argenpesos-textos font-book">
                  {inf.name}
                </p>
              </div>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.email}
              </p>
              <div className="flex justify-center items-center gap-1">
                <IconDelete />
                <p className="text-[1rem] font-book text-argenpesos-red">
                  Eliminar
                </p>
              </div>
            </div>
            <div className="w-[100%] h-[1px] bg-argenpesos-gray2 mt-7 col-span-6 mb-7"></div>
          </div>
        ))}
        <div className="mb-10">
          <h4 className="text-[23px] font-bold text-argenpesos-textos mb-5 mt-8">
            Información de tu cuenta
          </h4>

          <p className="text-[14px] text-argenpesos-textos font-bold">
            Nombre y Apellido
          </p>
          <input
            className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px]"
            type="text"
            placeholder="Felix Bilbao"
          />
          <p className="text-[14px] text-argenpesos-textos font-bold">Mail</p>
          <input
            className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px]"
            type="email"
            placeholder="felixbilbao01@gmail.com"
          />
          <p className="text-[14px] text-argenpesos-textos font-bold">
            Contraseña
          </p>
          <input
            className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px]"
            type="password"
            placeholder="*******************"
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
      </div>
    </>
  );
};

export default Setting;
