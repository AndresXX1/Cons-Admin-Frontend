import { useState } from "react";
import {
  IconNotification,
  ArrowBlue,
  ThreePoints,
  IconEdit,
  IconDelete,
  IconX,
  IconPencil,
} from "@utils/svg";
import Modal from "@components/Modal";

const Notifications = () => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const toggleVisibility = (index: number) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
    } else {
      setVisibleIndex(index);
    }
  };

  const info = [
    {
      name: "Black Friday!",
      date: "29/11/24",
      age: "Hora",
      imagen: "Si",
      app: "Si",
      push: "No",
    },
    {
      name: "Black Friday!",
      date: "29/11/24",
      age: "Hora",
      imagen: "No",
      app: "Si",
      push: "Si",
    },
    {
      name: "Black Friday!",
      date: "29/11/24",
      age: "Hora",
      imagen: "Si",
      app: "No",
      push: "Si",
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
                ¿Está seguro que desea eliminar esta noticia?
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
        isShown={modalCreate}
        element={
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[700px] mb-5">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold">
                Nueva noticia
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setModalCreate(false)}
              >
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-4">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                    <img
                      className="w-[84px] h-[84px]"
                      src="/products/image_default.png"
                    ></img>
                  </div>
                  <p className="flex gap-1 items-center pt-[18px] text-[14px] font-book text-argenpesos-textos">
                    <IconPencil />
                    Subir una imagen
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor=""
                    className="text-[14px] font-bold text-argenpesos-textos"
                  >
                    Título / Nombre de la App
                  </label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Título"
                  />
                  <p className="pt-9 text-[14px] font-bold text-argenpesos-textos">
                    Incluye envío
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <label className="text-[14px] font-bold text-argenpesos-textos">
                        Fecha
                      </label>
                      <input
                        className="w-[298px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                        type="text"
                        placeholder="1 / 1 / 2025"
                      />
                    </div>
                    <div>
                      <label className="text-[14px] font-bold text-argenpesos-textos">
                        Hora
                      </label>
                      <input
                        className="w-[298px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                        type="text"
                        placeholder="00 : 00"
                      />
                    </div>
                  </div>

                  <label htmlFor="">Descripción</label>
                  <input
                    className="w-[617px] h-[181px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Cuerpo de texto"
                  />
                  <p className="pt-5 text-[14px] font-bold text-argenpesos-textos">
                    Incluye notificación push
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>

                  <p className="pt-5 text-[14px] font-bold text-argenpesos-textos">
                    Incluye notificación In-App
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10 pb-10">
              <button className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book">
                Cancelar
              </button>
              <button
                onClick={() => setModalCreate(false)}
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Guardar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={modalEdit}
        element={
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[700px] mb-5">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold">
                Editar notificación
              </p>
              <p className="cursor-pointer" onClick={() => setModalEdit(false)}>
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-4">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                    <img
                      className="w-[84px] h-[84px]"
                      src="/products/image_default.png"
                    ></img>
                  </div>
                  <p className="flex gap-1 items-center pt-[18px] text-[14px] font-book text-argenpesos-textos">
                    <IconPencil />
                    Subir una imagen
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor=""
                    className="text-[14px] font-bold text-argenpesos-textos"
                  >
                    Título / Nombre de la App
                  </label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Título"
                  />
                  <p className="pt-9 text-[14px] font-bold text-argenpesos-textos">
                    Incluye envío
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <label className="text-[14px] font-bold text-argenpesos-textos">
                        Fecha
                      </label>
                      <input
                        className="w-[298px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                        type="text"
                        placeholder="1 / 1 / 2025"
                      />
                    </div>
                    <div>
                      <label className="text-[14px] font-bold text-argenpesos-textos">
                        Hora
                      </label>
                      <input
                        className="w-[298px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                        type="text"
                        placeholder="00 : 00"
                      />
                    </div>
                  </div>

                  <label htmlFor="">Descripción</label>
                  <input
                    className="w-[617px] h-[181px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Cuerpo de texto"
                  />
                  <p className="pt-5 text-[14px] font-bold text-argenpesos-textos">
                    Incluye notificación push
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>

                  <p className="pt-5 text-[14px] font-bold text-argenpesos-textos">
                    Incluye notificación In-App
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10 pb-10">
              <button className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book">
                Cancelar
              </button>
              <button
                onClick={() => setModalEdit(false)}
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Guardar
              </button>
            </div>
          </div>
        }
      ></Modal>

      <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
        <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
          Notificaciones
        </p>

        <div className="flex gap-6">
          <input
            className="w-[735px] h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10 text-argenpesos-gray2 placeholder:text-argenpesos-gray2 placeholder:font-book"
            type="search"
            placeholder="Buscar estadísticas o datos"
          />
          <button
            onClick={() => setModalCreate(true)}
            className="w-[219px] h-[54px] bg-argenpesos-skyBlue rounded-[13px] flex items-center justify-center text-argenpesos-white gap-1"
          >
            <IconNotification />
            Nueva notificación
          </button>
        </div>
        <h4 className="text-[23px] font-bold text-argenpesos-textos pt-10 mb-5">
          Próximas notificaciones
        </h4>

        <div className="grid grid-cols-6 gap-5 my-8">
          <p className="text-[1rem] text-argenpesos-textos font-bold">Nombre</p>
          <div className="flex gap-2 items-center">
            <p className="text-[1rem] text-argenpesos-textos font-bold">
              Fecha
            </p>
            <ArrowBlue />
          </div>
          <p className="text-[1rem] text-argenpesos-textos font-bold">Hora</p>
          <p className="text-[1rem] text-argenpesos-textos font-bold">Imagen</p>
          <p className="text-[1rem] text-argenpesos-textos font-bold">In-App</p>

          <p className="text-[1rem] text-argenpesos-textos font-bold">Push</p>
        </div>
        <div>
          {info.map((inf, index) => (
            <div
              className="grid grid-cols-6 gap-5 relative items-center ml-1"
              key={index}
            >
              <div className="flex items-center gap-1">
                <p className="text-[1rem] text-argenpesos-textos font-book">
                  {inf.name}
                </p>
              </div>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.date}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.age}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.imagen}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.app}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.push}
              </p>

              <div
                onClick={() => toggleVisibility(index)}
                className="absolute right-0 top-0 w-[0px]"
              >
                <button onClick={() => toggleVisibility(index)}>
                  {visibleIndex === index ? <ThreePoints /> : <ThreePoints />}
                </button>
                <div
                  className={`transition-all duration-2000 ease-in-out ${
                    visibleIndex === index
                      ? "opacity-100 h-[90px]"
                      : "opacity-0 max-h-0"
                  } bg-argenpesos-white border-[1px] border-solid border-argenpesos-gray rounded-[7px] w-[158px] relative right-[7rem] z-[100]`}
                >
                  <div className="flex flex-col w-full gap-3 items-center justify-center h-full">
                    <p
                      onClick={() => setModalEdit(true)}
                      className="flex items-center mr-7 cursor-pointer"
                    >
                      <IconEdit color="#575757" />
                      Editar
                    </p>
                    <p
                      onClick={() => setModalDelete(true)}
                      className="flex items-center mr-3 cursor-pointer"
                    >
                      <IconDelete />
                      Eliminar
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-[100%] h-[1px] bg-argenpesos-gray mt-5 col-span-6 mb-10"></div>
            </div>
          ))}

          <h4 className="text-[23px] font-bold text-argenpesos-textos mt-5 mb-10">
            Historial de notificaciones
          </h4>
          <div>
            {info.map((inf, key) => (
              <div
                className="grid grid-cols-6 gap-5 relative items-center ml-1"
                key={key}
              >
                <div className="flex items-center gap-1">
                  <p className="text-[1rem] text-argenpesos-textos font-book">
                    {inf.name}
                  </p>
                </div>
                <p className="text-[1rem] text-argenpesos-textos font-book">
                  {inf.date}
                </p>
                <p className="text-[1rem] text-argenpesos-textos font-book">
                  {inf.age}
                </p>
                <p className="text-[1rem] text-argenpesos-textos font-book">
                  {inf.imagen}
                </p>
                <p className="text-[1rem] text-argenpesos-textos font-book">
                  {inf.app}
                </p>
                <p className="text-[1rem] text-argenpesos-textos font-book">
                  {inf.push}
                </p>
                <div className="absolute right-5 top-3">
                  <ThreePoints />
                </div>
                <div className="w-[100%] h-[1px] bg-argenpesos-gray mt-5 col-span-6 mb-10"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Notifications;
