import { useEffect, useState } from "react";
import { IconDelete, IconEdit, IconMas } from "@utils/svg";
import Modal from "@components/Modal";
import { getAllProductsService } from "../../store/services/productsPoint";
import ProductCard from "./ProductCard";
import CreateProductModal from "./CreateProductModal";
import EditProductModal from "./editProductModal";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import { getProductsAll } from "@store/services/product";
import { ReactNode } from 'react';



export interface ICategory {
  id: string;
  created_at: string;
  description: {
    es: string;
  };
  name: {
    es: string;
  };
  category:{
    es:ICategory
  }
}

export interface IProduct {
  category: ReactNode;
  id: string;
  brand: string;
  created_at: string;
  canonical_url: string;
  name: string;
  categories: ICategory[];
  description: string;
  image: string;
  status: string;
  value: string;
}

const Products = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<ICategory | null>(null);
  const [productToEdit, setProductToEdit] = useState<IProduct | null>(null);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [productsPoint, setProductsPoint] = useState<IProduct[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0); // Índice de los productos visibles

  const itemsPerPage = 2; // Mostrar 2 productos a la vez
  

  const getProducts = async () => {
    const products = await getAllProductsService(); // Productos canjeables por puntos
    console.log("Productos canjeables por puntos:", products); // Verifica los productos y sus id
    
    // Verifica que los id no sean nulos o incorrectos antes de almacenarlos
    products.forEach((product: { id: string; }) => {
      if (!product.id || product.id === "0") {
        console.warn(`Producto con id inválido encontrado: ${JSON.stringify(product)}`);
      }
    });
    
    setProductsPoint(products);
    if (products) {
      const categoriesResponse = getUniqueCategoryNames(products);
      setCategories(categoriesResponse); // Actualizamos las categorías
    }
  };
  
  const getAllProducts = async () => {
    const productsAll = await getProductsAll();  // Todos los productos
    if (productsAll) {
      setProducts(productsAll); // Guardamos todos los productos en el estado `products`
      const categoriesResponse = getUniqueCategoryNames(productsAll);
      setCategories(categoriesResponse); // Actualizamos las categorías
    }
  };

  useEffect(() => {
    getProducts(); // Obtén los productos canjeables por puntos
    getAllProducts(); // Obtén todos los productos
  }, []);  // Llamada inicial al cargar el componente

  useEffect(() => {
    loadProducts();
  }, []);

  

  const handleCreateProduct = () => {
    setModalCreate(true);
  };

  const handleSaveProduct = async (updatedProduct: IProduct): Promise<void> => {
    // Actualizar la lista de productos
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  
    // Actualizar los productos que se canjean por puntos (productsPoint)
    setProductsPoint((prevProductsPoint) =>
      prevProductsPoint.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  
    // O bien, puedes hacer una actualización más eficiente solo cuando sea necesario
    setModalEdit(false); // Cerrar el modal de edición
  };

  

  const handleEditProduct = (product: IProduct) => {
    setProductToEdit(product); // Establece el producto que se editará
    setModalEdit(true); // Abre el modal de edición
  };

  const handleDeleteProduct = async () => {
    if (productToEdit) {
      // Eliminar el producto de los estados
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productToEdit.id));
      setProductsPoint(prevProducts => prevProducts.filter(product => product.id !== productToEdit.id));

      // Cerrar el modal y restablecer el producto a editar
      setModal(false);
      setProductToEdit(null);
    }
    getAllProducts();
  };


  const getUniqueCategoryNames = (products: IProduct[]): ICategory[] => {
    const categoriesMap = new Map<string, ICategory>();
  
    products.forEach((product) => {
      if (product.categories && Array.isArray(product.categories)) {
        product.categories.forEach((category) => {
          if (!categoriesMap.has(category.id)) {
            categoriesMap.set(category.id, category);
          }
        });
      }
    });
  
    return Array.from(categoriesMap.values());
  };

  const handleNext = () => {
    if (currentIndex + itemsPerPage < productsPoint.length) {
      setCurrentIndex(currentIndex + itemsPerPage); // Avanzar al siguiente par de productos
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage); // Retroceder al par anterior de productos
    }
  };



  const loadProducts = async () => {
    const response = await getProductsAll();
    setProducts(response);
  };
  

  
  
  const handleCreateProductModalSave = (newProduct: IProduct) => {
    // Agregar el nuevo producto al estado
    setProducts((prevProducts) => [...prevProducts, newProduct]);
    setProductsPoint((prevProducts) => [...prevProducts, newProduct]);
  
    // Cerrar el modal de creación
    setModalCreate(false);
  };

  const currentProducts = productsPoint.slice(currentIndex, currentIndex + itemsPerPage);



  const MAX_TOTAL_LENGTH = 20;  // Limite total de caracteres
  const MAX_LINE_LENGTH = 10;   // Número de caracteres por línea
  
  const formatDescription = (description: string): string => {
    // Asegurarse de que la descripción no exceda de 20 caracteres
    const truncatedDescription = description.slice(0, MAX_TOTAL_LENGTH);
    
    // Crear un array de líneas de longitud 10
    const lines: string[] = [];
    for (let i = 0; i < truncatedDescription.length; i += MAX_LINE_LENGTH) {
      lines.push(truncatedDescription.slice(i, i + MAX_LINE_LENGTH));
    }
  
    // Si la descripción original es mayor que 20, agregar '...'
    if (description.length > MAX_TOTAL_LENGTH) {
      return lines.join('\n') + '...'; // Unir las líneas y agregar '...'
    }
  
    return lines.join('\n'); // Si no, simplemente devolver las líneas
  };

  const MAX_NAME_LENGTH = 9; // Limite de caracteres para el nombre

