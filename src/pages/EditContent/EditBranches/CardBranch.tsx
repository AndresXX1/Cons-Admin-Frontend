import { IconDelete, IconEdit } from "@utils/svg";
import { Branch } from ".";
import { apiUrls } from "@config/config";

export interface CardBranchProps {
  branch: Branch;
  getBranchesList: () => void;
}

const CardBranch = ({ branch, getBranchesList }: CardBranchProps) => {
  return (
    <div className="w-[306px] h-[200px] flex border-[1px] rounded-[13px] border-argenpesos-gray mb-10">
      <div className="rounded-[13px] bg-[#F9F9F9] flex items-center relative w-full h-full">
        <img
          className="w-full h-full overflow-hidden object-cover"
          src={apiUrls.BranchImg(branch.image)}
          alt=""
        />
        <div className="absolute bottom-4 flex gap-3 right-6">
          <IconEdit
            onClick={() => getBranchesList()}
            className="cursor-pointer"
          />
          <IconDelete
            className="cursor-pointer"
            onClick={() => getBranchesList()}
          />
        </div>
      </div>
    </div>
  );
};

export default CardBranch;
