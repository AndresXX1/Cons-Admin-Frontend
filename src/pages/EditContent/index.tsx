import { useState, useEffect } from "react";
import CardBanner from "./CardBanner";
import UploadBanner from "./UploadBanner";
import {
  getBannersArgenCompras,
  getBannersCuponizate,
  getBannersHome,
} from "@store/services/banners";
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
  const [bannersHome, setBannersHome] = useState<Banner[]>([]);
  const [bannersCuponizate, setBannersCuponizate] = useState<Banner[]>([]);
  const [bannersArgenCompras, setBannersArgenCompras] = useState<Banner[]>([]);
  const [notices, setNotices] = useState<Notice[]>([]);

  const getBannersListHome = async () => {
    const bannersHome = await getBannersHome();
    setBannersHome(bannersHome);
  };

  const getBannersListCuponizate = async () => {
    const bannersCoponizate = await getBannersCuponizate();
    setBannersCuponizate(bannersCoponizate);
  };

  const getBannersListArgenCompras = async () => {
    const bannersArgenCompras = await getBannersArgenCompras();
    setBannersArgenCompras(bannersArgenCompras);
  };

  const getNoticesList = async () => {
    const notices = await getNotices();
    setNotices(notices);
  };

  useEffect(() => {
    getBannersListHome();
    getBannersListCuponizate();
    getBannersListArgenCompras();
    getNoticesList();
  }, []);

  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
        Editar contenido
      </p>
      <p className="text-[23px] font-bold text-argenpesos-textos mb-6">
        Home banner
      </p>

      <div className="flex gap-5">
        {bannersHome.map(banner => {
          return (
            <CardBanner
              key={banner.id}
              banner={banner}
              getBannersList={getBannersListHome}
            />
          );
        })}
        {bannersHome.length < 3 ? (
          <UploadBanner getBannersList={getBannersListHome} type="home" />
        ) : null}
      </div>

      <p className="text-[23px] font-bold text-argenpesos-textos mb-6 mt-6">
        ArgenCompras banner
      </p>

      <div className="flex gap-5">
        {bannersArgenCompras.map(banner => {
          return (
            <CardBanner
              key={banner.id}
              banner={banner}
              getBannersList={getBannersListArgenCompras}
            />
          );
        })}
        {bannersArgenCompras.length < 3 ? (
          <UploadBanner
            getBannersList={getBannersListArgenCompras}
            type="argencompras"
          />
        ) : null}
      </div>

      <p className="text-[23px] font-bold text-argenpesos-textos mb-6 mt-6">
        Cuponizate banner
      </p>

      <div className="flex gap-5">
        {bannersCuponizate.map(banner => {
          return (
            <CardBanner
              key={banner.id}
              banner={banner}
              getBannersList={getBannersListCuponizate}
            />
          );
        })}
        {bannersCuponizate.length < 3 ? (
          <UploadBanner
            getBannersList={getBannersListCuponizate}
            type="cuponizate"
          />
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
