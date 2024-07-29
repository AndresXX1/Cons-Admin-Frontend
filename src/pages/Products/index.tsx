import { useState } from "react";
import {
  IconDelete,
  IconEdit,
  IconMas,
  IconPencil,
  IconViewBlue,
  IconX,
  IconViewBlueOff,
} from "@utils/svg";
import Modal from "@components/Modal";

const Products = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [modalCanceled, setModalCanceled] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [showVisible, setShowVisible] = useState(false);

  const toggleVisibility = () => {
    setShowVisible(prevShowPassword => !prevShowPassword);
  };

  const info = [
    {
      title: "Auricular Bluetooth F9-5",
      points: "1200 Puntos",
      image: "/products/image_auricular.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "1300 Puntos",
      image: "/products/image_reloj.png",
    },
  ];

  const info2 = [
    {
      name: "Productos destacados",
    },
    {
      name: "Electrodomésticos",
    },
    {
      name: "Celulares",
    },
    {
      name: "Juguetes",
    },
    {
      name: "Televisores",
    },
    {
      name: "Audios",
    },
  ];

  const info3 = [
    {
      title: "Auricular Bluetooth F9-5",
      points: "$270.000",
      image: "/products/image_auricular.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
  ];
  return (
    <>
      <Modal
        isShown={modal}
        element={
          <div className="px-6 py-6 flex flex-col justify-center gap-5 w-[481px] h-[192px]">
            <div className="flex justify-between items-center">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea eliminar este usuario?
              </p>
              <p className="cursor-pointer" onClick={() => setModal(false)}>
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
                onClick={() => setModal(false)}
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
                Editar producto
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setModalCreate(false)}
              >
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-12">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                    <img
                      className="w-[84px] h-[84px]"
                      src="/products/image_default.png"
                    ></img>
                  </div>
                  <p className="flex gap-1 items-center pt-[18px] text-[14px] font-book text-argenpesos-textos">
                    <IconPencil />
                    Editar fotos
                  </p>

                  <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                    Incluye envío
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p>Si</p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p>No</p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                    Colores disponibles
                  </p>

                  <div className="w-[17px] h-[17px] rounded-full bg-argenpesos-skyBlue"></div>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="">Nombre del producto</label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                  />

                  <label htmlFor="">Valor del producto (puntos)</label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                  />

                  <label htmlFor="">Descripción</label>
                  <input
                    className="w-[617px] h-[181px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setModalCanceled(true)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
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
        isShown={modalCanceled}
        element={
          <div className="px-6 py-6 flex flex-col justify-center gap-5 w-[481px] h-[192px]">
            <div className="flex justify-between items-center">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea salir?
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setModalCanceled(false)}
              >
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
              Se descartarán los cambios que hayas realizado.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setModalCreate(false);
                  setModalCanceled(false);
                }}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Salir
              </button>
              <button
                onClick={() => {
                  setModalCanceled(false);
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
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[668px]">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold">
                Editar producto
              </p>
              <p className="cursor-pointer" onClick={() => setModalEdit(false)}>
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-12">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3">
                    <img
                      className="w-[185px] h-[185px] border-[1px] border-solid border-argenpesos-gray2 rounded-[15px]"
                      src={info[0].image}
                    ></img>
                  </div>
                  <div className="flex gap-1 mt-3 mb-5">
                    <p className="flex items-center gap-1 text-[14px] text-argenpesos-textos font-book cursor-pointer">
                      <IconPencil />
                      Editar fotos
                    </p>
                    <p className="flex items-center text-[14px] text-argenpesos-red font-book cursor-pointer">
                      <IconDelete className="w-[22px] h-[22px]" />
                      Eliminar
                    </p>
                  </div>

                  <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                    Incluye envío
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p>Si</p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p>No</p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                    Colores disponibles
                  </p>

                  <div className="w-[17px] h-[17px] rounded-full bg-argenpesos-skyBlue"></div>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label htmlFor="">Nombre del producto</label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                    placeholder={info[0].title}
                  />

                  <label htmlFor="">Valor del producto (puntos)</label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                    placeholder={info[0].points}
                  />

                  <label htmlFor="">Descripción</label>
                  <input
                    className="w-[617px] h-[181px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setModalEdit(true)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
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
          Productos
        </p>

        <p className="text-[23px] font-bold text-argenpesos-textos mb-4">
          Canjeables por puntos
        </p>

        <div className="flex gap-7">
          {info.map((inf, key) => (
            <div
              className="max-w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray"
              key={key}
            >
              <div className="flex flex-col justify-between pt-5  pb-3 pl-4">
                <h4 className="w-[141px] text-[20px] font-book leading-[24px] text-argenpesos-textos">
                  {inf.title}
                </h4>
                <p className="text-argenpesos-red text-[20px] font-bold leading-[19px]">
                  {inf.points}
                </p>
              </div>
              <div className="h-full w-[150px] rounded-[13px] bg-[#F9F9F9] flex items-center relative">
                <img className="w-[150px] h-[150px]" src={inf.image} alt="" />
                <div className="absolute bottom-2 flex gap-2 left-14">
                  <IconEdit
                    className="cursor-pointer"
                    onClick={() => setModalEdit(true)}
                  />
                  <IconDelete
                    onClick={() => setModal(true)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => setModalCreate(true)}
            className="w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center cursor-pointer"
          >
            <IconMas />
          </div>
        </div>

        <h4 className="text-[23px] font-bold text-argenpesos-textos pt-10 mb-5">
          Argencompras
        </h4>
        <input
          className="w-full h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10"
          type="search"
          placeholder="Buscar estadísticas o datos"
        />

        <div className="flex justify-between mt-10 pr-4">
          {info2.map((info, key) => (
            <div key={key}>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {info.name}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 mt-5 mb-5">
          {info3.map((inf, key) => (
            <div
              className="max-w-[305px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray mb-10"
              key={key}
            >
              <div className="flex flex-col justify-between pt-5  pb-3 pl-4">
                <h4 className="w-[141px] text-[20px] font-book leading-[24px] text-argenpesos-textos">
                  {inf.title}
                </h4>
                <p className="text-argenpesos-red text-[20px] font-bold leading-[19px]">
                  {inf.points}
                </p>
              </div>
              <div className="h-full w-[150px] rounded-[13px] bg-[#F9F9F9] flex items-center relative">
                <img className="w-[150px] h-[150px]" src={inf.image} alt="" />
                <div
                  onClick={toggleVisibility}
                  className="absolute bottom-2 flex gap-2 right-4 cursor-pointer"
                >
                  {showVisible ? <IconViewBlue /> : <IconViewBlueOff />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
