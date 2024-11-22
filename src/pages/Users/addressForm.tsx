import React from 'react';

// Definición de la interfaz para la dirección
interface Address {
  street: string;
  number: number;
  zipCode: string;
  city: string;
  province: string;
}

// Propiedades que recibe el componente
interface AddressFormProps {
  addresses: Address[];
  onAddressChange: (index: number, field: keyof Address, value: string | number) => void;
  onAddAddress: () => void;
  onDeleteAddress: (index: number) => void;  // Función para eliminar la dirección
  onSave?: () => void;
  onCancel?: () => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  addresses,
  onAddressChange,
  onAddAddress,
  onDeleteAddress,
  onSave,
  onCancel,
}) => {
  return (
    <div className="space-y-4 max-w-4xl mx-auto p-6"> {/* Añadido padding y centrado con mx-auto */}
      {/* Título del modal */}
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Editar Direcciones</h2>

      {addresses.map((address, index) => (
        <div key={index} className="space-y-4 border-b border-gray-300 pb-4">
          {/* Dirección y número */}
          <div className="grid grid-cols-2 gap-x-4 ml-10"> {/* Desplazamos los inputs al centro con ml-10 */}
            <div>
              <label className="block text-sm text-gray-700 mb-0.5">Dirección</label>
              <input
                type="text"
                value={address.street} // Valor inicial de la dirección
                onChange={(e) => onAddressChange(index, 'street', e.target.value)} // Actualiza la dirección cuando el campo cambia
                className="w-full h-[26px] px-3 border rounded-md mb-4" // Aumento de padding y margen inferior
                placeholder="Ejemplo: Calle Falsa 123"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-0.5">Número</label>
              <input
                type="number"
                value={address.number} // Valor inicial del número
                onChange={(e) => onAddressChange(index, 'number', Number(e.target.value))} // Actualiza el número cuando cambia
                className="w-full h-[26px] px-3 border rounded-md mb-4" // Aumento de padding y margen inferior
              />
            </div>
          </div>

          {/* Código Postal y Ciudad */}
          <div className="grid grid-cols-2 gap-x-4 ml-10"> {/* Desplazamos los inputs al centro con ml-10 */}
            <div>
              <label className="block text-sm text-gray-700 mb-0.5">Código Postal</label>
              <input
                type="text"
                value={address.zipCode} // Valor inicial del código postal
                onChange={(e) => onAddressChange(index, 'zipCode', e.target.value)} // Actualiza el código postal cuando cambia
                className="w-full h-[26px] px-3 border rounded-md mb-4" // Aumento de padding y margen inferior
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-0.5">Ciudad</label>
              <input
                type="text"
                value={address.city} // Valor inicial de la ciudad
                onChange={(e) => onAddressChange(index, 'city', e.target.value)} // Actualiza la ciudad cuando cambia
                className="w-full h-[26px] px-3 border rounded-md mb-4" // Aumento de padding y margen inferior
              />
            </div>
          </div>

          {/* Provincia */}
          <div className="grid grid-cols-3 gap-x-4 ml-10"> {/* Desplazamos los inputs al centro con ml-10 */}
            <div className="col-span-3">
              <label className="block text-sm text-gray-700 mb-0.5">Provincia</label>
              <input
                type="text"
                value={address.province} // Valor inicial de la provincia
                onChange={(e) => onAddressChange(index, 'province', e.target.value)} // Actualiza la provincia cuando cambia
                className="w-full h-[26px] px-3 border rounded-md mb-4" // Aumento de padding y margen inferior
              />
            </div>
          </div>

          {/* Botón para eliminar la dirección, solo si no es la primera dirección */}
          {index !== 0 && (
            <div className="text-right">
              <button
                onClick={() => onDeleteAddress(index)}
                className="text-red-500 text-sm"
              >
                Eliminar Dirección
              </button>
            </div>
          )}
        </div>
      ))}

      {/* Botón para agregar nuevas direcciones solo si hay menos de 3 */}
      {addresses.length < 3 && (
        <div className="text-center">
          <button
            onClick={onAddAddress}
            className="py-2 px-4 bg-argenpesos-blue text-white rounded-full"
          >
            Agregar Dirección
          </button>
        </div>
      )}

      {/* Botones de acción (Guardar, Cancelar) */}
      <div className="flex justify-between mt-5">
        <button
          onClick={onCancel}
          className="px-5 py-1.5 text-white bg-gray-500 rounded-md hover:bg-gray-600"
        >
          Cancelar
        </button>
        <button
          onClick={onSave}
          className="px-5 py-1.5 text-white bg-blue-600 rounded-md hover:bg-blue-700"
        >
          Guardar
        </button>
      </div>
    </div>
  );
};

export default AddressForm;
