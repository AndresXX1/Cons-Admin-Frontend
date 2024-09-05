import { useEffect, useState } from "react";
import {
  getBannersArgenCompras,
  getBannersCuponizate,
  getBannersHome,
} from "@store/services/banners";
import CardBanner from "../CardBanner";
import UploadBanner from "../UploadBanner";
import { ArrowLeft } from "@utils/svg";
import { useNavigate } from "react-router-dom";

export interface Banner {
  id: string;
  url: string;
}

const EditBanners = () => {
  const [bannersHome, setBannersHome] = useState<Banner[]>([]);
  const [bannersCuponizate, setBannersCuponizate] = useState<Banner[]>([]);
  const [bannersArgenCompras, setBannersArgenCompras] = useState<Banner[]>([]);

  const navigate = useNavigate();

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

  useEffect(() => {
    getBannersListHome();
    getBannersListCuponizate();
    getBannersListArgenCompras();
  }, []);

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

      <div className="flex gap-5 pb-10">
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
    </div>
  );
};

export default EditBanners;
