import { IconDelete, IconEdit, IconMas, IconViewBlue } from "@utils/svg";

const Products = () => {
  const info = [
    {
      title: "Auricular Bluetooth F9-5",
      points: "1200 Puntos",
      image: "/products/image_auricular.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "1300 Puntos",
      image: "/products/image_reloj.png",
    },
  ];

  const info2 = [
    {
      name: "Productos destacados",
    },
    {
      name: "Electrodomésticos",
    },
    {
      name: "Celulares",
    },
    {
      name: "Juguetes",
    },
    {
      name: "Televisores",
    },
    {
      name: "Audios",
    },
  ];

  const info3 = [
    {
      title: "Auricular Bluetooth F9-5",
      points: "$270.000",
      image: "/products/image_auricular.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
    {
      title: "Reloj Smartwatch Y68",
      points: "$270.000",
      image: "/products/image_reloj.png",
    },
  ];
  return (
    <div className="flex flex-col pl-16 pt-12 px-10 h-[100%]">
      <p className="text-[3rem] text-argenpesos-textos font-bold pb-14">
        Productos
      </p>

      <p className="text-[23px] font-bold text-argenpesos-textos mb-4">
        Canjeables por puntos
      </p>

      <div className="flex gap-7">
        {info.map((inf, key) => (
          <div
            className="max-w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray"
            key={key}
          >
            <div className="flex flex-col justify-between pt-5  pb-3 pl-4">
              <h4 className="w-[141px] text-[20px] font-normal leading-[24px] text-argenpesos-textos">
                {inf.title}
              </h4>
              <p className="text-argenpesos-red text-[20px] font-bold leading-[19px]">
                {inf.points}
              </p>
            </div>
            <div className="h-full w-[150px] rounded-[13px] bg-[#F9F9F9] flex items-center relative">
              <img className="w-[150px] h-[150px]" src={inf.image} alt="" />
              <div className="absolute bottom-2 flex gap-2 left-14">
                <IconEdit />
                <IconDelete />
              </div>
            </div>
          </div>
        ))}
        <div className="w-[301px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center">
          <IconMas />
        </div>
      </div>

      <h4 className="text-[23px] font-bold text-argenpesos-textos pt-10 mb-5">
        Argencompras
      </h4>
      <input
        className="w-full h-[54px] rounded-[13px] border-[1px] border-argenpesos-textos border-solid px-10"
        type="search"
        placeholder="Buscar estadísticas o datos"
      />

      <div className="flex justify-between mt-10 pr-4">
        {info2.map((info, key) => (
          <div key={key}>
            <p className="text-[1rem] text-argenpesos-textos font-normal">
              {info.name}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 mt-5 mb-5">
        {info3.map((inf, key) => (
          <div
            className="max-w-[305px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray mb-10"
            key={key}
          >
            <div className="flex flex-col justify-between pt-5  pb-3 pl-4">
              <h4 className="w-[141px] text-[20px] font-normal leading-[24px] text-argenpesos-textos">
                {inf.title}
              </h4>
              <p className="text-argenpesos-red text-[20px] font-bold leading-[19px]">
                {inf.points}
              </p>
            </div>
            <div className="h-full w-[150px] rounded-[13px] bg-[#F9F9F9] flex items-center relative">
              <img className="w-[150px] h-[150px]" src={inf.image} alt="" />
              <div className="absolute bottom-2 flex gap-2 right-4">
                <IconViewBlue />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
