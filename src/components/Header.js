import {
  MenuIcon,
  ShoppingCartIcon,
  SearchIcon,
} from "@heroicons/react/outline";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import { signIn, signOut, useSession } from "next-auth/client";

const Header = () => {
  const [session] = useSession();
  const router = useRouter();
  const items = useSelector(selectItems);
  return (
    <header>
      {/* Top Nav */}
      <div className="flex items-center bg-amazon_blue p-1 py-2 flex-grow">
        {/* Amazon Icon */}
        <div className="mt-2 flex flex-grow items-center sm:flex-grow-0">
          <Image
            src="https://links.papareact.com/f90"
            height={40}
            width={150}
            objectFit="contain"
            className="cursor-pointer"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Search Bar */}
        <div className="hidden sm:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>

        {/* Right */}
        <div className="text-white flex items-center space-x-6 mx-6 text-xs whitespace-nowrap">
          <div
            className="link cursor-pointer"
            onClick={!session ? signIn : signOut}
          >
            <p>{!session ? "Sign in" : `Hello, ${session.user.name}`}</p>
            <p className="font-extrabold md:text-sm">Accounts & Lists</p>
          </div>
          <div
            onClick={() => router.push("/orders")}
            className="link cursor-pointer"
          >
            <p>Returns</p>
            <p className="font-extrabold lg:text-sm">& Orders</p>
          </div>
          <div
            onClick={() => router.push("/checkout")}
            className="link flex relative items-center cursor-pointer"
          >
            <span className="absolute top-0 right-0 md:right-10 h-4 w-4 text-center bg-yellow-400 rounded-full text-black font-bold">
              {items.length}
            </span>
            <ShoppingCartIcon className="h-10" />
            <p className="hidden lg:inline font-extrabold md:text-sm mt-2">
              Basket
            </p>
          </div>
        </div>
      </div>
      {/* Bottum Nav */}
      <div className="flex items-center space-x-4 p-2 pl-6 bg-amazon_blue-light text-white text-sm">
        <p className="link flex items-center">
          <MenuIcon className="h-6 mr-1" />
          All
        </p>
        <p className="link">Prime Video</p>
        <p className="link">Amazon Business</p>
        <p className="link">Today's Deals</p>
        <p className="link hidden xl:inline-flex">Electronics</p>
        <p className="link hidden xl:inline-flex">Food & Grocery</p>
        <p className="link hidden xl:inline-flex">Prime</p>
        <p className="link hidden xl:inline-flex">Buy Again</p>
        <p className="link hidden xl:inline-flex">Shopper's Toolkit</p>
        <p className="link hidden xl:inline-flex">Health & Personal Care</p>
      </div>
    </header>
  );
};

export default Header;
