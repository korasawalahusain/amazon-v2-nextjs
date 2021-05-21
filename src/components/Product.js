import Image from "next/image";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Currency from "react-currency-formatter";
import { StarIcon } from "@heroicons/react/solid";
import { addToBasket } from "../slices/basketSlice";

const MAX_RATING = 5;
const MIN_RATING = 1;
const Product = ({ id, title, price, description, image, category }) => {
  const [hasPrime, setHasPrime] = useState(Math.random() < 0.5);
  const [rating, setRating] = useState(
    Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING
  );
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
  return (
    <div className="relative flex flex-col m-5 z-30 p-10 bg-white">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image src={image} height={200} width={200} objectFit="contain" />
      <h4 className="my-3 font-bold">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon className="h-5 text-yellow-500" key={i} />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5 font-bold">
        <Currency quantity={price} currency="GBP" />
      </div>
      {hasPrime && (
        <div className="-mt-5 flex items-center space-x-2">
          <img src="https://links.papareact.com/fdw" alt="" className="w-12" />
          <p className="text-xs text-gray-500">Free Next-Day Delivery</p>
        </div>
      )}
      <button onClick={addItemtoBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
};

export default Product;
