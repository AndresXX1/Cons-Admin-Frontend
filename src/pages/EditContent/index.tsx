import { IconDelete, IconEdit, IconMas } from "@utils/svg";

const EditContent = () => {
  const info = [
    {
      image: "/edit_content/image_banner_2.png",
    },
    {
      image: "/edit_content/image_banner_3.png",
    },
  ];
  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
        Editar contenido
      </p>
      <p className="text-[23px] font-bold text-argenpesos-textos mb-6">
        Home banner
      </p>

      <div className="flex gap-5">
        <div className="max-w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray">
          <div className="rounded-[13px] bg-[#F9F9F9] flex items-center relative">
            <img
              className="w-full h-full overflow-hidden"
              src="/edit_content/image_banner.png"
              alt=""
            />
            <div className="absolute bottom-4 flex gap-2 right-5">
              <IconDelete />
            </div>
          </div>
        </div>
        <div className="w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center">
          <IconMas />
        </div>
      </div>

      <p className="text-[23px] font-bold text-argenpesos-textos mt-10 mb-5">
        Noticias
      </p>
      <div className="flex gap-5">
        {info.map((inf, key) => (
          <div
            key={key}
            className="max-w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray"
          >
            <div className="rounded-[13px] bg-[#F9F9F9] flex items-center relative">
              <img
                className="w-full h-full overflow-hidden"
                src={inf.image}
                alt=""
              />
              <div className="absolute bottom-4 flex gap-3 right-6">
                <IconEdit />
                <IconDelete />
              </div>
            </div>
          </div>
        ))}
        <div className="w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center">
          <IconMas />
        </div>
      </div>
    </div>
  );
};

export default EditContent;
