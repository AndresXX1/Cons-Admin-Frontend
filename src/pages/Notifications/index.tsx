import { useEffect, useState } from "react";
import {
  IconNotification,
  ArrowBlue,
  ThreePoints,
  IconEdit,
  IconDelete,
  IconX,
  IconPencil,
} from "@utils/svg";
import Modal from "@components/Modal";
import "react-datetime/css/react-datetime.css";
import {
  createNotification,
  getNextNotifications,
  getOldNotifications,
} from "@store/services/notification";

export interface NotificationProps {
  title: string;
  message: string;
  scheduledAt: Date | string;
  saveInHistory: boolean;
  isPush: boolean;
  redirect: string;
}

const Notifications = () => {
  const [visibleIndex, setVisibleIndex] = useState<number | null>(null);
  const currentDate = new Date()
    .toLocaleString("sv-SE", { timeZone: "America/Argentina/Buenos_Aires" })
    .replace(" ", "T")
    .slice(0, 16);
  const [data, setData] = useState<NotificationProps>({
    title: "",
    message: "",
    scheduledAt: new Date(currentDate),
    saveInHistory: false,
    isPush: false,
    redirect: "",
  });
  const [nextNotifications, setNextNotifications] = useState<
    NotificationProps[]
  >([]);
  const [oldNotifications, setOldNotifications] = useState<NotificationProps[]>(
    []
  );
  const [modalDelete, setModalDelete] = useState<boolean>(false);
  const [modalEdit, setModalEdit] = useState<boolean>(false);
  const [modalCreate, setModalCreate] = useState<boolean>(false);

  const fetchNotifications = async () => {
    const response = await getNextNotifications();
    const response2 = await getOldNotifications();
    setNextNotifications(response);
    setOldNotifications(response2);
    return;
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const maxDate = new Date(
    new Date().setFullYear(new Date().getFullYear() + 10)
  )
    .toLocaleString("sv-SE", { timeZone: "America/Argentina/Buenos_Aires" })
    .replace(" ", "T")
    .slice(0, 16);

  const [error, setError] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = event.target.value;

    if (selectedDate < currentDate) {
      setError("La fecha no puede ser menor a la actual.");
    } else if (selectedDate > maxDate) {
      setError("La fecha no puede ser mayor a 10 años en el futuro.");
    } else {
      setError("");
    }
    setData({ ...data, scheduledAt: new Date(selectedDate) });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.value === "false"
          ? false
          : e.target.value === "true"
            ? true
            : e.target.value,
    });
  };

  const handleSubmit = async () => {
    const response = await createNotification(data, setError);
    if (response) {
      setData({
        title: "",
        message: "",
        scheduledAt: new Date(currentDate),
        saveInHistory: false,
        isPush: false,
        redirect: "",
      });
      setModalCreate(false);
      fetchNotifications();
    }
  };

  const toggleVisibility = (index: number) => {
    if (visibleIndex === index) {
      setVisibleIndex(null);
    } else {
      setVisibleIndex(index);
    }
  };



  return (
    <>
      <Modal
        isShown={modalDelete}
        element={
          <div className="px-6 py-6 flex flex-col justify-center w-[481px] h-[192px]">
            <div className="flex justify-between items-start">
              <p className="text-[1rem] text-argenpesos-textos font-bold">
                ¿Está seguro que desea eliminar esta noticia?
              </p>
              <p
                className="cursor-pointer mt-[6px]"
                onClick={() => setModalDelete(false)}
              >
                <IconX />
              </p>
            </div>
            <p className="text-[14px] font-book text-argenpesos-gray w-[380px] mb-10 mt-1">
              Si la elimina ya no se podrá recuperarla.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setModalDelete(false);
                }}
                className="bg-argenpesos-red w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Eliminar
              </button>
              <button
                onClick={() => {
                  setModalDelete(false);
                }}
                className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book"
              >
                Cancelar
              </button>
            </div>
          </div>
        }
      ></Modal>
      <Modal
        isShown={modalCreate}
        element={
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[700px] mb-5">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold">
                Nueva notificación
              </p>
              <p
                className="cursor-pointer"
                onClick={() => {
                  setData({
                    title: "",
                    message: "",
                    scheduledAt: new Date(currentDate),
                    saveInHistory: false,
                    isPush: false,
                    redirect: "",
                  });
                  setModalCreate(false);
                }}
              >
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-4">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                    <img
                      className="w-[175px] h-[175px]"
                      src="/icon.png"
                      alt="default"
                    />
                  </div>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label className="text-[14px] font-bold text-argenpesos-textos">
                    Título / Nombre de la Notificación
                  </label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    name="title"
                    placeholder="Título"
                    maxLength={50}
                    value={data.title}
                    onChange={handleChange}
                  />

                  <div className="flex">
                    <div>
                      <label className="text-[14px] font-bold text-argenpesos-textos">
                        Fecha y Hora
                      </label>
                      <input
                        className="border-0 border-[#C2C2C2] w-full h-[36px] pl-2 border-b-[1px] leading-[27px] text-sofiaCall-dark font-poppinsMedium text-[13px]"
                        type="datetime-local"
                        id="start_time"
                        name="scheduledAt"
                        value={
                          data.scheduledAt instanceof Date
                            ? new Date(
                                data.scheduledAt.getTime() -
                                  new Date().getTimezoneOffset() * 60000
                              )
                                .toISOString()
                                .slice(0, 16)
                            : ""
                        }
                        min={currentDate}
                        max={maxDate}
                        required
                        onChange={handleDateChange}
                      />
                      {error && (
                        <p className="font-poppins Medium text-red-500 text-sm mt-2">
                          {error}
                        </p>
                      )}{" "}
                    </div>
                  </div>

                  <label htmlFor="">Descripción</label>
  <textarea
    className="w-[617px] h-[181px] text-[16px] font-book p-3 text-argenpesos-textos align-top border border-argenpesos-gray rounded-[5px] resize-none placeholder:text-argenpesos-textos"
    placeholder="Cuerpo de texto"
    name="message"
    value={data.message}
    onChange={handleChange}
  />

  {/* Nuevo campo de Select */}
  <div className="w-full">
    <label className="block text-[14px] font-bold text-argenpesos-textos">
      Redirigir a:
    </label>
    <select
      name="redirect"
      value={data.redirect}
      onChange={handleChange}
      className="block w-full pl-3 pr-10 py-3 text-base border border-gray-300 focus:outline-none focus:ring-primary focus:border-primary rounded-md text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
    >
      <option value="">Seleccionar</option>
      <option value="noticias">Noticias</option>
      <option value="prestamos">Mis préstamos</option>
      <option value="perfil">Perfil</option>
      <option value="argencompras">ArgenCompras</option>
      <option value="cuponizate">Cuponizate</option>
      <option value="canjear">Canjear puntos</option>
      <option value="medios">Medios de pago para tus cuotas</option>
    </select>
  </div>

                  <p className="pt-5 text-[14px] font-bold text-argenpesos-textos">
                    Incluye notificación Push
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <input
                        id="push-notification-yes"
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[full] mr-2"
                        type="radio"
                        name="isPush"
                        value="true"
                        checked={data.isPush}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="push-notification-yes"
                        className="text-[14px] font-book leading-[24px] text-argenpesos-textos"
                      >
                        Si
                      </label>
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <input
                        id="push-notification-no"
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[full] mr-2"
                        type="radio"
                        name="isPush"
                        value="false"
                        checked={!data.isPush}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="push-notification-no"
                        className="text-[14px] font-book leading-[24px] text-argenpesos-textos"
                      >
                        No
                      </label>
                    </div>
                  </div>

                  <p className="pt-5 text-[14px] font-bold text-argenpesos-textos">
                    Incluye notificación In-App
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <input
                        id="in-app-notification-yes"
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[full] mr-2"
                        type="radio"
                        value="true"
                        name="saveInHistory"
                        checked={data.saveInHistory}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="in-app-notification-yes"
                        className="text-[14px] font-book leading-[24px] text-argenpesos-textos"
                      >
                        Si
                      </label>
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <input
                        id="in-app-notification-no"
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[full] mr-2"
                        type="radio"
                        value="false"
                        name="saveInHistory"
                        checked={!data.saveInHistory}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor="in-app-notification-no"
                        className="text-[14px] font-book leading-[24px] text-argenpesos-textos"
                      >
                        No
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10 pb-10">
              <button
                onClick={() => {
                  setData({
                    title: "",
                    message: "",
                    scheduledAt: new Date(currentDate),
                    saveInHistory: false,
                    isPush: false,
                    redirect: "",
                  });
                  setModalCreate(false);
                }}
                className="border-[1px] border-argenpesos-gray3 rounded-[10px] text-argenpesos-textos text-[14px] px-4 py-2"
              >
                Cancelar
              </button>

              <button
                onClick={handleSubmit}
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book"
              >
                Guardar
              </button>
            </div>
          </div>
        }
      />
      <Modal
        isShown={modalEdit}
        element={
          <div className="px-[54px] py-12 flex flex-col w-[969px] h-[700px] mb-5">
            <div className="flex justify-between items-center">
              <p className="text-[32px] text-argenpesos-textos font-bold">
                Editar notificación
              </p>
              <p className="cursor-pointer" onClick={() => setModalEdit(false)}>
                <IconX />
              </p>
            </div>
            <div className="mt-5">
              <div className="flex gap-4">
                <div>
                  <div className="flex items-center justify-center rounded-[13px] w-[185px] h-[185px] bg-argenpesos-gray3 border-[1px] border-solid border-argenpesos-gray2">
                    <img
                      className="w-[84px] h-[84px]"
                      src="/products/image_default.png"
                    ></img>
                  </div>
                  <p className="flex gap-1 items-center pt-[18px] text-[14px] font-book text-argenpesos-textos">
                    <IconPencil />
                    Subir una imagen
                  </p>
                </div>
                <div></div>
                <div className="flex flex-col gap-4">
                  <label
                    htmlFor=""
                    className="text-[14px] font-bold text-argenpesos-textos"
                  >
                    Título / Nombre de la App
                  </label>
                  <input
                    className="w-[617px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                    type="text"
                    placeholder="Título"
                  />
                  <p className="pt-9 text-[14px] font-bold text-argenpesos-textos">
                    Incluye envío
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div>
                      <label className="text-[14px] font-bold text-argenpesos-textos">
                        Fecha
                      </label>
                      <input
                        className="w-[298px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                        type="text"
                        placeholder="1 / 1 / 2025"
                      />
                    </div>
                    <div>
                      <label className="text-[14px] font-bold text-argenpesos-textos">
                        Hora
                      </label>
                      <input
                        className="w-[298px] h-[54px] rounded-[5px] border-[1px] border-solid border-argenpesos-gray text-argenpesos-textos placeholder:text-argenpesos-gray text-[14px] font-book"
                        type="text"
                        placeholder="00 : 00"
                      />
                    </div>
                  </div>

                  <label htmlFor="">Descripción</label>
                  <textarea
                    className="w-[617px] h-[181px] text-[16px] font-book p-3 text-argenpesos-textos align-top border border-argenpesos-gray rounded-[5px] resize-none placeholder:text-argenpesos-textos"
                    placeholder="Cuerpo de texto"
                  />
                  <p className="pt-5 text-[14px] font-bold text-argenpesos-textos">
                    Incluye notificación push
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>

                  <p className="pt-5 text-[14px] font-bold text-argenpesos-textos">
                    Incluye notificación In-App
                  </p>
                  <div className="flex gap-5">
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        Si
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                    <div className="flex items-center gap-3 rounded-[4px]">
                      <p className="text-[14px] font-book leading-[24px] text-argenpesos-textos">
                        No
                      </p>
                      <input
                        className="border-[1px] border-solid border-argenpesos-gray rounded-[4px]"
                        type="checkbox"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-10 pb-10">
              <button className="border-[1px] border-solid border-argenpesos-gray w-[109px] h-[38px] rounded-[5px] text-argenpesos-gray text-[1rem] font-book">
                Cancelar
              </button>
              <button
                onClick={() => setModalEdit(false)}
                className="bg-argenpesos-skyBlue w-[109px] h-[38px] rounded-[5px] text-argenpesos-white text-[1rem] font-book hover:bg-argenpesos-blue hover:transition-colors duration-100"
              >
                Guardar
              </button>
            </div>
          </div>
        }
      ></Modal>

