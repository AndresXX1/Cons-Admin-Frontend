import { useState, useEffect } from "react";
import AdminCard from "./AdminCard";
import { getAllAdmins } from "@store/services/admin";
import DataAdmin from "./DataAdmin";
import CreateAdmin from "./CreateAdmin";

export interface IAdmin {
  id: string;
  avatar: string;
  full_name: string;
  email: string;
  role: string;
}

const Setting = () => {
  const [admins, setAdmins] = useState<IAdmin[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 5; 

  const fetchAdmins = async () => {
    const response = await getAllAdmins();
    setAdmins(response);
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage; 
  const currentAdmins = admins.slice(indexOfFirstAdmin, indexOfLastAdmin); 

  // Funciones para manejar la paginación
  const totalPages = Math.ceil(admins.length / adminsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <>
      <div className="flex flex-col pl-16 pt-12 px-10 h-[100%] w-[1100px]">
        <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
          Configuración
        </p>
        <CreateAdmin fetchAdmins={fetchAdmins} />

        {admins.length !== 0 && (
          <div className="flex justify-between gap-5 my-8 max-w-[950px]">
            <p className="text-[1rem] text-argenpesos-textos font-bold">
              Nombre
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-bold">
              Email
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-bold"></p>
          </div>
        )}

        {currentAdmins.map(admin => (
          <AdminCard key={admin.id} admin={admin} fetchAdmins={fetchAdmins} />
        ))}

        <div className="flex justify-between mt-4">
          <button
            onClick={prevPage}
            disabled={currentPage === 1 || admins.length === 0} // Deshabilitar si no hay admins
            className={`flex w-[147px] h-[38px] items-center justify-center bg-argenpesos-skyBlue text-[1rem] text-argenpesos-white font-book rounded-[5px] hover:bg-argenpesos-blue hover:transition-colors duration-100 ${
              currentPage === 1 || admins.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Anterior
          </button>
          <span className="text-[1rem] text-argenpesos-textos font-bold">
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`flex w-[147px] h-[38px] items-center justify-center bg-argenpesos-skyBlue text-[1rem] text-argenpesos-white font-book rounded-[5px] hover:bg-argenpesos-blue hover:transition-colors duration-100 ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Siguiente
          </button>
        </div>

        <DataAdmin />
      </div>
    </>
  );
};

export default Setting;
