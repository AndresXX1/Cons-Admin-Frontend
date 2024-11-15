import React from "react";
import { IconX } from "@utils/svg";  // Asegúrate de tener este ícono
import Modal from "@components/Modal";

interface ConfirmDeleteModalProps {
  isShown: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({ isShown, onClose, onConfirm }) => {
  return (
    <Modal isShown={isShown} element={
      <div className="px-6 py-6 flex flex-col justify-center gap-5 w-[481px] h-[192px]">
        <div className="flex justify-between items-center">
          <p className="text-[1rem] text-argenpesos-textos font-bold">
            ¿Está seguro que desea eliminar este producto?
          </p>
          <p className="cursor-pointer" onClick={onClose}>
            <IconX />
          </p>
        </div>
        <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
          Si lo elimina no podrá recuperarlo más adelante.
        </p>
        <div className="flex gap-4">
          <button
            onClick={onConfirm}
            className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
          >
            Eliminar
          </button>
          <button
            onClick={onClose}
            className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
          >
            Cancelar
          </button>
        </div>
      </div>
    } />
  );
};

export default ConfirmDeleteModal;
