import { useAppDispatch, useAppSelector } from "@/hooks/reduxHook";
import { ProductDetail } from "@/services/productApi";
import { fetchDetailProduct } from "@/store/actions/productAction";
import { addToCart } from "@/store/reducer/cartReducer";
import { RootState } from "@/store/store";
import useFormattedDate from "@/utils/formatedDate";
import {
  BadgeDollarSign,
  BadgeInfo,
  ReceiptText,
  TableProperties,
} from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export default function Detail() {
  const { productDetail } = useAppSelector(
    (state: RootState) => state.productReducer
  );

  console.log(productDetail?.stock);
  const params = useParams();
  const dispatch = useAppDispatch();

  const fetchProductById = () => {
    // Khai báo biến idStr chính xác
    const idStr: string | undefined = params.id;

    // Kiểm tra id hợp lệ trước khi chuyển đổi
    if (!idStr || isNaN(Number(idStr))) {
      console.error("ID không hợp lệ");
      return;
    }

    // Chuyển đổi id thành số an toàn
    const id: number = Number(idStr);

    // Gọi action thunk
    const actionThunk = fetchDetailProduct(id);
    dispatch(actionThunk);
  };

  // const handleAddToCart = (productDetail: ProductDetail) => {
  //   if (productDetail.stock === 0) {
  //     toast.error("Product", {
  //       description: `${name} sold out!`,
  //     });
  //     return;
  //   }
  //   const newPrice =
  //     productDetail.price -
  //     (productDetail.price * ) / 100;
  //   dispatch(
  //     addToCart({ productDetail.id, productDetail.name, price: newPrice, productDetail.image, quantity: 1, productDetail.stock })
  //   );
  //   toast.success("Product", {
  //     description: `${name} successfully added to your cart!`,
  //   });
  // };

  useEffect(() => {
    fetchProductById();
  }, []);

  const manufactureDate = useFormattedDate(productDetail?.manufactureDate);

  return (
    <div>
      <div className="flex text-black py-12 gap-8">
        <div>
          <div className="w-[25vw] rounded-2xl overflow-hidden">
            <img
              className="object-cover"
              src={
                productDetail?.image
                  ? "http://localhost:8080/product/files/" + productDetail.image
                  : "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/006-Gmax.png"
              }
              alt=""
            />
          </div>
        </div>
        <div className="flex flex-col max-w-[20vw]">
          <div className=" mb-4">
            <h1 className="text-black text-4xl font-bold">
              {productDetail?.name}
            </h1>
            <p>Manufacture Date: {manufactureDate}</p>
            <p>Brand: {productDetail?.brand.name}</p>
          </div>

          <div className="border p-3 rounded-xl shadow-md mb-4">
            <div className="border-b-2 text-black flex py-1 text-lg font-mono mb-2">
              <BadgeDollarSign />
              <span className="ml-1 text-black font-mono">Price</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-black font-mono text-2xl">
                {productDetail?.price} VNĐ
              </p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  // handleAddToCart(productDetail);
                }}
                className="px-4 py-2 border border-gray-400 hover:bg-amber-300 rounded-lg bg-amber-100 text-black font-bold"
              >
                Add to cart
              </button>
            </div>
          </div>

          <div className="border p-3 rounded-xl shadow-md mb-4">
            <div className="border-b-2 text-black flex py-1 text-lg font-mono mb-2">
              <ReceiptText />
              <span className="ml-1">Description</span>
            </div>
            <div>
              <p className="font-mono">{productDetail?.description}</p>
            </div>
          </div>

          <div className="border p-3 rounded-xl shadow-md mb-4">
            <div className="border-b-2 text-black flex py-1 text-lg font-mono mb-2">
              <BadgeInfo />
              <span className="ml-1">Type</span>
            </div>
            <div className="">
              <p>Type: {productDetail?.type.name}</p>
              <p>Theme: {productDetail?.type.theme}</p>
              <p>Desc: {productDetail?.type.description}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border p-3 rounded-xl shadow-md mb-4">
        <div className="border-b-2 text-black flex py-1 text-lg font-mono mb-2">
          <TableProperties />
          <span className="ml-1">Properties</span>
        </div>
        <div className="w-full">
          <table className="table-auto w-full">
            <tbody className="text-black text-md">
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  length
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.dimetions.length}
                </td>
              </tr>
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  width
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.dimetions.width}
                </td>
              </tr>
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  height
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.dimetions.height}
                </td>
              </tr>
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  weight
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.dimetions.weight}
                </td>
              </tr>
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  color
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.attributes.color}
                </td>
              </tr>
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  rarity
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.attributes.rarity}
                </td>
              </tr>
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  material
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.attributes.material}
                </td>
              </tr>
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  version
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.attributes.versionProduct}
                </td>
              </tr>
              <tr className="border-b">
                <td className="pr-3 text-left text-black text-md font-mono">
                  ageRecommendation
                </td>
                <td className="text-black text-md text-right">
                  {productDetail?.attributes.ageRecommendation}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div></div>
    </div>
  );
}
