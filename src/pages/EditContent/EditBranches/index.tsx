import { ArrowLeft } from "@utils/svg";
import { useNavigate } from "react-router-dom";

const EditBranches = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <div className="flex gap-10 items-center pb-12">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/edit-content")}
        />
        <p className="text-[40px] text-argenpesos-textos font-book">Banners</p>
      </div>
      <p className="text-[23px] font-bold text-argenpesos-textos mb-6">
        Sucursales
      </p>
    </div>
  );
};

export default EditBranches;
