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
  const [errors, setErrors] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

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
    let formIsValid = true;
    const newErrors: { name: string; price: string; description: string; category: string; image: string } = { // Declarar explícitamente las propiedades
      name: "",
      price: "",
      description: "",
      category: "",
      image: "",
    };
  
    // Validación de campos
    if (!name) {
      formIsValid = false;
      newErrors.name = "El nombre es obligatorio.";
    }
    if (!price) {
      formIsValid = false;
      newErrors.price = "El valor es obligatorio.";
    }
    if (!description) {
      formIsValid = false;
      newErrors.description = "La descripción es obligatoria.";
    }
    if (!category) {
      formIsValid = false;
      newErrors.category = "La categoría es obligatoria.";
    }
    if (!image) {  // Validación de la imagen
      formIsValid = false;
      newErrors.image = "La imagen es obligatoria.";  // Error para la imagen
    }
  
    // Si hay errores, actualizamos el estado de errores
    setErrors(newErrors);
  
    // Si el formulario no es válido, no se realiza el guardado
    if (!formIsValid) {
      return;
    }
  
    // Si pasa la validación, continúa con la creación del producto
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
      const actionResult = await dispatch(createProductAsync(productData));
      const newProduct = actionResult.payload;
  
      if (newProduct) {
        refreshProducts(newProduct);
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

          {/* Mostrar el error de la imagen si no se ha seleccionado */}
          {errors.image && (
            <p className="text-red-500 text-sm mt-2">{errors.image}</p> // Estilos para el mensaje de error
          )}
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
  className={`w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid ${errors.name ? 'border-red-500' : 'border-argenpesos-gray'}`}
  type="text"
  value={name}
  onChange={(e) => setName(e.target.value)}
/>
{errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

<label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-price">
  Valor del producto (puntos)
</label>
<input
  id="product-price"
  className={`w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid ${errors.price ? 'border-red-500' : 'border-argenpesos-gray'}`}
  type="number"
  value={price}
  onChange={(e) => setPrice(e.target.value)}
/>
{errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}

<label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-category">
  Categoría
</label>
<select
  id="product-category"
  className={`w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid ${errors.category ? 'border-red-500' : 'border-argenpesos-gray'}`}
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="ArgenCompras">ArgenCompras</option>
  <option value="Merch ArgenPesos">Merch ArgenPesos</option>
  <option value="Experiencia">Experiencia</option>
</select>
{errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}

<label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-description">
  Descripción
</label>
<textarea
  id="product-description"
  className={`w-[617px] h-[181px] text-[16px] font-book p-3 text-argenpesos-textos align-top border ${errors.description ? 'border-red-500' : 'border-argenpesos-gray'} rounded-[5px] resize-none placeholder:text-argenpesos-textos`}
  placeholder="Cuerpo de texto"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
/>
{errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
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


