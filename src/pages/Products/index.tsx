import { useEffect, useState } from "react";
import { IconDelete, IconEdit, IconMas, IconPencil, IconX } from "@utils/svg";
import Modal from "@components/Modal";
import { getProductsAll } from "@store/services/product";
import ProductCard from "./ProductCard";

export interface ICategory {
  id: string;
  created_at: string;
  description: {
    es: string;
  };
  name: {
    es: string;
  };
}

export interface IProduct {
  id: string;
  brand: string;
  created_at: string;
  canonical_url: string;
  name: {
    es: string;
  };
  categories: ICategory[];
  description: {
    es: string;
  };
  images: {
    id: string;
    src: string;
  }[];
  is_visible: boolean;
  variants: { price: string }[];
}

const Products = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);
  const [modalCanceled, setModalCanceled] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [categoryFilter, setCategoryFilter] = useState<ICategory | null>(null);

  const [products, setProducts] = useState<IProduct[]>([]);

  const getProducts = async () => {
    const products = await getProductsAll();
    setProducts(products);
    const categoriesResponse = getUniqueCategoryNames(products);
    setCategories(categoriesResponse);
  };

  useEffect(() => {
    getProducts();
    console.log(products);
  }, []);

  const getUniqueCategoryNames = (products: IProduct[]): ICategory[] => {
    const categoriesData = [] as ICategory[];

    products.forEach(product => {
      product.categories.forEach(category => {
        const include = categoriesData.find(
          existingCategory => existingCategory.id === category.id
        );
        if (!include) {
          categoriesData.push(category);
        }
      });
    });

    return categoriesData;
  };

  const info = [
    {
      title: "Auricular Bluetooth F9-5",
      points: "1200 Puntos",
      image: "/products/image_auricular.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "1300 Puntos",
      image: "/products/image_reloj.png",
    },
  ];

  return (
    <>
      <Modal
        isShown={modal}
        element={
          <div className="px-6 py-6 flex flex-col justify-center gap-5 w-[481px] h-[192px]">
            <div className="flex justify-between items-center">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea eliminar este producto?
              </p>
              <p className="cursor-pointer" onClick={() => setModal(false)}>
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px]">
              Si lo elimina no podrá recuperarlo más adelante.
            </p>
            <div className="flex gap-4">
              <button className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book">
                Eliminar
              </button>
              <button
                onClick={() => setModal(false)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={modalCreate}
        element={
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[668px]">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold">
                Editar producto
              </p>
              <p
                className="cursor-pointer"
                onClick={() => setModalCreate(false)}
              >
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-12">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                    <img
                      className="w-[84px] h-[84px]"
                      src="/products/image_default.png"
                    ></img>
                  </div>
                  <p className="flex gap-1 items-center pt-[18px] text-[14px] font-book text-argenpesos-textos">
                    <IconPencil />
                    Editar fotos
                  </p>

                  <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                    Incluye envío
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p>Si</p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p>No</p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                    Colores disponibles
                  </p>

                  <div className="w-[17px] h-[17px] rounded-full bg-argenpesos-skyBlue"></div>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label
                    className="text-argenpesos-textos font-bold text-[14px]"
                    htmlFor=""
                  >
                    Nombre del producto
                  </label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                  />

                  <label
                    className="text-argenpesos-textos font-bold text-[14px]"
                    htmlFor=""
                  >
                    Valor del producto (puntos)
                  </label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                  />

                  <label
                    className="text-argenpesos-textos font-bold text-[14px]"
                    htmlFor=""
                  >
                    Descripción
                  </label>

                  <textarea
                    className="w-[617px] h-[181px] text-[16px] font-book p-3 text-argenpesos-textos align-top border border-argenpesos-gray rounded-[5px] resize-none placeholder:text-argenpesos-textos"
                    placeholder="Cuerpo de texto"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setModalCanceled(true)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
              <button
                onClick={() => setModalCreate(false)}
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book hover:bg-argenpesos-blue hover:transition-colors duration-100"
              >
                Guardar
              </button>
            </div>
          </div>
        }
      ></Modal>

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
                  setModalCreate(false);
                  setModalCanceled(false);
                }}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Salir
              </button>
              <button
                onClick={() => {
                  setModalCanceled(false);
                }}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={modalEdit}
        element={
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[668px]">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold">
                Editar producto
              </p>
              <p className="cursor-pointer" onClick={() => setModalEdit(false)}>
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-12">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3">
                    <img
                      className="w-[185px] h-[185px] border-[1px] border-solid border-argenpesos-gray2 rounded-[15px]"
                      src={info[0].image}
                    ></img>
                  </div>
                  <div className="flex gap-1 mt-3 mb-5">
                    <p className="flex items-center gap-1 text-[14px] text-argenpesos-textos font-book cursor-pointer">
                      <IconPencil />
                      Editar fotos
                    </p>
                    <p className="flex items-center text-[14px] text-argenpesos-red font-book cursor-pointer">
                      <IconDelete className="w-[22px] h-[22px]" />
                      Eliminar
                    </p>
                  </div>

                  <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                    Incluye envío
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p>Si</p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p>No</p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <p className="pt-9 pb-4 text-[14px] font-bold text-argenpesos-textos">
                    Colores disponibles
                  </p>

                  <div className="w-[17px] h-[17px] rounded-full bg-argenpesos-skyBlue"></div>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label
                    className="text-[14px] font-bold text-argenpesos-textos"
                    htmlFor=""
                  >
                    Nombre del producto
                  </label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                    placeholder={info[0].title}
                  />

                  <label
                    className="text-[14px] font-bold text-argenpesos-textos"
                    htmlFor=""
                  >
                    Valor del producto (puntos)
                  </label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray"
                    type="text"
                    placeholder={info[0].points}
                  />

                  <label
                    className="text-[14px] font-bold text-argenpesos-textos"
                    htmlFor=""
                  >
                    Descripción
                  </label>
                  <textarea
                    className="w-[617px] h-[181px] text-[16px] font-book p-3 text-argenpesos-textos align-top border border-argenpesos-gray rounded-[5px] resize-none placeholder:text-argenpesos-textos"
                    placeholder="Cuerpo de texto"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-4 mt-10">
              <button
                onClick={() => setModalEdit(true)}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
              <button
                onClick={() => setModalEdit(false)}
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book hover:bg-argenpesos-blue hover:transition-colors duration-100"
              >
                Guardar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <div className="flex flex-col pl-16 pt-12 px-10 h-[100%] max-w-[clamp(1000px,77.2vw,1200px)]">
        <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
          Productos
        </p>

        <p className="text-[23px] font-bold text-argenpesos-textos mb-4">
          Canjeables por puntos
        </p>

        <div className="flex gap-7">
          {info.map((inf, key) => (
            <div
              className="max-w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray"
              key={key}
            >
              <div className="flex flex-col justify-between pt-5  pb-3 pl-4">
                <h4 className="w-[141px] text-[20px] font-book leading-[24px] text-argenpesos-textos">
                  {inf.title}
                </h4>
                <p className="text-argenpesos-red text-[20px] font-bold leading-[19px]">
                  {inf.points}
                </p>
              </div>
              <div className="h-full w-[150px] rounded-[13px] bg-[#F9F9F9] flex items-center relative">
                <img className="w-[150px] h-[150px]" src={inf.image} alt="" />
                <div className="absolute bottom-2 flex gap-2 left-14">
                  <IconEdit
                    className="cursor-pointer"
                    onClick={() => setModalEdit(true)}
                  />
                  <IconDelete
                    onClick={() => setModal(true)}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
          <div
            onClick={() => setModalCreate(true)}
            className="w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center cursor-pointer"
          >
            <IconMas />
          </div>
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
                getProducts={getProducts}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Products;
