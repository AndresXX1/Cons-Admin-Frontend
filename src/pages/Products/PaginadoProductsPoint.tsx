import React, { useState } from "react";
import { IProduct } from "./index"; // Importa el tipo IProduct

interface PaginadoProductsPointProps {
    products: IProduct[];
    itemsPerPage: number;
    totalItems: number;
    paginate: (pageNumber: number) => void;
  }

  const PaginadoProductsPoint: React.FC<PaginadoProductsPointProps> = ({ products, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Lógica para calcular el rango de productos que se mostrarán
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Función para cambiar de página


  // Número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className="max-w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray"
          >
            <div className="flex flex-col justify-between pt-5 pb-3 pl-4">
              <h4 className="w-[141px] text-[20px] font-book leading-[24px] text-argenpesos-textos">
                {product.name}
              </h4>
              <div className="flex justify-between items-center">
                <p className="text-argenpesos-red text-[20px] font-bold leading-[19px]">
                  {product.value} Puntos
                </p>
                {/* Contenedor para los íconos de editar y eliminar */}
                <div className="flex gap-2">
                  {/* Aquí irían los íconos de editar y eliminar si los necesitas */}
                </div>
              </div>
            </div>
            <div className="h-full w-[150px] rounded-[13px] bg-[#F9F9F9] flex items-center relative">
              <img className="w-[150px] h-[150px]" src={product.image} alt={product.name} />
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-4">
        <ul className="flex gap-2">
          {pageNumbers.map((number) => (
            <li
              key={number}
              className={`cursor-pointer ${currentPage === number ? "font-bold text-argenpesos-red" : ""}`}
              onClick={() => handlePageChange(number)}
            >
              {number}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PaginadoProductsPoint;
