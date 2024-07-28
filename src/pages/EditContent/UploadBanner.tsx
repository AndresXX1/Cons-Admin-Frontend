import { uploadImgBanner } from "@store/services/banners";
import { IconMas } from "@utils/svg";

interface UploadBannerProps {
  getBannersList: () => void;
}

const UploadBanner = ({ getBannersList }: UploadBannerProps) => {
  const handleUpdoadBanner = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input.onchange = async (e: any) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "nextjs");
      const result = await uploadImgBanner(formData);
      if (result) {
        getBannersList();
      }
    };
  };

  return (
    <div
      className="w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray items-center justify-center cursor-pointer"
      onClick={handleUpdoadBanner}
    >
      <IconMas />
    </div>
  );
};

export default UploadBanner;
