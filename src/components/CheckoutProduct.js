import Image from "next/image";
import { useDispatch } from "react-redux";
import Currency from "react-currency-formatter";
import { StarIcon } from "@heroicons/react/solid";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";

const CheckoutProduct = ({
  id,
  title,
  price,
  description,
  image,
  category,
  hasPrime,
  rating,
}) => {
  const dispatch = useDispatch();
  const addItemtoBasket = () => {
    const product = {
      id,
      title,
      price,
      description,
      image,
      category,
      hasPrime,
      rating,
    };
    // Sending the Product as an ACTION to the REDUX-STORE... the basket slice
    dispatch(addToBasket(product));
  };
  const removeItemtoBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />

      {/* Middle */}
      <div className="col-span-3 mx-5">
        <p className="font-bold text-lg">{title}</p>
        <div className="flex mt-2">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" key={i} />
            ))}
        </div>
        <p className="my-2 line-clamp-3 text-xs">{description}</p>
        <div className="font-bold">
          <Currency quantity={price} currency="INR" />
        </div>
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img
              src="https://links.papareact.com/fdw"
              alt=""
              className="w-12"
              loading="lazy"
            />
            <p className="text-xs text-gray-500">Free Next-day Delivery</p>
          </div>
        )}
      </div>

      {/* End */}
      <div className="flex flex-col space-y-2 justify-self-end my-auto">
        <button onClick={addItemtoBasket} className="button">
          Add to Basket
        </button>
        <button onClick={removeItemtoBasket} className="button">
          Remove from Basket
        </button>
      </div>
    </div>
  );
};

export default CheckoutProduct;
