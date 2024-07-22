import { ArrowLeft, IconDownload } from "@utils/svg";

const Home = () => {
  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <p className="text-[3rem] text-argenpesos-textos font-bold">
        Hola <span className="text-argenpesos-skyBlue">Félix</span>
      </p>
      <p>¡Bienvenido de vuelta!</p>

      <div className="flex gap-5 pt-5">
        <input
          className="w-[477px] h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10"
          type="search"
          placeholder="Buscar estadísticas o datos"
        />
        <div className="flex w-[133px] h-[54px] ml-4 border-[1px] border-argenpesos-textos flex- items-center justify-center gap-2 rounded-[13px]">
          <p className="text-[1rem] font-normal text-argenpesos-textos">
            Semanal
          </p>
          <ArrowLeft className="w-[7px] h-[20px] rotate-[270deg]" />
        </div>
        <button className="flex gap-2 w-[304px] h-[54px] items-center justify-center bg-argenpesos-skyBlue text-[1rem] text-argenpesos-white font-normal rounded-[13px]">
          <IconDownload />
          Descargar planillla
        </button>
      </div>
      <p className="pt-8">Julio 2024, semana 4</p>

      <div className="grid grid-cols-3 grid-rows-5 max-w-[970px] gap-6 pb-20">
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] mt-8 rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] mt-8 rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] mt-8 rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-2 h-[239px] rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray row-span-2  h-full rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-2 h-[254px] rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px]"></div>
        <div className="border-[1px] border-argenpesos-gray col-span-1 h-[207px] rounded-[13px]"></div>
      </div>
    </div>
  );
};

export default Home;
