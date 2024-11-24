import axios from 'axios';
import { apiUrls, tokenAccess } from '@config/config';

interface NewAddress {
  street: string;
  number: number;
  zipCode: string;
  city: string;
  province: string;
}

// Servicio para crear una nueva dirección
export const createAddressService = async (userId: number, newAddress: NewAddress) => {
  const token = localStorage.getItem(tokenAccess.tokenName);
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const response = await axios.post(
    apiUrls.createAddress(userId), // Ahora pasamos el userId a la URL
    newAddress, // El `newAddress` contiene la información de la dirección
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data; // Retornamos la respuesta que nos da la API
};

// Servicio para obtener las direcciones de un usuario
export const getUserAddressesService = async (userId: number) => {
  const token = localStorage.getItem(tokenAccess.tokenName);
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const response = await axios.get(apiUrls.getUserAddresses(userId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

// Servicio para editar una dirección
export const editAddressService = async (userId: number, index: number, updatedAddress: NewAddress) => {
  const token = localStorage.getItem(tokenAccess.tokenName);
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const response = await axios.put(
    apiUrls.editUserAddress(userId, index), // URL para editar la dirección (puedes ajustarla si es necesario)
    updatedAddress,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Servicio para eliminar una dirección
export const deleteAddressService = async (userId: number, index: number) => {
  const token = localStorage.getItem(tokenAccess.tokenName);
  if (!token) {
    throw new Error('No se encontró el token de autenticación');
  }

  const response = await axios.delete(apiUrls.deleteUserAddress(userId, index), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};
