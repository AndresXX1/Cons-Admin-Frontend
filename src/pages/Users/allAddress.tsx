import Modal from '@components/Modal';
import { RootState } from '@store';
import { IconX, IconEdit, IconDelete } from '@utils/svg';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@store';
import { getUserAddressesAsync, deleteAddressAsync, editAddressAsync } from "../../store/actions/user";
import { UserFormData } from './editUserModal';
import { Address, Address as AddressType } from '../../store/types/user';
import AddressForm from "./addressForm";

interface UserAddressesProps {
  userId: number;
  user: UserFormData;
  onEdit: (address: Address, index: number) => void;
  onDelete: (index: number) => void;
  onClose: () => void;
  userFormData: UserFormData;
  onSave?: (updatedUser: any) => void;
}

const AllAddress: React.FC<UserAddressesProps> = ({ userId, user, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { addresses, loading, error } = useSelector((state: RootState) => ({
    addresses: state.address.addresses,
    loading: state.address.loading,
    error: state.address.error,
  }));

  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState<AddressType | null>(null);
  const [addressToEditIndex, setAddressToEditIndex] = useState<number | null>(null);
  const [modalCanceled, setModalCanceled] = useState<boolean>(false);
  const [showAddressFormModal, setShowAddressFormModal] = useState(false);
  const [newAddress, setNewAddress] = useState<AddressType>({
    street: '',
    number: 0,
    zipCode: '',
    city: '',
    province: ''
  });

  useEffect(() => {
    dispatch(getUserAddressesAsync(userId));
  }, [dispatch, userId]);

  const handleNewAddressChange = (field: keyof AddressType, value: string | number) => {
    setNewAddress(prev => ({ ...prev, [field]: value }));
  };

  const handleDelete = (index: number) => {
    setAddressToDelete(index);
    setShowDeleteModal(true);
  };

  const openAddressModal = () => {
    const emptyAddress: AddressType = {
      street: '',
      number: 0,
      zipCode: '',
      city: '',
      province: ''
    };
    
    setNewAddress(emptyAddress);
    setShowAddressFormModal(true); // Cambiamos esto para abrir el modal correcto
  };



  const confirmDelete = async () => {
    if (addressToDelete !== null) {
      try {
        await dispatch(deleteAddressAsync({ userId, index: addressToDelete }));
        dispatch(getUserAddressesAsync(userId)); // Recargar direcciones
        setShowDeleteModal(false);
        setAddressToDelete(null);
      } catch (error) {
        console.error("Error al eliminar la dirección", error);
      }
    }
  };

  const handleEdit = (address: AddressType, index: number) => {
    setAddressToEdit(address); // Establecer la dirección a editar
    setAddressToEditIndex(index); // Establecer el índice de la dirección
    setShowAddressForm(true); // Abrir el modal con el formulario
  };

  const handleAddressChange = (field: keyof AddressType, value: string | number) => {
    if (addressToEdit) {
      setAddressToEdit({ ...addressToEdit, [field]: value });
    }
  };



  const handleSaveAddress = async () => {
    if (addressToEdit && addressToEditIndex !== null) {
      try {
        // Despachar la acción para editar la dirección
        await dispatch(editAddressAsync({
          userId, // id del usuario
          index: addressToEditIndex, // Utilizar el índice guardado
          updatedAddress: addressToEdit // Dirección actualizada
        }));
        // Recargar las direcciones después de la edición
        dispatch(getUserAddressesAsync(userId));
        // Cerrar el formulario después de guardar
        setShowAddressForm(false);
      } catch (error) {
        console.error("Error al guardar la dirección", error);
      }
    }
  };

  const handleCancel = () => {
    setModalCanceled(true);
  };

  const closeCancelModal = () => {
    setModalCanceled(false); // Cierra el modal de cancelación sin realizar cambios
  };

  const handleConfirmCancel = () => {
    setShowAddressForm(false); // Cancela el formulario y cierra el modal
    setModalCanceled(false);
  };

  if (loading) {
    return <div className="text-center py-4">Cargando direcciones...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-4">{error}</div>;
  }
  
  const handleSaveNewAddress = async () => {
    try {
      // Aquí puedes agregar la lógica para guardar la nueva dirección
      // Por ejemplo, crear una nueva acción en tu store para agregar direcciones
      // await dispatch(addNewAddressAsync({ userId, newAddress }));
      
      // Recargar las direcciones después de guardar
      await dispatch(getUserAddressesAsync(userId));
      setShowAddressFormModal(false);
    } catch (error) {
      console.error("Error al guardar la nueva dirección", error);
    }
  };

  return (
    <>
      {/* Modal para eliminar dirección */}
      <Modal
        isShown={showDeleteModal}
        closeModal={() => setShowDeleteModal(false)}
        element={
          <div className="px-6 py-6 flex flex-col justify-center gap-5 w-[481px] h-[192px]">
            <div className="flex justify-between items-center">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea eliminar esta dirección?
              </p>
              <p className="cursor-pointer" onClick={() => setShowDeleteModal(false)}>
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
              Esta acción no se puede deshacer.
            </p>
            <div className="flex gap-4">
              <button
                onClick={confirmDelete}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Eliminar
              </button>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      />

      {/* Modal para confirmar cancelación */}
      <Modal
        isShown={modalCanceled}
        element={
          <div className="px-6 py-6 flex flex-col justify-center gap-5 w-[481px] h-[192px]">
            <div className="flex justify-between items-center">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea salir?
              </p>
              <p className="cursor-pointer" onClick={closeCancelModal}>
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

      {/* Modal para el formulario de dirección */}
      <Modal
        isShown={showAddressForm}
        closeModal={() => setShowAddressForm(false)}
        element={
          <div className="space-y-4 max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center">
              <p className="cursor-pointer" onClick={handleCancel}>
                <IconX />
              </p>
            </div>
            <h2 className="text-2xl font-semibold text-center text-gray-700 mb-10">
              {addressToEdit ? `Editar Domicilio ${addressToEditIndex! + 1} de ${user.firstName}` : "Crear Domicilio"}
            </h2>

            {/* Formulario de dirección */}
            <div className="grid grid-cols-2 gap-x-4 ml-10">
              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Dirección</label>
                <input
                  type="text"
                  value={addressToEdit?.street || ""}
                  onChange={(e) => handleAddressChange('street', e.target.value)}
                  className="w-full h-[26px] px-3 border rounded-md mb-4"
                  placeholder="Ejemplo: Calle Falsa 123"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Número</label>
                <input
                  type="number"
                  value={addressToEdit?.number || 0}
                  onChange={(e) => handleAddressChange('number', Number(e.target.value))}
                  className="w-full h-[26px] px-3 border rounded-md mb-4"
                  placeholder="Ej: 825"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-x-4 ml-10">
              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Código Postal</label>
                <input
                  type="text"
                  value={addressToEdit?.zipCode || ""}
                  onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                  className="w-full h-[26px] px-3 border rounded-md mb-4"
                  placeholder="Ej: X5008"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Ciudad</label>
                <input
                  type="text"
                  value={addressToEdit?.city || ""}
                  onChange={(e) => handleAddressChange('city', e.target.value)}
                  className="w-full h-[26px] px-3 border rounded-md mb-4"
                  placeholder="Ej: San Francisco"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-x-4 ml-10">
              <div className="col-span-3">
                <label className="block text-sm text-gray-700 mb-0.5">Provincia</label>
                <input
                  type="text"
                  value={addressToEdit?.province || ""}
                  onChange={(e) => handleAddressChange('province', e.target.value)}
                  className="w-full h-[26px] px-3 border rounded-md mb-4"
                  placeholder="Ej: Córdoba"
                />
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={handleCancel} // Muestra el modal de cancelación
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveAddress} // Llama a la función de guardar que despacha la acción
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book hover:bg-argenpesos-blue hover:transition-colors duration-100"
                disabled={loading}
              >
                {loading ? "Guardando..." : "Guardar"}
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </div>
        }
      />

      {/* Lista de direcciones */}
      <div className="space-y-4 max-w-5xl mx-auto p-6 w-[552px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-700 translate-x-[50px]">
            Direcciones de {user.firstName} {user.lastName}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <IconX />
          </button>
        </div>

        <button
          onClick={openAddressModal} // Pasar tanto la dirección como el índice
            className="flex items-center gap-2 px-4 py-2 bg-argenpesos-skyBlue text-white rounded-md hover:bg-blue-600 mb-4 translate-x-[130px]"
          >
            <IconEdit />
            Agregar Dirección
          </button>

        {addresses.length === 0 ? (
          <div className="text-center text-gray-500 py-4">No hay direcciones registradas</div>
        ) : (
addresses.length === 0 ? (
  <div className="text-center text-gray-500 py-4">No hay direcciones registradas</div>
) : (
  addresses.map((address, index) => (
    <div key={index} className="border rounded-lg p-4 mb-4 relative">
      {/* Mostrar el número de la dirección */}

      <div className="absolute right-4 top-4 flex gap-2">
        <button onClick={() => handleEdit(address, index)}>
          <IconEdit />
        </button>
        <button onClick={() => handleDelete(index)} className="p-2 text-red-600 hover:text-red-800">
          <IconDelete />
        </button>
      </div>

      <p className="text-smb text-argenpesos-skyBlue"> Domicilio {index + 1}</p>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <p className="text-sm text-gray-500">Dirección</p>
          <p className="font-medium">{address.street} {address.number}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Código Postal</p>
          <p className="font-medium">{address.zipCode}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Ciudad</p>
          <p className="font-medium">{address.city}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Provincia</p>
          <p className="font-medium">{address.province}</p>
        </div>
      
        <Modal
        isShown={showAddressFormModal}
        closeModal={() => setShowAddressFormModal(false)}
        element={
          <div className="space-y-4 max-w-4xl mx-auto p-6">
            <div className="flex justify-between items-center">


            </div>
            <AddressForm
              address={newAddress}
              onAddressChange={handleNewAddressChange}
              onSave={handleSaveNewAddress}
              onCancel={() => setShowAddressFormModal(false)}
              userFormData={user}
            />
          </div>
        }
      />
      
      </div>
    </div>
  )))
)}

      </div>
    </>
  );
};

export default AllAddress;
