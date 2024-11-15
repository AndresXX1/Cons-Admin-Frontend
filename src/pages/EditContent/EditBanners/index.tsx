import { SetStateAction, useEffect, useState } from "react";
import {
  getBannersArgenCompras,
  getBannersCuponizate,
  getBannersHome,
} from "@store/services/banners";
import CardBanner from "../CardBanner";
import UploadBanner from "./UploadBanner";
import { ArrowLeft, ArrowRight } from "@utils/svg";
import { useNavigate } from "react-router-dom";

export interface Banner {
  id: string;
  url: string;
}

const EditBanners = () => {
  const [bannersHome, setBannersHome] = useState<Banner[]>([]);
  const [bannersCuponizate, setBannersCuponizate] = useState<Banner[]>([]);
  const [bannersArgenCompras, setBannersArgenCompras] = useState<Banner[]>([]);
  const [homeIndex, setHomeIndex] = useState(0);
  const [cuponizateIndex, setCuponizateIndex] = useState(0);
  const [argenComprasIndex, setArgenComprasIndex] = useState(0);

  const navigate = useNavigate();

  const getBannersListHome = async () => {
    const bannersHome = await getBannersHome();
    setBannersHome(bannersHome);
  };

  const getBannersListCuponizate = async () => {
    const bannersCuponizate = await getBannersCuponizate();
    setBannersCuponizate(bannersCuponizate);
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

  const handlePrev = (index: number, setIndex: { (value: SetStateAction<number>): void; (value: SetStateAction<number>): void; (value: SetStateAction<number>): void; (arg0: number): void; }, banners: string | any[]) => {
    setIndex(index > 0 ? index - 1 : banners.length - 2);
  };

  const handleNext = (index: number, setIndex: { (value: SetStateAction<number>): void; (value: SetStateAction<number>): void; (value: SetStateAction<number>): void; (arg0: any): void; }, banners: string | any[]) => {
    setIndex(index < banners.length - 2 ? index + 1 : 0);
  };

  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <div className="flex gap-10 items-center pb-12">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => navigate("/dashboard/edit-content")}
        />
        <p className="text-[40px] text-argenpesos-textos font-book">Banners</p>
      </div>
      
      {/* Home banner */}
      <p className="text-[23px] font-bold text-argenpesos-textos mb-6">
        Home banner
      </p>
      <div className="flex items-center gap-3">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => handlePrev(homeIndex, setHomeIndex, bannersHome)}
        />
        <div className="grid grid-cols-2 gap-5">
          {bannersHome.slice(homeIndex, homeIndex + 2).map(banner => (
            <CardBanner
              key={banner.id}
              banner={banner}
              getBannersList={getBannersListHome}
            />
          ))}
        </div>
        <ArrowRight
          className="cursor-pointer"
          onClick={() => handleNext(homeIndex, setHomeIndex, bannersHome)}
        />
      </div>

      {/* ArgenCompras banner */}
      <p className="text-[23px] font-bold text-argenpesos-textos mb-6 mt-6">
        ArgenCompras banner
      </p>
      <div className="flex items-center gap-3">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => handlePrev(argenComprasIndex, setArgenComprasIndex, bannersArgenCompras)}
        />
        <div className="grid grid-cols-2 gap-5">
          {bannersArgenCompras.slice(argenComprasIndex, argenComprasIndex + 2).map(banner => (
            <CardBanner
              key={banner.id}
              banner={banner}
              getBannersList={getBannersListArgenCompras}
            />
          ))}
        </div>
        <ArrowRight
          className="cursor-pointer"
          onClick={() => handleNext(argenComprasIndex, setArgenComprasIndex, bannersArgenCompras)}
        />
      </div>

      {/* Cuponizate banner */}
      <p className="text-[23px] font-bold text-argenpesos-textos mb-6 mt-6">
        Cuponizate banner
      </p>
      <div className="flex items-center gap-3">
        <ArrowLeft
          className="cursor-pointer"
          onClick={() => handlePrev(cuponizateIndex, setCuponizateIndex, bannersCuponizate)}
        />
        <div className="grid grid-cols-2 gap-5">
          {bannersCuponizate.slice(cuponizateIndex, cuponizateIndex + 2).map(banner => (
            <CardBanner
              key={banner.id}
              banner={banner}
              getBannersList={getBannersListCuponizate}
            />
          ))}
        </div>
        <ArrowRight
          className="cursor-pointer"
          onClick={() => handleNext(cuponizateIndex, setCuponizateIndex, bannersCuponizate)}
        />
      </div>
    </div>
  );
};

export default EditBanners;
