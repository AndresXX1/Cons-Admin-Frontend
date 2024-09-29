import { IconViewBlue, IconViewBlueOff } from "@utils/svg";
import { IProduct } from ".";
import { changeOfVisibilityProduct } from "@store/services/product";

interface ProductCardProps {
  product: IProduct;
  getProducts: () => void;
}

const ProductCard = ({ product, getProducts }: ProductCardProps) => {
  const toggleVisibility = async () => {
    const response = await changeOfVisibilityProduct(product.id);
    if (response) {
      getProducts();
    }
  };
  return (
    <div className="max-w-[305px] h-[207px] flex border-[1px] rounded-[13px] border-argenpesos-gray mb-10">
      <div className="flex flex-col justify-between pt-5  pb-3 pl-4">
        <h4 className="w-[141px] text-[20px] font-book leading-[24px] text-argenpesos-textos">
          {product.name.es}
        </h4>
        <p className="text-argenpesos-red text-[20px] font-bold leading-[19px]">
          points
        </p>
      </div>
      <div className="h-full w-[150px] rounded-[13px] bg-[#F9F9F9] flex items-center relative">
        {product.images[0].src && (
          <img
            className="w-[150px] h-[150px]"
            src={product.images[0].src}
            alt="image"
          />
        )}
        <div
          onClick={toggleVisibility}
          className="absolute bottom-2 flex gap-2 right-4 cursor-pointer"
        >
          {product.is_visible ? <IconViewBlueOff /> : <IconViewBlue />}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
