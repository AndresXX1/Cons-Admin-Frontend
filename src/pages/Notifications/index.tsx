import { IconNotification, ArrowBlue, ThreePoints } from "@utils/svg";

const Notifications = () => {
  const info = [
    {
      name: "Black Friday!",
      date: "29/11/24",
      age: "Hora",
      imagen: "Si",
      app: "Si",
      push: "No",
    },
    {
      name: "Black Friday!",
      date: "29/11/24",
      age: "Hora",
      imagen: "No",
      app: "Si",
      push: "Si",
    },
    {
      name: "Black Friday!",
      date: "29/11/24",
      age: "Hora",
      imagen: "Si",
      app: "No",
      push: "Si",
    },
  ];
  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%] w-full">
      <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
        Notificaciones
      </p>

      <div className="flex gap-6">
        <input
          className="w-[65%] h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10"
          type="search"
          placeholder="Buscar estadísticas o datos"
        />
        <button className="w-[20%] h-[54px] bg-argenpesos-skyBlue rounded-[13px] flex items-center justify-center text-argenpesos-white gap-1">
          <IconNotification />
          Nueva notificación
        </button>
      </div>
      <h4 className="text-[23px] font-bold text-argenpesos-textos pt-10 mb-5">
        Próximas notificaciones
      </h4>

      <div className="grid grid-cols-6 gap-5 my-8">
        <p className="text-[1rem] text-argenpesos-textos font-bold">Nombre</p>
        <div className="flex gap-2 items-center">
          <p className="text-[1rem] text-argenpesos-textos font-bold">Fecha</p>
          <ArrowBlue />
        </div>
        <p className="text-[1rem] text-argenpesos-textos font-bold">Hora</p>
        <p className="text-[1rem] text-argenpesos-textos font-bold">Imagen</p>
        <p className="text-[1rem] text-argenpesos-textos font-bold">In-App</p>

        <p className="text-[1rem] text-argenpesos-textos font-bold">Push</p>
      </div>
      <div>
        {info.map((inf, key) => (
          <div
            className="grid grid-cols-6 gap-5 relative items-center ml-1"
            key={key}
          >
            <div className="flex items-center gap-1">
              <p className="text-[1rem] text-argenpesos-textos font-normal">
                {inf.name}
              </p>
            </div>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.date}
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.age}
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.imagen}
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.app}
            </p>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.push}
            </p>
            <div className="absolute right-5 top-3">
              <ThreePoints />
            </div>
            <div className="w-[100%] h-[1px] bg-argenpesos-gray mt-5 col-span-6 mb-10"></div>
          </div>
        ))}

        <h4 className="text-[23px] font-bold text-argenpesos-textos mt-5 mb-10">
          Historial de notificaciones
        </h4>
        <div>
          {info.map((inf, key) => (
            <div
              className="grid grid-cols-6 gap-5 relative items-center ml-1"
              key={key}
            >
              <div className="flex items-center gap-1">
                <p className="text-[1rem] text-argenpesos-textos font-normal">
                  {inf.name}
                </p>
              </div>
              <p className="text-[1rem] text-argenpesos-textos font-normal">
                {inf.date}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-normal">
                {inf.age}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-normal">
                {inf.imagen}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-normal">
                {inf.app}
              </p>
              <p className="text-[1rem] text-argenpesos-textos font-normal">
                {inf.push}
              </p>
              <div className="absolute right-5 top-3">
                <ThreePoints />
              </div>
              <div className="w-[100%] h-[1px] bg-argenpesos-gray mt-5 col-span-6 mb-10"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
