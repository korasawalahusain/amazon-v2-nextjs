import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Order from "../components/Order";
import Header from "../components/Header";
import { getSession } from "next-auth/client";
import Head from "next/head";

const Orders = ({ orders, session }) => {
  return (
    <div>
      <Head>
        <title>Orders</title>
      </Head>
      <Header />
      <main className="max-w-screen-2xl mx-auto p-10">
        <h1 className="font-bold text-3xl border-b mb-2 pb-1 border-yellow-400">
          Your Orders
        </h1>
        {session ? (
          <h1>{orders.length} Orders</h1>
        ) : (
          <h1>Please sign in to see your orders</h1>
        )}
        <div className="mt-5 space-y-4">
          {orders?.map(
            ({ id, amount, amountShipping, items, date, images }, i) => (
              <Order
                key={i}
                id={id}
                amount={amount}
                amountShipping={amountShipping}
                items={items}
                date={date}
                images={images}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
};

export default Orders;

export async function getServerSideProps(context) {
  const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
    };
  }

  const docRef = collection(db, "users", session.user.email, "orders");
  const stripeOrders = await getDocs(docRef);

  const orders = await Promise.all(
    stripeOrders.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      date: order.data().date,
      items: (
        await stripe.checkout.sessions.listLineItems(order.id, {
          limit: 100,
        })
      ).data,
    }))
  );
  return {
    props: {
      orders,
      session,
    },
  };
}
