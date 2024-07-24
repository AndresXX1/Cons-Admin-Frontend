import { IconDelete, IconEdit, IconMas, IconX, IconPencil } from "@utils/svg";
import { useState } from "react";
import Modal from "@components/Modal";

const EditContent = () => {
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [modalDeleteNotice, setModalDeleteNotice] = useState(false);
  const [modalCreateNotice, setModalCreateNotice] = useState<boolean>(false);

  const info = [
    {
      image: "/edit_content/image_banner_2.png",
    },
    {
      image: "/edit_content/image_banner_3.png",
    },
  ];
  return (
    <>
      <Modal
        isShown={modalDelete}
        element={
          <div className="px-6 py-6 flex flex-col justify-center w-[481px] h-[192px]">
            <div className="flex justify-between items-start">
              <p className="text-[1rem] text-argenpesos-textos font-bold max-w-[370px]">
                ¿Está seguro que desea eliminar esta imagen del home banner?
              </p>
              <p
                className="cursor-pointer mt-2"
                onClick={() => setModalDelete(false)}
              >
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px] mb-10 mt-1">
              Si la elimina ya no se verá en el home de la app.
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
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[668px]">
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
                      className="w-[185-px] h-[185px]"
                      src="/edit_content/image_edit.png"
                    ></img>
                  </div>
                  <p className="flex gap-1 items-center pt-[18px] text-[14px] font-book text-argenpesos-textos">
                    <IconPencil />
                    Subir foto o video
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="">Título</label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Título"
                  />

                  <label htmlFor="">Fecha</label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="1 / 1 / 2025"
                  />

                  <label htmlFor="">Descripción</label>
                  <input
                    className="w-[617px] h-[181px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Cuerpo de texto"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10">
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
        isShown={modalDeleteNotice}
        element={
          <div className="px-6 py-6 flex flex-col justify-center w-[481px] h-[192px]">
            <div className="flex justify-between items-start">
              <p className="text-[1rem] text-argenpesos-textos font-bold max-w-[370px]">
                ¿Está seguro que desea eliminar esta noticia?
              </p>
              <p
                className="cursor-pointer mt-2"
                onClick={() => setModalDeleteNotice(false)}
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
                  setModalDeleteNotice(false);
                }}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  setModalDeleteNotice(false);
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
        isShown={modalCreateNotice}
        element={
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[668px]">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold">
                Editar noticia
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setModalCreateNotice(false)}
              >
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-4">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                    <img
                      className="w-[185px] h-[185px]"
                      src="/edit_content/image_banner_2.png"
                    ></img>
                  </div>
                  <div className="flex gap-1 mt-3 mb-5">
                    <p className="flex items-center gap-1 text-[14px] text-argenpesos-textos font-book cursor-pointer">
                      <IconPencil />
                      Editar foto
                    </p>
                    <p className="flex items-center text-[14px] text-argenpesos-red font-book cursor-pointer">
                      <IconDelete className="w-[22px] h-[22px]" />
                      Eliminar
                    </p>
                  </div>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="">Título</label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Título"
                  />

                  <label htmlFor="">Fecha</label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="1 / 1 / 2025"
                  />

                  <label htmlFor="">Descripción</label>
                  <input
                    className="w-[617px] h-[181px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Cuerpo de texto"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10">
              <button className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book">
                Cancelar
              </button>
              <button
                onClick={() => setModalCreateNotice(false)}
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
          Editar contenido
        </p>
        <p className="text-[23px] font-bold text-argenpesos-textos mb-6">
          Home banner
        </p>

        <div className="flex gap-5">
          <div className="max-w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray">
            <div className="rounded-[13px] bg-[#F9F9F9] flex items-center relative">
              <img
                className="w-full h-full overflow-hidden"
                src="/edit_content/image_banner.png"
                alt=""
              />
              <div
                onClick={() => setModalDelete(true)}
                className="absolute bottom-4 flex gap-2 right-5 cursor-pointer"
              >
                <IconDelete />
              </div>
            </div>
          </div>
          <div className="w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center cursor-pointer">
            <IconMas />
          </div>
        </div>

        <p className="text-[23px] font-bold text-argenpesos-textos mt-10 mb-5">
          Noticias
        </p>
        <div className="flex gap-5">
          {info.map((inf, key) => (
            <div
              key={key}
              className="max-w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray"
            >
              <div className="rounded-[13px] bg-[#F9F9F9] flex items-center relative">
                <img
                  className="w-full h-full overflow-hidden"
                  src={inf.image}
                  alt=""
                />
                <div className="absolute bottom-4 flex gap-3 right-6">
                  <IconEdit
                    onClick={() => setModalCreateNotice(true)}
                    className="cursor-pointer"
                  />
                  <IconDelete
                    className="cursor-pointer"
                    onClick={() => setModalDeleteNotice(true)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => setModalCreate(true)}
            className="w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center cursor-pointer"
          >
            <IconMas />
          </div>
        </div>
      </div>
    </>
  );
};

export default EditContent;
