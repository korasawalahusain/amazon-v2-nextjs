import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useSelector } from "react-redux";
import Header from "../components/Header";
import { getSession } from "next-auth/client";
import { loadStripe } from "@stripe/stripe-js";
import Currency from "react-currency-formatter";
import CheckoutProduct from "../components/CheckoutProduct";
import { selectItems, selectTotal } from "../slices/basketSlice";

const stripePromise = loadStripe(process.env.stripe_public_key);

const Checkout = ({ session }) => {
  const items = useSelector(selectItems);
  const total = useSelector(selectTotal);
  const createCheckoutSession = async () => {
    const stripe = await stripePromise;
    const checkoutSession = axios.post("/api/create-checkout-session", {
      items,
      email: session.user.email,
    });
    const result = await stripe.redirectToCheckout({
      sessionId: (await checkoutSession).data.id,
    });
    if (result.error) alert(result.error);
  };

  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Amazon 2.0</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto xl:flex">
        {/* Left */}
        <div className="flex-grow m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            height={250}
            width={1020}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4 font-bold">
              {items.length === 0
                ? "Your Amazon Basket is Empty"
                : "Your Shopping Basket"}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct
                key={i}
                id={item.id}
                title={item.title}
                description={item.description}
                category={item.category}
                price={item.price}
                image={item.image}
                hasPrime={item.hasPrime}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        {/* Right */}
        {items.length > 0 && (
          <div className="flex flex-col bg-white p-10 shadow-md m-5">
            <h2 className="whitespace-nowrap text-lg">
              {`Subtotal ${items.length} items: `}
              <span className="font-bold">
                {<Currency quantity={total} currency="INR" />}
              </span>
            </h2>
            <button
              role="link"
              onClick={createCheckoutSession}
              disabled={!session}
              className={`button mt-2 ${
                !session &&
                "from-gray-300 to-gray-500 border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              {!session ? "Sign in to checkout" : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Checkout;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
