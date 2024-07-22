import { links } from "@utils/format";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { IconLogout, IconUser } from "@utils/svg";

const Sidebar = () => {
  const location = useLocation();

  const currentPath = location.pathname;

  console.log(links);
  return (
    <div className="flex w-[335px]">
      <div className="bg-argenpesos-white w-[335px] fixed">
        <div className="flex gap-2 mt-9 mb-7 xl:mt-12 xl:mb-12">
          <img
            className="select-none w-[235px] h-[50px] mx-auto"
            src="/login/logo_argenpesos.png"
            alt="Logo"
          />
        </div>
        <ul className="flex flex-col gap-2 px-10">
          {links.map((link, index) => {
            const { Icon } = link;
            return (
              <li
                key={`${link.text}-${index}`}
                className={`flex h-14 pl-3 gap-3 ${
                  currentPath === link.to || link.active.includes(currentPath)
                    ? " text-argenpesos-skyBlue"
                    : " text-argenpesos-textos"
                }`}
              >
                <div className="flex items-center justify-center gap-5">
                  <Icon className="" />
                  <Link to={link.to} className="font-book text-[23px]">
                    {link.text}
                  </Link>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="mt-20 flex items-center justify-center border-[2px] border-argenpesos-textos w-[66px] h-[66px] mx-auto rounded-[15px]">
          <IconUser />
        </div>
        <p className="text-center mt-6 text-argenpesos-textos text-[23px] font-book">
          Félix Bilbao
        </p>

        <p className="flex items-center justify-center gap-1 text-[15.21px] text-argenpesos-red mt-2 cursor-pointer">
          <IconLogout />
          Cerrar Sesión
        </p>
      </div>

      <div className="fixed ml-[320px] z-[1] bg-argenpesos-gray2 w-[1px] h-full"></div>
    </div>
  );
};

export default Sidebar;
