import { useState, useEffect } from "react";
import {
  ArrowBlue,
  ArrowLeft,
  ArrowRight,
  IconFilter,
  IconMagnifyingGlass,
} from "@utils/svg";

import { getusers } from "../../store/services/users";
import CardUser from "./CardUser";
import { Address } from "@store/types/user";

export interface User {
  address: Address[];
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
  phone: string;
  last_login: string;
  birthday: string;
  create: string;
  cuponizate: boolean;
  points: number;
}

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 50;
  

  const getUsersList = async () => {
    const users = await getusers();
    setUsers(users);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      const sortedAndFilteredUsers = users
        .filter(user =>
          `${user.first_name} ${user.last_name} ${user.email}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        )
        .sort((a, b) => {
          const dateA = new Date(a.create);
          const dateB = new Date(b.create);
          return sortOrder === "asc"
            ? dateA.getTime() - dateB.getTime()
            : dateB.getTime() - dateA.getTime();
        });

      setFilteredUsers(sortedAndFilteredUsers);
    }
  }, [searchQuery, users, sortOrder]);

  const toggleSortOrder = () => {
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col pl-16 pt-12 px-10 max-w-[clamp(1000px,77.2vw,1200px)]">
      <div className="flex gap-2 mb-2">
        <p className="text-[3rem] text-argenpesos-textos font-bold">Usuarios</p>
        <p className="text-[40px] text-argenpesos-textos font-book mt-[6px]">
          {`(${filteredUsers.length})`}
        </p>
      </div>

      <div className="flex justify-between mb-8">
        <div className="relative flex">
          <input
            className="w-[457px] h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10 placeholder:text-argenpesos-textos font-book text-argenpesos-textos text-[15.36px]"
            type="search"
            placeholder="Buscar estadísticas o datos"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
          />
          <IconMagnifyingGlass className="absolute top-[18px] left-4" />
          <div className="flex w-[120px] h-[54px] ml-4 border-[1px] border-argenpesos-textos items-center justify-center gap-2 rounded-[13px]">
            <IconFilter />
            <p className="text-[15.36px] font-book text-argenpesos-textos">
              Filtros
            </p>
          </div>
        </div>
        <div className="flex gap-20 items-center">
          <p className="text-argenpesos-textos">
            {currentPage} - {totalPages} de {filteredUsers.length}
          </p>
          <div className="flex gap-10">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <ArrowLeft />
            </button>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              <ArrowRight />
            </button>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_140px_120px_140px_100px_1fr] gap-6 my-8">
        <p className="text-[1rem] text-argenpesos-textos font-bold">Usuario</p>
        <p className="text-[1rem] text-argenpesos-textos font-bold">
          Cuponizate
        </p>
        <p className="text-[1rem] text-argenpesos-textos font-bold">Status</p>
        <p className="text-[1rem] text-argenpesos-textos font-bold">Edad</p>
        <p className="text-[1rem] text-argenpesos-textos font-bold">Puntos</p>
        <div
          className="flex gap-2 items-center cursor-pointer"
          onClick={toggleSortOrder}
        >
          <p className="text-[1rem] text-argenpesos-textos font-bold">Creado</p>
          <ArrowBlue
            className={`transform transition-transform duration-200 ${
              sortOrder === "asc" ? "rotate-180" : ""
            }`}
          />
        </div>
      </div>
      <div>
        {currentUsers.map(user => (
          <CardUser key={user.id} user={user} getUsersList={getUsersList} onEdit={function (user: User): void {
            throw new Error("Function not implemented.");
          } } />
        ))}
      </div>
    </div>
  );
};

export default Users;
