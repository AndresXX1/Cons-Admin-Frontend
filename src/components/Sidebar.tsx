import { links } from "@utils/format";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconLogout } from "@utils/svg";
import { logOutAsync } from "@store/actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@store/index";
import { apiUrls } from "../config/config";

const Sidebar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="flex w-[285px]">
      <div className="bg-argenpesos-white w-[285px] fixed">
        <div className="flex gap-2 mt-9 mb-7 xl:mt-12 xl:mb-10">
          <img
            className="select-none w-[235px] h-[50px] mx-auto"
            src="/login/logo_argenpesos.png"
            alt="Logo"
          />
        </div>
        <ul className="flex flex-col gap-2">
          {links.map((link, index) => (
            <li
              key={`${link.text}-${index}`}
              className={`flex h-12 pl-3 gap-3 ${
                currentPath === link.to
                  ? "text-argenpesos-skyBlue border-l-8 pl-6 border-argenpesos-skyBlue"
                  : "text-argenpesos-textos border-l-8 border-transparent pl-6"
              }`}
            >
              <div className="flex items-center justify-center gap-5">
                <link.Icon color={currentPath === link.to ? "#4DCCFF" : ""} />
                <Link to={link.to} className="font-book text-[20px]">
                  {link.text}
                </Link>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-12 flex items-center justify-center border-[2px] border-argenpesos-textos w-[66px] h-[66px] mx-auto rounded-[15px]">
          {user && <img src={apiUrls.avatarUser(user.avatar)} alt="avatar" />}
        </div>
        <p className="text-center mt-6 text-argenpesos-textos text-[23px] font-book">
          {user?.full_name ? user.full_name : "Nombre de usuario"}
        </p>

        <p
          className="flex items-center justify-center gap-1 text-[15.21px] text-argenpesos-red mt-2 cursor-pointer font-book"
          onClick={() => dispatch(logOutAsync())}
        >
          <IconLogout />
          Cerrar Sesión
        </p>
      </div>
      <div className="fixed ml-[280px] z-[1] bg-argenpesos-gray2 w-[1px] h-full"></div>
    </div>
  );
};

export default Sidebar;
