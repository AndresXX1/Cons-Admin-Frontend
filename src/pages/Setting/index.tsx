import { IconDelete } from "@utils/svg";

const Setting = () => {
  const info = [
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      email: "maruubc00@gmail.com",
    },
    {
      img: "/image_user.png",
      name: "Maria Becerra",
      email: "maruubc00@gmail.com",
    },
  ];
  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%] w-full">
      <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
        Configuración
      </p>

      <h4 className="text-[23px] font-bold text-argenpesos-textos mb-5">
        Permisos de administrador
      </h4>

      <div className="flex justify-between gap-5 my-8 max-w-[950px]">
        <p className="text-[1rem] text-argenpesos-textos font-bold">Nombre</p>

        <p className="text-[1rem] text-argenpesos-textos font-bold">Email</p>
        <p className="text-[1rem] text-argenpesos-textos font-bold"></p>
      </div>
      {info.map((inf, key) => (
        <div>
          <div className="flex justify-between pr-20 items-center" key={key}>
            <div className="flex items-center gap-1">
              <img className="w-[50px] h-[50px]" src={inf.img} alt={inf.name} />
              <p className="text-[1rem] text-argenpesos-textos font-normal">
                {inf.name}
              </p>
            </div>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {inf.email}
            </p>
            <div className="flex justify-center items-center gap-1">
              <IconDelete />
              <p className="text-[1rem] font-normal text-argenpesos-red">
                Eliminar
              </p>
            </div>
          </div>
          <div className="w-[100%] h-[1px] bg-argenpesos-gray2 mt-7 col-span-6 mb-7"></div>
        </div>
      ))}
      <div className="mb-10">
        <h4 className="text-[23px] font-bold text-argenpesos-textos mb-5 mt-8">
          Información de tu cuenta
        </h4>

        <p className="text-[14px] text-argenpesos-textos font-bold">
          Nombre y Apellido
        </p>
        <input
          className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px]"
          type="text"
          placeholder="Felix Bilbao"
        />
        <p className="text-[14px] text-argenpesos-textos font-bold">Mail</p>
        <input
          className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px]"
          type="email"
          placeholder="felixbilbao01@gmail.com"
        />
        <p className="text-[14px] text-argenpesos-textos font-bold">
          Contraseña
        </p>
        <input
          className="min-w-[438px] max-w-[438px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray mt-[11px]"
          type="password"
          placeholder="*******************"
        />

        <div className="flex gap-5 mt-10 mb-14">
          <button className="flex w-[147px] h-[38px] items-center justify-center bg-argenpesos-skyBlue text-[1rem] text-argenpesos-white font-normal rounded-[5px]">
            Editar cuenta
          </button>
          <button className="flex w-[147px] border-[1px] border-argenpesos-red h-[38px] items-center justify-center text-[1rem] text-argenpesos-red font-normal rounded-[5px]">
            Eliminar cuenta
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
