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

export interface User {
  id: number;
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

  const getUsersList = async () => {
    const users = await getusers();
    setUsers(users);
  };

  useEffect(() => {
    getUsersList();
  }, []);

  return (
    <div className="flex flex-col pl-16 pt-12 px-10 max-w-[clamp(1000px,77.2vw,1200px)]">
      <div className="flex gap-2 mb-2">
        <p className="text-[3rem] text-argenpesos-textos font-bold">Usuarios</p>
        <p className="text-[40px] text-argenpesos-textos font-book mt-[6px]">
          {`(${users.length})`}
        </p>
      </div>

      <div className="flex justify-between mb-8">
        <div className="relative flex">
          <input
            className="w-[457px] h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10 placeholder:text-argenpesos-textos font-book text-argenpesos-textos text-[15.36px]"
            type="search"
            placeholder="Buscar estadísticas o datos"
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
          <p className="text-argenpesos-textos">1 - 50 de {users.length}</p>
          <div className="flex gap-10">
            <ArrowLeft />
            <ArrowRight />
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
        <div className="flex gap-2 items-center">
          <p className="text-[1rem] text-argenpesos-textos font-bold">Creado</p>
          <ArrowBlue />
        </div>
      </div>
      <div>
        {users.map(user => {
          return (
            <CardUser key={user.id} user={user} getUsersList={getUsersList} />
          );
        })}
      </div>
    </div>
  );
};

export default Users;
