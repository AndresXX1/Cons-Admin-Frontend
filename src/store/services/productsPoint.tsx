import { apiUrls } from "@config/config";
import { axiosInstance } from "@store/actions/auth";
import { alertError, alertConfirm } from "@utils/alerts";

// Función para crear un producto
export const createProductService = async (productData: {
    name: string;
    description: string;
    value: number;
    image?: string | null;
    includesShipping: boolean;
    colors: string[];
  }) => {
    try {
        const response = await axiosInstance.post(apiUrls.createProduct() as string, productData);
      if (response.data.ok) {
        alertConfirm("Producto creado correctamente");
        return response.data.product; // Devuelve el producto creado
      } else {
        alertError("Error al crear el producto");
        return null;
      }
    } catch (error) {
      alertError("Error al crear el producto");
      return null;
    }
  };


  // Función para obtener todos los productos
const getAllProductsService = async () => {
    try {
      const response = await axiosInstance.get(apiUrls.allProducts()); // Llamamos a la API para obtener todos los productos
      if (response.data.ok) {
        return response.data.products; // Retornamos la lista de productos si la respuesta es correcta
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      return null; // En caso de error, retornamos null
    }
  };


// Función para actualizar un producto
export const updateProductService = async (id: number, productData: {
  name: string;
  description: string;
  value: number;
  image?: string | null;
  includesShipping: boolean;
}) => {
  try {
    const response = await axiosInstance.put(apiUrls.updateProduct(id), productData);
    if (response.data.ok) {
      alertConfirm("Producto actualizado correctamente");
      return response.data.product; // Devuelve el producto actualizado
    } else {
      alertError("Error al actualizar el producto");
      return null;
    }
  } catch (error) {
    alertError("Error al actualizar el producto");
    return null;
  }
};


  export {getAllProductsService}

