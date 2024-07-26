import {
  ArrowLeft,
  IconArrows,
  IconBuy,
  IconDollar,
  IconDownload,
  IconIncrease,
  IconLower,
  IconMagnifyingGlass,
  IconScreen,
  IconStarts,
  Iconstatistics,
  IconSuscriber,
  IconTime,
  IconUser,
  IconUserMore,
} from "@utils/svg";

type Props = {
  state: boolean;
  text?: string;
};

const Home = () => {
  const IconSelector: React.FC<Props> = ({ state }) => {
    return state ? <IconIncrease /> : <IconLower />;
  };
  const ColorfulText: React.FC<Props> = ({ state, text }) => {
    return (
      <p
        className="text-[22px] font-book"
        style={{ color: state ? "#05B922" : "#ED1A00" }}
      >
        {text}
      </p>
    );
  };

  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <p className="text-[46.08px] text-argenpesos-textos font-bold">
        Hola <span className="text-argenpesos-skyBlue">Félix</span>
      </p>
      <p className="text-[19.2px] text-argenpesos-gray font-book">
        ¡Bienvenido de vuelta!
      </p>

      <div className="flex gap-5 pt-5">
        <div className="relative">
          <input
            className="w-[457px] h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10 placeholder:text-argenpesos-textos font-book text-argenpesos-textos text-[15.36px]"
            type="search"
            placeholder="Buscar estadísticas o datos"
          />
          <IconMagnifyingGlass className="absolute top-[18px] left-4" />
        </div>
        <div className="flex w-[127px] h-[54px] ml-4 border-[1px] border-argenpesos-textos flex- items-center justify-center gap-2 rounded-[13px]">
          <p className="text-[15.36px] font-book text-argenpesos-textos">
            Semanal
          </p>
          <ArrowLeft className="w-[7px] h-[20px] rotate-[270deg]" />
        </div>
        <button className="flex gap-2 w-[291px] h-[54px] items-center justify-center bg-argenpesos-skyBlue text-[1rem] text-argenpesos-white font-book rounded-[13px]">
          <IconDownload />
          Descargar planillla
        </button>
      </div>
      <p className="flex items-center gap-[6px] pt-5 text-argenpesos-gray text-[15.36px] font-book">
        {" "}
        <div className="w-[10.56px] h-[10.56px] bg-argenpesos-green rounded-full bg-opacity-[0.7]"></div>
        Julio 2024, semana 4
        <IconArrows />
      </p>

      <div className="grid grid-cols-3 grid-rows-5 gap-5 pt-5 pb-10">
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconUser color="#C4C4C4" />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              Usuarios activos
            </p>
          </div>

          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            1.208
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={true} />
            <ColorfulText state={true} text="+12%" />

            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconTime />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              Tiempo de uso
            </p>
          </div>
          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            01:42s
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={false} />
            <ColorfulText state={false} text="+11%" />
            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconSuscriber />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              Tasa de abandono
            </p>
          </div>
          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            5%
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={false} />
            <ColorfulText state={false} text="-1%" />
            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-2 h-[207px] rounded-[13px] p-4">
          <div className="flex gap-3 items-center pb-5">
            <IconUserMore />

            <p className="text-[22px] font-bold text-argenpesos-textos">
              Cantidad de usuarios
            </p>
            <IconSelector state={true} />
            <ColorfulText state={true} text="+4%" />
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray row-span-2 h-[435px] rounded-[13px] p-5">
          <div className="flex gap-3 items-center pb-5">
            <Iconstatistics />

            <p className="text-[22px] font-bold text-argenpesos-textos">
              Estadísticas
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-2 h-[207px] rounded-[13px] p-4">
          <div className="flex gap-3 items-center pb-5">
            <IconScreen />

            <p className="text-[22px] font-bold text-argenpesos-textos">
              Estadísticas de cada pantalla
            </p>
            <div className="flex w-[179px] h-[28px] ml-4 border-[1px] border-argenpesos-textos flex- items-center justify-center gap-2 rounded-[8px]">
              <p className="text-[15.36px] font-book text-argenpesos-textos">
                Tiempo promedio
              </p>
              <ArrowLeft className="w-[6px] h-[11.52px] rotate-[270deg] mt-1" />
            </div>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconDollar />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              Préstamos
            </p>
          </div>
          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            $11m
            <span className="text-[22px] font-book text-argenpesos-textos ml-2">
              solicitados
            </span>
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={true} />
            <ColorfulText state={true} text="+9%" />
            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconBuy />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              ArgenCompras
            </p>
          </div>
          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            $2.6m
            <span className="text-[22px] font-book text-argenpesos-textos ml-2">
              gastado
            </span>
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={true} />
            <ColorfulText state={true} text="+7%" />
            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconStarts />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              Puntos ArgenPesos
            </p>
          </div>
          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            22.8k
            <span className="text-[22px] font-book text-argenpesos-textos ml-2">
              canjeados
            </span>
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={true} />
            <ColorfulText state={true} text="+2%" />
            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconDollar />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              Préstamos
            </p>
          </div>
          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            272
            <span className="text-[22px] font-book text-argenpesos-textos ml-2">
              solicitudes
            </span>
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={false} />
            <ColorfulText state={false} text="-17%" />
            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconBuy />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              ArgenCompras
            </p>
          </div>
          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            89
            <span className="text-[22px] font-book text-argenpesos-textos ml-2">
              ventas
            </span>
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={true} />
            <ColorfulText state={true} text="+4%" />
            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px] px-5 py-5">
          <div className="flex gap-3 items-center pb-5">
            <IconStarts />
            <p className="text-[22px] font-bold text-argenpesos-textos">
              Puntos ArgenPesos
            </p>
          </div>
          <p className="text-[46.08px] font-bold text-argenpesos-textos mb-4">
            68.2k
            <span className="text-[22px] font-book text-argenpesos-textos ml-2">
              ganados
            </span>
          </p>

          <div className="flex gap-2 items-center">
            <IconSelector state={false} />
            <ColorfulText state={false} text="-3%" />
            <p className="text-[22px] text-argenpesos-gray2 font-book">
              esta semana
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
