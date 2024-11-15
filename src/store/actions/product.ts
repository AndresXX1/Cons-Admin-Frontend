import { createAsyncThunk } from "@reduxjs/toolkit";
import { createProductService, getAllProductsService,updateProductService } from "../services/productsPoint";

// Acción para crear un producto
export const createProductAsync = createAsyncThunk(
    "product/createProductAsync",
    async (productData: {
      name: string;
      description: string;
      value: number;
      image?: string | null;
      includesShipping: boolean;
      colors: string[];
    }, { rejectWithValue }) => {
      const safeProductData = productData.image === null ? { ...productData, image: undefined } : productData;
      try {
        const product = await createProductService(safeProductData);
        if (product) {
          return product;
        } else {
          return rejectWithValue("Error al crear el producto");
        }
      } catch (error) {
        return rejectWithValue("Error inesperado");
      }
    },
  );


  export const getAllProductsAsync = createAsyncThunk(
    "product/getAllProductsAsync",
    async (_, { rejectWithValue }) => {
      try {
        const products = await getAllProductsService();
        if (products) {
          return products;
        } else {
          return rejectWithValue("Error al obtener los productos");
        }
      } catch (error) {
        return rejectWithValue("Error inesperado al obtener los productos");
      }
    }
  );

// Acción para actualizar un producto
export const updateProductAsync = createAsyncThunk(
  "product/updateProductAsync",
  async ({ id, productData }: { id: number, productData: any }, { rejectWithValue }) => {
    try {
      const updatedProduct = await updateProductService(id, productData);
      if (updatedProduct) {
        return updatedProduct;
      } else {
        return rejectWithValue("Error al actualizar el producto");
      }
    } catch (error) {
      return rejectWithValue("Error inesperado");
    }
  }
);
  