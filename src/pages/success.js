import { useRouter } from "next/router";
import Header from "../components/Header";
import { getSession } from "next-auth/client";
import { CheckCircleIcon } from "@heroicons/react/solid";
import Head from "next/head";

const Success = () => {
  const router = useRouter();
  return (
    <div className="bg-gray-100 h-screen">
      <Head>
        <title>Success</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto">
        <div className="flex flex-col p-10 bg-white">
          <div className="flex items-center space-x-2 mb-5">
            <CheckCircleIcon className="h-10 text-green-500" />
            <h1 className="text-3xl font-bold">
              Thank You, Your order har been confirmed
            </h1>
          </div>
          <p>
            Thank You for shopping with us. We'll send a confirmation once the
            item is shipped, if you would like to check the status of your
            order(s) please press the link below.
          </p>
          <button
            onClick={() => router.push("/orders")}
            className="button mt-8"
          >
            Go to my orders
          </button>
        </div>
      </main>
    </div>
  );
};

export default Success;

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
