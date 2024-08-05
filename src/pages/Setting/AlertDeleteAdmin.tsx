import { IconX } from "@utils/svg";
import React from "react";

interface AlertDeleteAdminProps {
  setModalDelete: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertDeleteAdmin = ({ setModalDelete }: AlertDeleteAdminProps) => {
  return (
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
  );
};

export default AlertDeleteAdmin;
