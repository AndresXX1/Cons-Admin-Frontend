import { createSlice } from "@reduxjs/toolkit";
import { updateProductAsync, createProductAsync, getAllProductsAsync } from "../actions/product"; // Importamos las acciones
import { Product } from "../types/product"; // Importamos la interfaz de tipo Product

// Estado inicial con el tipo correcto para 'products' y 'product'
const initialState = {
  loading: false,
  products: [] as Product[], // Definimos que 'products' es un array de 'Product'
  product: null as Product | null, // 'product' puede ser un objeto Product o null
  error: null as string | null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Acción de crear producto
      .addCase(createProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(createProductAsync.rejected, (state) => {
        state.loading = false;
      })

      // Acción para obtener todos los productos
      .addCase(getAllProductsAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProductsAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(getAllProductsAsync.rejected, (state) => {
        state.loading = false;
      })

      // Acción para actualizar un producto
      .addCase(updateProductAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.loading = false;
        const updatedProduct: Product = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
    })
      .addCase(updateProductAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default productSlice.reducer;