const truncateName = (name: string): string => {
  // Si el nombre tiene más de 9 caracteres, truncarlo y agregar '...'
  if (name.length > MAX_NAME_LENGTH) {
    return name.slice(0, MAX_NAME_LENGTH) + '...';
  }
  return name; // Si el nombre tiene 9 caracteres o menos, devolverlo tal cual
};

  return (
    <>
           {/* Modal de eliminación de producto */}
           <ConfirmDeleteModal
  isShown={modal}
  onClose={() => setModal(false)}
  productId={typeof productToEdit?.id === 'number' ? productToEdit.id : 0} // Usa productToEdit.id si es un número, o 0 si no
  onProductDeleted={handleDeleteProduct}
/>

     
     
      <div className="flex flex-col pl-16 pt-12 px-10 h-[100%] max-w-[clamp(1000px,77.2vw,1200px)]">
        <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
          Productos
        </p>

        <p className="text-[23px] font-bold text-argenpesos-textos mb-4">
          Canjeables por puntos
        </p>

        
        <div className="flex items-center gap-4">
          {/* Flecha a la izquierda */}
          <button
    onClick={handlePrev}
    className="p-3 bg-gray-200 text-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-[#A3D8F3] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#A3D8F3] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={currentIndex === 0}
  >
    ←
  </button>

  <div className="flex gap-7">
  {currentProducts.map((product, key) => (
    <div
      className="max-w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray"
      key={key}
    >
      <div className="flex flex-col justify-between pt-5 pb-3 pl-4">
        {/* Nombre del producto */}
        <h4 className="w-[141px] text-[22px] font-book leading-[28px] text-argenpesos-textos mb-1">
    {truncateName(product.name)}
  </h4>

        {/* Categoría del producto */}
        <h6 className="w-[141px] text-[18px] font-book leading-[22px] text-argenpesos-textos mb-1">
          {product.category}
        </h6>

        {/* Descripción del producto */}
        <h6
  className="w-[141px] text-[16px] font-book leading-[20px] text-argenpesos-textos mb-3"
  style={{ whiteSpace: 'pre-line' }}  // Respetar los saltos de línea
>
  {formatDescription(product.description)}
</h6>

        <div className="flex justify-between items-center">
          {/* Valor del producto */}
          <p className="text-argenpesos-red text-[18px] font-bold leading-[22px]">
          Puntos: {product.value} 
          </p>

          {/* Contenedor para los íconos de editar y eliminar */}
          <div className="flex gap-2 mt-[20px] ml-2">
            {/* Icono de editar */}
            <IconEdit
              className="cursor-pointer"
              onClick={() => handleEditProduct(product)} // Pasamos el producto a editar
            />
            {/* Icono de eliminar */}
            <IconDelete
  onClick={() => {
    setModal(true);
    setProductToEdit(product); // Asegúrate de establecer el producto a editar
  }}
  className="cursor-pointer"
/>
          </div>
        </div>
      </div>

      {/* Contenedor de la imagen con bordes redondeados y ajustada */}
      <div className="h-full w-[140px] rounded-[13px] bg-[#F9F9F9] flex items-center relative">
      <img
  src={`https://http://localhost:3000/${product.image}`}
  alt={product.name}
/>
      </div>
    </div>
  ))}
</div>

          {/* Flecha a la derecha */}
          <button
    onClick={handleNext}
    className="p-3 bg-gray-200 text-gray-800 rounded-full transition-all duration-300 transform hover:scale-110 hover:bg-[#A3D8F3] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#A3D8F3] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
    disabled={currentIndex + itemsPerPage >= productsPoint.length}
  >
    →
  </button>
        
  {/* Modal para editar el producto */}
  <Modal
  isShown={modalEdit}
  element={
    <div className="px-[54px] py-12 flex flex-col w-[969px] h-[668px]">
<EditProductModal
  isOpen={modalEdit}
  closeModal={() => setModalEdit(false)}
  product={productToEdit}
  saveProduct={handleSaveProduct}
/>
    </div>
  }
/>
            
 <div
  onClick={handleCreateProduct}
  className="w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center cursor-pointer"
>
  <IconMas />
</div>

<Modal
  isShown={modalCreate}
  element={
    <div className="px-[54px] py-12 flex flex-col w-[969px] h-[668px]">
<CreateProductModal
  isOpen={modalCreate}
  closeModal={() => setModalCreate(false)}
  refreshProducts={handleCreateProductModalSave} // Asegúrate de pasar la función de actualización aquí
  product={null} // Para crear un nuevo producto
/>
    </div>
  }
/>
        </div>

        <h4 className="text-[23px] font-bold text-argenpesos-textos pt-10 mb-5">
          Argencompras
        </h4>
        <input
          className="w-full rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-6 py-3"
          type="search"
          placeholder="Buscar estadísticas o datos"
        />

        <div className="flex justify-between items-end mt-10">
          <p
            onClick={() => setCategoryFilter(null)}
            className={`text-[1rem] font-book cursor-pointer transition-all hover:font-medium hover:text-argenpesos-black ${categoryFilter !== null ? "text-argenpesos-textos cursor-pointer" : "text-argenpesos-black font-medium"}`}
          >
            Todos
          </p>
          {categories.map((category: ICategory) => (
            <div key={category.id} className="max-w-[959px]">
              <p
                onClick={() => setCategoryFilter(category)}
                className={`text-[0.9rem] cursor-pointer font-book transition-all hover:font-medium hover:text-argenpesos-black ${
                  categoryFilter?.id !== category.id
                    ? "text-argenpesos-textos cursor-pointer"
                    : "text-argenpesos-black font-medium"
                }`}
              >
                {category.name.es}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 mt-5 mb-5">
          {products.map(product => {
            if (categoryFilter) {
              const include = product.categories.find(
                category => category.id === categoryFilter.id
              );
              if (!include) {
                return null;
              }
            }
            return (
              <ProductCard
                key={product.id}
                product={product}
                getProducts={getAllProducts}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;