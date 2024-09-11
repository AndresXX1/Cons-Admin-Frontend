import { ArrowLeft } from "@utils/svg";
import { useNavigate } from "react-router-dom";
import CardBranches from "../CardBranches";
import { getNotices } from "@store/services/notices";
import { useEffect, useState } from "react";
import CreateBranches from "../CreateBranches";

export interface Notice {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
}

const EditBranches = () => {
  const navigate = useNavigate();

  const [notices, setNotices] = useState<Notice[]>([]);

  const getNoticesList = async () => {
    const notices = await getNotices();
    setNotices(notices);
  };

  useEffect(() => {
    getNoticesList();
  }, []);
  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <div className="flex gap-10 items-center pb-12">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/edit-content")}
        />
        <p className="text-[40px] text-argenpesos-textos font-book">
          Sucursales
        </p>
      </div>
      <p className="text-[23px] font-bold text-argenpesos-textos mb-6">
        Sucursales
      </p>

      <div className="flex gap-5">
        {notices.map(notice => {
          return (
            <CardBranches
              key={notice.id}
              notice={notice}
              getNoticesList={getNoticesList}
            />
          );
        })}
        <CreateBranches getNoticesList={getNoticesList} />
      </div>
    </div>
  );
};

export default EditBranches;
