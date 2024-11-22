import React, { useState, useEffect } from 'react';
import { IconPencil, IconX, IconEdit } from "@utils/svg";

interface Address {
  street: string;
  number: number;
  zipCode: string;
  city: string;
  province: string;
}

export interface UserFormData {
  cuil: string | number | readonly string[] | undefined;
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
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onSave, onClose }) => {
  const [formData, setFormData] = useState<UserFormData>(user);
  const [errors, setErrors] = useState<any>({});
  const [image, setImage] = useState<string | null>(null);
  const [addressToEdit, setAddressToEdit] = useState<Address[]>(user.address || []);
  const [modalAddress, setModalAddress] = useState(false);

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      address: prevData.address.length === 0 ? [{ street: '', number: 0, zipCode: '', city: '', province: '' }] : prevData.address,
    }));
  }, [user]);

  // Manejador de cambios en los campos de entrada
  const handleInputChange = (
    event: React.ChangeEvent<{ name?: string; value: unknown }>
  ) => {
    const { name, value } = event.currentTarget;
    setFormData((prevData) => ({
      ...prevData,
      [name!]: value,
    }));
  };

  // Manejador de cambios en los campos de dirección
  const handleAddressFieldChange = (
    index: number,
    field: keyof Address,
    value: string | number
  ) => {
    const updatedAddresses = [...formData.address];
    updatedAddresses[index] = {
      ...updatedAddresses[index],
      [field]: value,
    };
    setFormData((prevData) => ({
      ...prevData,
      address: updatedAddresses,
    }));
  };

  // Manejador de cambios en la imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setFormData((prevData) => ({
        ...prevData,
        image: file.name,
      }));
    }
  };

  // Validación de los datos del formulario
  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.firstName) newErrors.firstName = 'El nombre es obligatorio';
    if (!formData.lastName) newErrors.lastName = 'El apellido es obligatorio';
    if (!formData.phone) newErrors.phone = 'El teléfono es obligatorio';
    if (!formData.birthday) newErrors.birthday = 'La fecha de cumpleaños es obligatoria';
    if (formData.points < 0) newErrors.points = 'Los puntos no pueden ser negativos';
    if (!formData.image) newErrors.image = 'La imagen de perfil es obligatoria';

    // Validación de la dirección
    formData.address.forEach((address, index) => {
      if (!address.street) newErrors[`street_${index}`] = 'La calle es obligatoria';
      if (!address.number) newErrors[`number_${index}`] = 'El número es obligatorio';
      if (!address.zipCode) newErrors[`zipCode_${index}`] = 'El código postal es obligatorio';
      if (!address.city) newErrors[`city_${index}`] = 'La ciudad es obligatoria';
      if (!address.province) newErrors[`province_${index}`] = 'La provincia es obligatoria';
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  
  // Manejador de guardado de los cambios
  const handleSave = () => {
    if (validateForm()) {
      onSave(formData); // Si la validación pasa, guarda los cambios
    }
  };

  const openAddressModal = () => {
    const newAddress = user.address && user.address.length > 0 
      ? { ...user.address[0], number: Number(user.address[0].number) }
      : { street: '', number: 0, zipCode: '', city: '', province: '' };
    
    // Wrap the single address in an array
    setAddressToEdit([newAddress]);
    console.log('Address to edit:', newAddress); 
    setModalAddress(true);
  };


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
          <h1 className="text-lg mb-3">Editar usuario</h1>
          <div className="grid grid-cols-[auto_1fr_1fr] gap-6">
            {/* Left column - Photo and points */}
            <div className="w-[144px] translate-y-[50px]">
              <div className="rounded-[11px] w-[140px] h-[152px] bg-argenpesos-gray3 border border-argenpesos-gray2 mb-12">
                <img
                  className="w-full h-full object-cover rounded-[11px]"
                  src={image || "/products/image_default.png"} 
                />
                <div className="flex gap-1.5 text-xs mb-2.5 translate-y-[15px]">
                  <p
                    className="flex gap-1 items-center text-[9px] font-book text-argenpesos-textos cursor-pointer"
                    onClick={() => document.getElementById("image-upload")?.click()}
                  >
                    <IconPencil />
                    {user ? "Editar fotos" : "Añadir fotos"}
                  </p>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleImageChange}
                  />
                </div>
              </div>
            </div>

            {/* Middle and right columns - form fields in 2 columns */}
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
                <label className="block text-sm text-gray-700 mb-0.5">Suscripción</label>
                <input
                  value={formData.subscriptionStatus}
                  readOnly
                  className="w-full h-[26px] px-2.5 border rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Cuil</label>
                <input
                  name="cuil"
                  value={formData.cuil}
                  onChange={handleInputChange}
                  className="w-full h-[26px] px-2.5 border rounded-md"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-700 mb-0.5">Género</label>
                <select
                  name="gender"
                  value={formData.gender || ''}
                  onChange={handleInputChange}
                  className="w-full h-[26px] px-2.5 border rounded-md"
                >
                  <option value="">Seleccionar</option>
                  <option value="Masculino">Masculino</option>
                  <option value="Femenino">Femenino</option>
                  <option value="Otro">Otro</option>
                </select>
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

          {/* Renderizar campos de dirección */}
       
          {/* Mostrar errores si los hay */}
          <div className="mt-2.5">
            {Object.values(errors).some((error) => error) && (
              <div className="bg-red-100 text-red-800 p-2 rounded-md mb-2.5">
                <ul>
                  {errors.firstName && <li>{errors.firstName}</li>}
                  {errors.lastName && <li>{errors.lastName}</li>}
                  {errors.phone && <li>{errors.phone}</li>}
                  {errors.points && <li>{errors.points}</li>}
                  {errors.image && <li>{errors.image}</li>}
                  {Object.keys(errors).map((key) => (
                    errors[key] && <li key={key}>{errors[key]}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>


          <div className="border-b border-gray-300 pb-2.5"></div>

          <button onClick={openAddressModal} className="flex items-center cursor-pointer text-gray-700">
  <IconEdit color="#575757" className="mr-2" /> {/* Añadido margen a la derecha del ícono */}
  Direcciones
</button>
          {/* Botones de acción */}
          <div className="flex gap-3 justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-1.5 text-white bg-gray-500 rounded-md hover:bg-gray-600"
            >
              Cancelar
            </button>

            <button
              onClick={handleSave}
              className="px-5 py-1.5 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Guardar cambios
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};
