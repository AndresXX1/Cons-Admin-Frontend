import { useState } from "react";
import Modal from "@components/Modal";
import {
  ArrowBlue,
  ArrowLeft,
  ArrowRight,
  BlockedIcon,
  IconDelete,
  IconEdit,
  IconFilter,
  IconPencil,
  IconVerify,
  IconX,
  ThreePoints,
} from "@utils/svg";

const Users = () => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [openModalEdit, setOpenModalEdit] = useState<boolean>(false);

  const toggleVisibility = (index: number) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
    } else {
      setVisibleIndex(index);
    }
  };
  const info2 = [
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
  ];

  return (
    <>
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
      ></Modal>
      <div className="flex flex-col pl-16 pt-12 px-10">
        <div className="flex gap-2 mb-8">
          <p className="text-[3rem] text-argenpesos-textos font-bold">
            Usuarios
          </p>
          <p className="text-[40px] text-argenpesos-textos font-book mt-[6px]">
            (127)
          </p>
        </div>

        <div className="flex">
          <input
            className="w-[477px] h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10"
            type="search"
            placeholder="Buscar estadísticas o datos"
          />
          <div className="flex w-[120px] h-[54px] ml-4 border-[1px] border-argenpesos-textos items-center justify-center gap-2 rounded-[13px]">
            <IconFilter />
            <p>Filtros</p>
          </div>
          <div className="flex justify-between gap-32 items-center">
            <p className="pl-40">1 - 50 de 2000</p>
            <div className="flex gap-10">
              <ArrowLeft />
              <ArrowRight />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-5 my-8">
          <p className="text-[1rem] text-argenpesos-textos font-bold">
            Nombre de usuario
          </p>
          <p className="text-[1rem] text-argenpesos-textos font-bold ml-5">
            % Smarter
          </p>
          <p className="text-[1rem] text-argenpesos-textos font-bold">Status</p>
          <p className="text-[1rem] text-argenpesos-textos font-bold">Edad</p>
          <p className="text-[1rem] text-argenpesos-textos font-bold">Puntos</p>
          <div className="flex gap-2 items-center">
            <p className="text-[1rem] text-argenpesos-textos font-bold">
              Creado
            </p>
            <ArrowBlue />
          </div>
        </div>
        <div>
          {info2.map((inf, index) => (
            <div
              className="grid grid-cols-6 gap-5 relative items-center"
              key={index}
            >
              <div className="flex items-center gap-1 z-[-1]">
                <img
                  className="w-[50px] h-[50px]"
                  src={inf.img}
                  alt={inf.name}
                />
                <p className="text-[1rem] text-argenpesos-textos font-book">
                  {inf.name}
                </p>
              </div>
              <p className="text-[1rem] text-argenpesos-textos font-book ml-12">
                {inf.smarter}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.status}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.age}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-book">
                {inf.points}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-book z-[-1]">
                {inf.date}
              </p>
              <div
                onClick={() => toggleVisibility(index)}
                className="absolute right-0 top-3 w-[0px]"
              >
                <button onClick={() => toggleVisibility(index)}>
                  {visibleIndex === index ? <ThreePoints /> : <ThreePoints />}
                </button>
                <div
                  className={`transition-all duration-2000 ease-in-out ${
                    visibleIndex === index
                      ? "opacity-100 h-[132px]"
                      : "opacity-0 max-h-0"
                  } bg-argenpesos-white border-[1px] border-solid border-argenpesos-gray rounded-[7px] w-[158px] relative right-[7rem] z-[100]`}
                >
                  <div className="flex flex-col w-full gap-3 items-center justify-center h-full">
                    <p
                      onClick={() => setOpenModalEdit(true)}
                      className="flex items-center mr-7 cursor-pointer"
                    >
                      <IconEdit color="#575757" />
                      Editar
                    </p>
                    <p
                      onClick={() => setOpenModal(true)}
                      className="flex items-center gap-1 cursor-pointer"
                    >
                      <BlockedIcon />
                      Bloquear
                    </p>
                    <p
                      onClick={() => setOpenModalDelete(true)}
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
        </div>
      </div>
    </>
  );
};

export default Users;