<div className="flex flex-col pl-[24px] pt-[24px] px-[24px] h-full">
  <h1 className="text-[27px] text-argenpesos-textos font-bold pb-[32px] text-center">
    Notificaciones
  </h1>

  <div className="flex flex-col sm:flex-row gap-[12px] sm:gap-[20px] items-center justify-between">
    <input
      className="w-full sm:w-[510px] h-[40px] rounded-[8px] border-[1px] border-argenpesos-textos border-solid px-[24px] text-argenpesos-gray2 placeholder:text-argenpesos-gray2 placeholder:font-book"
      type="search"
      placeholder="Buscar estadísticas o datos"
    />
    <button
      onClick={() => {
        setModalCreate(true);
        setData({ ...data, scheduledAt: new Date(currentDate) });
      }}
      className="w-full sm:w-[170px] h-[40px] bg-argenpesos-skyBlue rounded-[8px] flex items-center justify-center text-argenpesos-white gap-[4px] hover:bg-argenpesos-blue hover:transition-colors duration-[100ms]"
    >
      <IconNotification />
      <span>Nueva notificación</span>
    </button>
  </div>

  <div className="grid grid-cols-7 gap-[7px] items-center text-center mt-[40px]">
    <p className="text-[14px] text-argenpesos-textos font-bold">Nombre</p>
    <p className="text-[14px] text-argenpesos-textos font-bold">Fecha</p>
    <p className="text-[14px] text-argenpesos-textos font-bold">Hora</p>
    <p className="text-[14px] text-argenpesos-textos font-bold">Mensaje</p>
    <p className="text-[14px] text-argenpesos-textos font-bold">In-App</p>
    <p className="text-[14px] text-argenpesos-textos font-bold">Push</p>
    <p className="text-[14px] text-argenpesos-textos font-bold">Redirect</p>
  </div>

  <div className="divide-y divide-argenpesos-gray mt-[20px] mb-[20px]">
  {[...(nextNotifications || []), ...(oldNotifications || [])].map(
    (inf, index) => (
      <div
        className="grid grid-cols-7 gap-[16px] items-center text-center py-[38px]"
        key={index}
      >
          <p className="text-[14px] text-argenpesos-textos font-book w-[100px]">
            {inf.title || "N/A"}
          </p>
          <p className="text-[14px] text-argenpesos-textos font-book w-[110px]">
            {inf.scheduledAt?.toString().split("T")[0]?.replace(/-/g, "/") ||
              "N/A"}
          </p>
          <p className="text-[14px] text-argenpesos-textos font-book w-[110px]">
            {inf.scheduledAt
              ? `${inf.scheduledAt.toString().split("T")[1].split(":")[0]}:${
                  inf.scheduledAt.toString().split("T")[1].split(":")[1]
                }`
              : "N/A"}
          </p>
          <p className="text-[14px] text-argenpesos-textos font-book w-[100px]">
            {inf.message || "N/A"}
          </p>
          <p className="text-[14px] text-argenpesos-textos font-book w-[100px]">
            {inf.saveInHistory ? "Si" : "No"}
          </p>
          <p className="text-[14px] text-argenpesos-textos font-book w-[100px]">
            {inf.isPush ? "Si" : "No"}
          </p>
          <p className="text-[14px] text-argenpesos-textos font-book w-[100px]">
            {inf.redirect || "N/A"}
          </p>
        </div>
      )
    )}
  </div>
</div>








      
    </>
  );
};

export default Notifications;
