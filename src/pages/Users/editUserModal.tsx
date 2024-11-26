import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { IconEdit, IconX } from "@utils/svg";
import Modal from "@components/Modal";
import { apiUrls, tokenAccess } from '@config/config';
import { useSelector } from 'react-redux';
import { RootState } from '@store';
import axios from 'axios';
import UserAddresses from "./allAddress";
import { alertError, alertConfirm } from "@utils/alerts";

interface Address {
  street: string;
  number: number;
  zipCode: string;
  city: string;
  province: string;
  
}

export interface UserFormData {
  avatar: string;
  id: number;
  cuil: string;
  gender: string;
  subscriptionStatus: string | number | readonly string[] | undefined;
  firstName: string;
  lastName: string;
  phone: string;
  birthday: string;
  points: number;
  image: string | null;
  address: Address[];
}

interface EditUserModalProps {
  user: UserFormData;
  onSave: (user: UserFormData) => void;
  onClose: () => void;
  userToEdit?: UserFormData;
  setModalEdit: Dispatch<SetStateAction<boolean>>;
  getUsersList: () => Promise<void>; 
}



export const EditUserModal: React.FC<EditUserModalProps> = ({ user,setModalEdit, onSave, onClose,getUsersList  }) => {
  const [formData, setFormData] = useState<UserFormData>(user);
  const [addressToEdit, setAddressToEdit] = useState<Address[]>(user.address || []);
  const { updatingUser } = useSelector((state: RootState) => state.auth); // Obtenemos el estado de Redux
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    console.log("user.gender:", user.gender);  // Verifica el valor de gender en el user
    setFormData((prevData) => ({
      ...prevData,
      cuil: user.cuil ? String(user.cuil) : '',  // Convierte a string si cuil existe
      gender: user.gender || 'Seleccionar',  // Si no existe, asignamos un valor predeterminado
      address: prevData.address.length === 0
        ? [{ street: '', number: 0, zipCode: '', city: '', province: '' }]
        : prevData.address,
    }));
  }, [user]);

  console.log("formData.gender:", formData.gender); 
  
  console.log("formData CUIL:", formData.cuil);  // Verificar el valor de formData.cuil

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        cuil: user.cuil ? String(user.cuil) : '',
        gender: user.gender || 'Seleccionar',
        address: user.address.length > 0
          ? user.address
          : [{ street: '', number: 0, zipCode: '', city: '', province: '' }],
      });
    }
  }, [user]);

  const handleInputChange = (event: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: name === 'points' ? Number(value) : String(value),
    }));
  };

  const handleAddressChange = (index: number, field: keyof Address, value: string | number) => {
    const updatedAddresses = [...addressToEdit];
    updatedAddresses[index] = { ...updatedAddresses[index], [field]: value };
    setAddressToEdit(updatedAddresses);  // Actualizamos el estado con la nueva dirección modificada
  };




  const handleSave = async () => {
    // Transformamos los nombres de los campos para que coincidan con el DTO
    const userData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      cuil: String(formData.cuil),
      birthday: formData.birthday || "",
      phone: formData.phone,
      gender: formData.gender,
      points: formData.points,
    };
  
    // Verificar si el campo 'birthday' tiene un valor válido
    if (!userData.birthday) {
      console.warn("El campo 'birthday' es obligatorio y no puede estar vacío.");
      alertError("El campo de fecha de nacimiento es obligatorio.");
      return;
    }
  
    // Asegurarse que la fecha de nacimiento esté en formato correcto (YYYY-MM-DD)
    const formattedBirthday = new Date(userData.birthday).toISOString().split('T')[0];
    userData.birthday = formattedBirthday;
  
    console.log("userData:", userData);
  
    // Obtenemos el token
    const token = localStorage.getItem(tokenAccess.tokenName);
    console.log("Token extraído de localStorage:", token);
  
    if (!token) {
      console.error("No se encontró el token en localStorage.");
      alertError("No se encontró el token de autenticación.");
      return;
    }
  
    try {
      const response = await axios.put(
        `${apiUrls.putUserById(user.id)}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Respuesta de actualización:", response.data);
    
      if (response.data.ok) {
        console.log("Actualización exitosa, llamando a getUsersList");
        alertConfirm("Datos del usuario actualizados correctamente.");
        onSave(response.data.user);
        if (getUsersList) {
          await getUsersList();  // Agrega un console.log aquí
          console.log("getUsersList ejecutado");
        }
        onClose();
      }
    } catch (error) {
      console.error("Error al actualizar el usuario:", error);
      alertError("Ocurrió un error al intentar actualizar los datos.");
    }
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-2.5 z-50">
      <div className="bg-white rounded-lg w-full max-w-[700px] relative z-50">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 text-gray-500 hover:text-gray-700"
        >
          <IconX />
        </button>

        <div className="p-5">
          <h1 className="text-lg mb-3">Editar usuario {user.firstName} {user.lastName}</h1>
          <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
            {/* Left column - Photo and points */}
            <div className="w-[144px] translate-y-[50px]">
              <div className="rounded-[11px] w-[140px] h-[152px] bg-argenpesos-gray3 border border-argenpesos-gray2 mb-12">
                <img
                  className="w-full h-full object-cover rounded-[11px]"
                  src={apiUrls.avatarUser(user.avatar) || "/avatar/image_default.png"}
                  alt="Avatar"
                />
              </div>
            </div>

            {/* Form fields */}
            <div className="col-span-2 grid grid-cols-2 gap-x-6 gap-y-2.5 mt-2.5">
              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Nombre</label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full h-[26px] px-2.5 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Apellido</label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full h-[26px] px-2.5 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Teléfono</label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full h-[26px] px-2.5 border rounded-md"
                />
              </div>


              <div>
              <label className="block text-sm text-gray-700 mb-0.5">Cuil</label>
              <input
              name="cuil"
              value={formData.cuil || ''}  // Asegúrate de que nunca sea undefined
              onChange={handleInputChange}
              className="w-full h-[26px] px-2.5 border rounded-md"
            />
            </div>
         

              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Fecha de nacimiento</label>
                <input
                  name="birthday"
                  type="date"
                  value={formData.birthday || ''}
                  onChange={handleInputChange}
                  className="w-full h-[26px] px-2.5 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Puntos</label>
                <input
                  name="points"
                  type="number"
                  value={formData.points}
                  onChange={handleInputChange}
                  className="w-full h-[26px] px-2.5 border rounded-md"
                />
              </div>
            </div>
          </div>


 

 {isModalOpen && (
  <Modal
    isShown={isModalOpen}
    closeModal={handleCloseModal}
    element={
      <UserAddresses
        userId={user.id} 
        user={user} 
        onEdit={(address, index) => {
          handleAddressChange(index, 'street', address.street);
          handleAddressChange(index, 'number', address.number);
          handleAddressChange(index, 'zipCode', address.zipCode);
          handleAddressChange(index, 'city', address.city);
          handleAddressChange(index, 'province', address.province);
        } }
        onDelete={(index) => {
          const updatedAddresses = addressToEdit.filter((_, i) => i !== index);
          setAddressToEdit(updatedAddresses);
        } }
        onClose={handleCloseModal} userFormData={user}      />
    }
  />
)}


          <div className="flex gap-3 justify-end mt-6">
          <button 
            onClick={handleOpenModal} 
            className="flex items-center cursor-pointer text-gray-700 translate-y-[25px] translate-x-[-200px]"
          >
            <IconEdit />
            Direcciones de {user.firstName}
          </button>

            <button
              onClick={onClose}
              className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
            >
              Cancelar
            </button>
            <button
              onClick={handleSave}  // Usamos handleSave para despachar la acción
              className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book hover:bg-argentpesos-blue hover:transition-colors duration-100"
              disabled={updatingUser}  // Deshabilitar mientras está en proceso
            >
              {updatingUser ? "Guardando..." : "Guardar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
