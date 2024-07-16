import {
  ArrowBlue,
  ArrowLeft,
  ArrowRight,
  IconFilter,
  ThreePoints,
} from "@utils/svg";

const Users = () => {
  const info = [
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      smarter: "67%",
      status: "Activo",
      age: "32",
      points: "12.500",
      date: "25/04/22",
    },
  ];
  return (
    <div className="flex flex-col pl-16 pt-12 px-10">
      <div className="flex gap-2 mb-8">
        <p className="text-[3rem] text-argenpesos-textos font-bold">Usuarios</p>
        <p className="text-[40px] text-argenpesos-textos font-normal mt-[6px]">
          (127)
        </p>
      </div>

      <div className="flex">
        <input
          className="w-[477px] h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10"
          type="search"
          placeholder="Buscar estadísticas o datos"
        />
        <div className="flex w-[120px] h-[54px] ml-4 border-[1px] border-argenpesos-textos flex- items-center justify-center gap-2 rounded-[13px]">
          <IconFilter />
          <p>Filtros</p>
        </div>
        <div className="flex justify-between gap-32 items-center">
          <p className="pl-40">1 - 50 de 2000</p>
          <div className="flex gap-10">
            <ArrowLeft />
            <ArrowRight />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-6 gap-5 my-8">
        <p className="text-[1rem] text-argenpesos-textos font-bold">
          Nombre de usuario
        </p>
        <p className="text-[1rem] text-argenpesos-textos font-bold ml-5">
          % Smarter
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
        {info.map((inf, key) => (
          <div
            className="grid grid-cols-6 gap-5 relative items-center"
            key={key}
          >
            <div className="flex items-center gap-1">
              <img className="w-[50px] h-[50px]" src={inf.img} alt={inf.name} />
              <p className="text-[1rem] text-argenpesos-textos font-normal">
                {inf.name}
              </p>
            </div>
            <p className="text-[1rem] text-argenpesos-textos font-normal ml-12">
              {inf.smarter}
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.status}
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.age}
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.points}
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.date}
            </p>
            <div className="absolute right-0 top-3">
              <ThreePoints />
            </div>
            <div className="w-[100%] h-[1px] bg-argenpesos-gray mt-5 col-span-6 mb-10"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
