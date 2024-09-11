import { IconBanners, IconBranches, IconNotices } from "@utils/svg";
import { useNavigate } from "react-router-dom";

const EditContent = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
        Editar contenido
      </p>

      <div className="grid grid-cols-2 grid-rows-2 gap-8">
        <div
          onClick={() => navigate("/dashboard/edit-content/banners")}
          className="flex flex-col gap-1 items-center justify-center border-argenpesos-gray2 rounded-[12.48px] border-[1px] col-span-1 w-[445px] h-[241px] cursor-pointer"
        >
          <IconBanners />
          <p className="text-[22.08px] text-argenpesos-textos font-book">
            Banners
          </p>
        </div>
        <div
          onClick={() => navigate("/dashboard/edit-content/notices")}
          className="flex flex-col gap-1 items-center justify-center border-argenpesos-gray2 rounded-[12.48px] border-[1px] col-span-1 w-[445px] h-[241px] cursor-pointer"
        >
          <IconNotices />
          <p className="text-[22.08px] text-argenpesos-textos font-book">
            Noticias
          </p>
        </div>
        <div
          onClick={() => navigate("/dashboard/edit-content/branches")}
          className="flex flex-col gap-1 items-center justify-center border-argenpesos-gray2 rounded-[12.48px] border-[1px] col-span-2 h-[241px] cursor-pointer"
        >
          <IconBranches />
          <p className="text-[22.08px] text-argenpesos-textos font-book">
            Sucursales
          </p>
        </div>
      </div>
    </div>
  );
};

export default EditContent;
