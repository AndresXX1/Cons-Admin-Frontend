import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProductAsync } from "../../store/actions/product"; // Importa la acción
import { IconPencil, IconX } from "@utils/svg";
import Modal from "@components/Modal";
import { RootState, AppDispatch } from "../../store";
import { IProduct } from ".";

interface CreateProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  refreshProducts: (newProduct: IProduct) => void; // Recibe la función para actualizar la lista
  product?: any;
}

const CreateProductModal: React.FC<CreateProductModalProps> = ({
  closeModal,
  refreshProducts, // Recibe la función de actualización
  product,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalCanceled, setModalCanceled] = useState<boolean>(false);
  
  // Estados para el formulario
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.value || "");
  const [description, setDescription] = useState(product?.description || "");
  const [category, setCategory] = useState(product?.category || "ArgenCompras");
  const [includeShipping, setIncludeShipping] = useState(false);
  const [colors, setColors] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(product?.image || null);
  const [, setSuccess] = useState<boolean>(false);

  // Estados de carga y error
  const { loading, error } = useSelector((state: RootState) => ({
    loading: state.Product.loading,
    error: state.Product.error,
  }));

  const handleCancel = () => {
    setModalCanceled(true);
    closeModal();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };



  const handleSave = async () => {
    if (!name || !price || !description || !category) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }
  
    const productData = {
      name,
      description,
      value: Number(price),
      category,
      includesShipping: includeShipping,
      colors,
      image: image === null ? undefined : image,
    };
  
    try {
      // Dispatch para crear el producto
      const actionResult = await dispatch(createProductAsync(productData));
  
      // Extraemos el payload (el producto creado) de la acción
      const newProduct = actionResult.payload;  // Asegúrate de acceder al payload
  
      // Si el producto se creó correctamente, refresca la lista de productos
      if (newProduct) {
        refreshProducts(newProduct); // Actualiza la lista de productos
      }
  
      // Resetea el formulario y cierra el modal
      setName("");
      setPrice("");
      setDescription("");
      setCategory("ArgenCompras");
      setIncludeShipping(false);
      setColors([]);
      setImage(null);
      setSuccess(true);
      closeModal();
    } catch (error) {
      console.error("Error al crear el producto:", error);
    }
  };

  

  return (
    <>
      {/* Modal de cancelación */}
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
                onClick={() => setModalCanceled(false)}
              >
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
              Se descartarán los cambios que hayas realizado.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  closeModal(); // Cierra el modal principal
                  setModalCanceled(false); // Cierra el modal de cancelación
                }}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Salir
              </button>
              <button
                onClick={() => setModalCanceled(false)} // Solo cierra el modal de cancelación
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      ></Modal>

      {/* Modal de creación o edición de producto */}
      <div className="modal">
        <div className="modal-content">
          <div className="flex justify-between items-center">
            <p className="text-[32px] text-argenpesos-textos font-bold">
              {product ? "Editar producto" : "Crear producto"}
            </p>
            <p className="cursor-pointer" onClick={handleCancel}>
              <IconX />
            </p>
          </div>
          <div className="mt-5">
            <div className="flex gap-12">
              <div>
                <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                  <img
                    className="w-[170px] h-[170px]"
                    src={image || "/products/image_default.png"} // Mostrar la imagen seleccionada o por defecto
                  />
                </div>
                <p
                  className="flex gap-1 items-center pt-[18px] text-[14px] font-book text-argenpesos-textos cursor-pointer"
                  onClick={() => document.getElementById("image-upload")?.click()} // Hacemos clic en el input cuando el texto es presionado
                >
                  <IconPencil />
                  {product ? "Editar fotos" : "Añadir fotos"}
                </p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }} // Ocultamos el input de tipo archivo
                  onChange={handleImageChange}
                />
                <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                  Incluye envío
                </p>
                <div className="flex gap-5">
                  <div className="flex items-center gap-3 rounded-[4px]">
                    <p>Si</p>
                    <input
                      className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                      type="checkbox"
                      checked={includeShipping}
                      onChange={() => setIncludeShipping(!includeShipping)}
                    />
                  </div>
                  <div className="flex items-center gap-3 rounded-[4px]">
                    <p>No</p>
                    <input
                      className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                      type="checkbox"
                      checked={!includeShipping}
                      onChange={() => setIncludeShipping(!includeShipping)}
                    />
                  </div>
                </div>
                <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                  Colores disponibles
                </p>
                {/* Aquí podemos poner una lista de colores, pero no se enviarán al backend */}
                <div className="w-[17px] h-[17px] rounded-full bg-argenpesos-skyBlue"></div>
              </div>

              <div className="flex flex-col gap-4">
                <label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-name">
                  Nombre del producto
                </label>
                <input
                  id="product-name"
                  className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-price">
                  Valor del producto (puntos)
                </label>
                <input
                  id="product-price"
                  className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />

                <label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-category">
                  Categoría
                </label>
                <select
                  id="product-category"
                  className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="ArgenCompras">ArgenCompras</option>
                  <option value="Merch ArgenPesos">Merch ArgenPesos</option>
                  <option value="Experiencia">Experiencia</option>
                </select>

                <label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-description">
                  Descripción
                </label>
                <textarea
                  id="product-description"
                  className="w-[617px] h-[181px] text-[16px] font-book p-3 text-argenpesos-textos align-top border border-argenpesos-gray rounded-[5px] resize-none placeholder:text-argenpesos-textos"
                  placeholder="Cuerpo de texto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
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
              onClick={handleSave} // Llamamos a la función para guardar el producto
              className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book hover:bg-argenpesos-blue hover:transition-colors duration-100"
              disabled={loading} // Deshabilitamos el botón mientras está en carga
            >
              {loading ? "Guardando..." : "Guardar"}
            </button>
          </div>
          {error && <p className="text-red-500 text-center mt-4">{error}</p>} {/* Mostramos el error si hay */}
        </div>
      </div>
    </>
  );
};

export default CreateProductModal;


