import Modal from '@components/Modal';
import { IconX } from '@utils/svg';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@store';
import { editAddressAsync } from '../../store/actions/user';
import { UserFormData } from './editUserModal';
interface Address {
  street: string;
  number: number;
  zipCode: string;
  city: string;
  province: string;
}

interface AddressFormProps {
    address: Address | null; // Aquí es donde defines la prop 'address'
    onAddressChange: (field: keyof Address, value: string | number) => void;
    onSave: () => void;
    onCancel: () => void;
    userFormData: UserFormData;
}

const AddressEditForm: React.FC<AddressFormProps> = ({
  address,
  onAddressChange,
  onSave,
  onCancel,
  userFormData,
}) => {
  const [modalCanceled, setModalCanceled] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleCancel = () => {
    setModalCanceled(true);
  };
  const handleSave = async () => {
    if (!address) {
      console.error("No se puede guardar la dirección, ya que 'address' es null.");
      return;
    }
  
    try {
      await dispatch(editAddressAsync({
        userId: userFormData.id,
        updatedAddress: address, // Ahora es seguro pasar address, ya que hemos comprobado que no es null
        index: 0, // O el índice correspondiente
      }));
      if (onSave) onSave();
    } catch (error) {
      console.error("Error al editar la dirección", error);
    }
  };

  return (
    <>
      <Modal
        isShown={modalCanceled}
        element={
          <div className="px-6 py-6 flex flex-col justify-center gap-5 w-[481px] h-[192px]">
            {/* Modal content remains the same */}
          </div>
        }
      />

      <div className="space-y-4 max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <p className="cursor-pointer" onClick={handleCancel}>
            <IconX />
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-10">
          Editar dirección para {userFormData.firstName} {userFormData.lastName}
        </h2>

        <div className="space-y-4 border-b border-gray-300 pb-4">
          <div className="grid grid-cols-2 gap-x-4 ml-10">
            <div>
              <label className="block text-sm text-gray-700 mb-0.5">Dirección</label>
              <input
                type="text"
                value={address?.street || ""}
                onChange={(e) => onAddressChange('street', e.target.value)}
                className="w-full h-[26px] px-3 border rounded-md mb-4"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-0.5">Número</label>
              <input
                type="number"
                value={address?.number || ""}
                onChange={(e) => onAddressChange('number', Number(e.target.value))}
                className="w-full h-[26px] px-3 border rounded-md mb-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 ml-10">
            <div>
              <label className="block text-sm text-gray-700 mb-0.5">Código Postal</label>
              <input
                type="text"
                value={address?.zipCode || ""}
                onChange={(e) => onAddressChange('zipCode', e.target.value)}
                className="w-full h-[26px] px-3 border rounded-md mb-4"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-0.5">Ciudad</label>
              <input
                type="text"
                value={address?.city || ""}
                onChange={(e) => onAddressChange('city', e.target.value)}
                className="w-full h-[26px] px-3 border rounded-md mb-4"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-x-4 ml-10">
            <div className="col-span-3">
              <label className="block text-sm text-gray-700 mb-0.5">Provincia</label>
              <input
                type="text"
                value={address?.province || ""}
                onChange={(e) => onAddressChange('province', e.target.value)}
                className="w-full h-[26px] px-3 border rounded-md mb-4"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={onCancel}
            className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book hover:bg-argenpesos-blue hover:transition-colors duration-100"
          >
            Guardar
          </button>
        </div>
      </div>
    </>
  );
};

export default AddressEditForm;
