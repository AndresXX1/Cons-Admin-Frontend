import { useState, useEffect } from "react";
import CardBanner from "./CardBanner";
import UploadBanner from "./UploadBanner";
import { getBanners } from "@store/services/banners";
import { getNotices } from "@store/services/notices";
import CreateNotice from "./CreateNotice";
import CardNotice from "./CardNotice";

export interface Banner {
  id: string;
  url: string;
}

export interface Notice {
  id: string;
  url: string;
  title: string;
  description: string;
  date: string;
}

const EditContent = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  const getBannersList = async () => {
    const banners = await getBanners();
    setBanners(banners);
  };

  const getNoticesList = async () => {
    const notices = await getNotices();
    setNotices(notices);
  };

  useEffect(() => {
    getBannersList();
    getNoticesList();
  }, []);

  console.log(banners);

  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
        Editar contenido
      </p>
      <p className="text-[23px] font-bold text-argenpesos-textos mb-6">
        Home banner
      </p>

      <div className="flex gap-5">
        {banners.map(banner => {
          return (
            <CardBanner
              key={banner.id}
              banner={banner}
              getBannersList={getBannersList}
            />
          );
        })}
        {banners.length < 3 ? (
          <UploadBanner getBannersList={getBannersList} />
        ) : null}
      </div>

      <p className="text-[23px] font-bold text-argenpesos-textos mt-10 mb-5">
        Noticias
      </p>
      <div className="flex gap-5">
        {notices.map(notice => {
          return (
            <CardNotice
              key={notice.id}
              notice={notice}
              getNoticesList={getNoticesList}
            />
          );
        })}
        <CreateNotice getNoticesList={getNoticesList} />
      </div>
    </div>
  );
};

export default EditContent;
