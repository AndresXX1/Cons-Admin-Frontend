import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { updateProductAsync } from "../../store/actions/product";
import { IconPencil, IconX } from "@utils/svg";
import Modal from "@components/Modal";

interface EditProductModalProps {
  isOpen: boolean;
  closeModal: () => void;
  product: any;
  saveProduct: (updatedProduct: any) => void; // Recibimos saveProduct como prop
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  closeModal,
  product,
  saveProduct, // Desestructuramos saveProduct de las props
}) => {
  const dispatch = useDispatch<AppDispatch>(); // Tipamos dispatch con AppDispatch

  if (!isOpen) return null;

  const [productName, setProductName] = useState<string>(product?.name || "");
  const [productPrice, setProductPrice] = useState<string>(product?.value || "");
  const [productDescription, setProductDescription] = useState<string>(product?.description || "");
  const [category, setCategory] = useState<string>(product?.category || "ArgenCompras");
  const [includeShipping, setIncludeShipping] = useState<boolean>(product?.includesShipping || false);
  const [image, setImage] = useState<string | null>(product?.image || null);
  const [modalCanceled, setModalCanceled] = useState<boolean>(false);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Previsualiza la imagen localmente
    }
  };

  const handleShippingChange = () => {
    setIncludeShipping(!includeShipping);
  };

  const handleSave = async () => {
    const updatedProduct = {
      id: product.id, // No olvides pasar el ID del producto
      name: productName,
      value: parseFloat(productPrice),
      description: productDescription,
      category,
      includeShipping,
      image: image === null ? undefined : image,
    };
  
    try {
      // Llamamos a la acción para actualizar el producto en la base de datos o servidor
      await dispatch(updateProductAsync({ id: product.id, productData: updatedProduct }));
  
      // Llamamos a la función saveProduct que actualizará el producto en el estado de los productos
      saveProduct(updatedProduct);
  
      // Cerramos el modal después de guardar
      closeModal();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductPrice(product.value.toString());
      setProductDescription(product.description);
      setCategory(product.category || "ArgenCompras");
      setIncludeShipping(product.includesShipping || false);
      setImage(product.image || null);
    }
  }, [product]);

  const handleCancel = () => {
    setModalCanceled(true);
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
              <p className="cursor-pointer" onClick={() => setModalCanceled(false)}>
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
              Se descartarán los cambios que hayas realizado.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  closeModal();
                  setModalCanceled(false);
                }}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Salir
              </button>
              <button
                onClick={() => setModalCanceled(false)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      ></Modal>

      {/* Modal de edición */}
      <div className="modal">
        <div className="modal-content">
          <div className="flex justify-between items-center">
            <p className="text-[32px] text-argenpesos-textos font-bold">Editar producto</p>
            <p className="cursor-pointer" onClick={handleCancel}>
              <IconX />
            </p>
          </div>
          <div className="mt-5">
            <div className="flex gap-12">
              {/* Imagen */}
              <div>
                <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                  <img
                    className="w-[170px] h-[170px]"
                    src={image || "/products/image_default.png"}
                    alt="Imagen del producto"
                  />
                </div>
                <p
                  className="flex gap-1 items-center pt-[18px] text-[14px] font-book text-argenpesos-textos cursor-pointer"
                  onClick={() => document.getElementById("image-upload")?.click()}
                >
                  <IconPencil />
                  Editar fotos
                </p>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>

              {/* Formulario de edición */}
              <div className="flex flex-col gap-4">
                <label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-name">
                  Nombre del producto
                </label>
                <input
                  id="product-name"
                  className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                  type="text"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                />

                <label className="text-argenpesos-textos font-bold text-[14px]" htmlFor="product-price">
                  Valor del producto (puntos)
                </label>
                <input
                  id="product-price"
                  className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                  type="number"
                  value={productPrice}
                  onChange={(e) => setProductPrice(e.target.value)}
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
                  className="w-[617px] h-[181px] text-[16px] font-book p-3 text-argenpesos-textos align-top border border-argenpesos-gray rounded-[5px] resize-none placeholder:text-argenpesos-gray"
                  value={productDescription}
                  onChange={(e) => setProductDescription(e.target.value)}
                  placeholder="Descripción"
                />

                <div className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={includeShipping}
                    onChange={handleShippingChange}
                  />
                  <span className="text-argenpesos-textos font-bold text-[14px]">
                    Incluir envío
                  </span>
                </div>

                <div className="flex gap-4 mt-8">
                  <button
                    onClick={handleSave}
                    className="bg-argenpesos-red w-[150px] h-[50px] rounded-[5px] text-argenpesos-white text-[16px] font-book"
                  >
                    Guardar cambios
                  </button>
                  <button
                    onClick={closeModal}
                    className="border-[1px] border-solid border-argenpesos-gray w-[150px] h-[50px] rounded-[5px] text-argenpesos-gray text-[16px] font-book"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditProductModal;
