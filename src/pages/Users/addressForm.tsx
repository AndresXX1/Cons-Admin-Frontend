import Modal from '@components/Modal';
import { RootState } from '@store';
import { IconX } from '@utils/svg';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@store';
import { createAddressAsync } from '../../store/actions/user'; 
import { Address } from '../../store/types/user';

// Propiedades que recibe el componente
interface AddressFormProps {
  address: Address;  // Una sola dirección en lugar de un array
  onAddressChange: (field: keyof Address, value: string | number) => void;
  onSave?: () => void;
  onCancel?: () => void;
  userFormData: any;
}

const AddressForm: React.FC<AddressFormProps> = ({
  address,
  onAddressChange,
  onSave,
  onCancel,
  userFormData,
}) => {
  const { loading, error } = useSelector((state: RootState) => ({
    loading: state.Product.loading,
    error: state.Product.error,
  }));

  const [modalCanceled, setModalCanceled] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();

  const handleCancel = () => {
    setModalCanceled(true);
  };

  const closeCancelModal = () => {
    setModalCanceled(false);
  };

  const handleConfirmCancel = () => {
    setModalCanceled(false);
    if (onCancel) {
      onCancel();
    }
  };

  const handleSave = async () => {
    try {
      const newAddress = {
        street: address.street,
        number: address.number,
        zipCode: address.zipCode,
        city: address.city,
        province: address.province,
      };

      // Despacha la acción con el `userId` y la nueva dirección
      await dispatch(createAddressAsync({ userId: userFormData.id, address: newAddress }));

      if (onSave) onSave();
    } catch (error) {
      console.error("Error al crear la dirección", error);
    }
  };

  return (
    <>
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
                onClick={closeCancelModal}
              >
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
              Se descartarán los cambios que hayas realizado.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleConfirmCancel}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Salir
              </button>
              <button
                onClick={closeCancelModal}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      />

      {/* El formulario de dirección */}
      <div className="space-y-4 max-w-4xl mx-auto p-6">
        <div className="flex justify-between items-center">
          <p className="cursor-pointer" onClick={handleCancel}>
            <IconX />
          </p>
        </div>

        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-10">
          {address.street ? 'Editar' : 'Crear'} dirección para {userFormData.firstName} {userFormData.lastName}
        </h2>

        {/* Dirección y número */}
        <div className="grid grid-cols-2 gap-x-4 ml-10">
          <div>
            <label className="block text-sm text-gray-700 mb-0.5">Dirección</label>
            <input
              type="text"
              value={address.street}
              onChange={(e) => onAddressChange('street', e.target.value)}
              className="w-full h-[26px] px-3 border rounded-md mb-4"
              placeholder="Ejemplo: Calle Falsa 123"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-0.5">Número</label>
            <input
              type="number"
              value={address.number}
              onChange={(e) => onAddressChange('number', Number(e.target.value))}
              className="w-full h-[26px] px-3 border rounded-md mb-4"
              placeholder='Ej: 825'
            />
          </div>
        </div>

        {/* Código Postal y Ciudad */}
        <div className="grid grid-cols-2 gap-x-4 ml-10">
          <div>
            <label className="block text-sm text-gray-700 mb-0.5">Código Postal</label>
            <input
              type="text"
              value={address.zipCode}
              onChange={(e) => onAddressChange('zipCode', e.target.value)}
              className="w-full h-[26px] px-3 border rounded-md mb-4"
              placeholder='Ej: X5008'
            />
          </div>

          <div>
            <label className="block text-sm text-gray-700 mb-0.5">Ciudad</label>
            <input
              type="text"
              value={address.city}
              onChange={(e) => onAddressChange('city', e.target.value)}
              className="w-full h-[26px] px-3 border rounded-md mb-4"
              placeholder='Ej: San Francisco'
            />
          </div>
        </div>

        {/* Provincia */}
        <div className="grid grid-cols-3 gap-x-4 ml-10">
          <div className="col-span-3">
            <label className="block text-sm text-gray-700 mb-0.5">Provincia</label>
            <input
              type="text"
              value={address.province}
              onChange={(e) => onAddressChange('province', e.target.value)}
              className="w-full h-[26px] px-3 border rounded-md mb-4"
              placeholder='Ej: Córdoba'
            />
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={handleCancel}
            className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book hover:bg-argenpesos-blue hover:transition-colors duration-100"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </>
  );
};

export default AddressForm;