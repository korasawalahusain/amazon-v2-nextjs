import { buffer } from "micro";
import { db } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import moment from "moment";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const endPointSecret = process.env.STRIPE_SIGNING_SECRET;
const fullfillOrder = async (session) => {
  return setDoc(
    doc(db, "users", session.metadata.email, "orders", session.id),
    {
      amount: session.amount_total / 100,
      amount_shipping: session.total_details.amount_shipping / 100,
      images: JSON.parse(session.metadata.images),
      date: moment().format("MMMM Do YYYY, h:mm:ss a"),
    }
  );
};

export default async (req, res) => {
  if (req.method === "POST") {
    const requestBuffer = await buffer(req);
    const payload = requestBuffer.toString();
    const sig = req.headers["stripe-signature"];

    let event;

    try {
      event = stripe.webhooks.constructEvent(payload, sig, endPointSecret);
    } catch (error) {
      return res.status(400).send(`Webhook Error ${error.message}`);
    }

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      return fullfillOrder(session)
        .then(() => res.status(200))
        .catch((error) => {
          return res.status(400).send(`Webhook Error ${error.message}`);
        });
    }
  }
};

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
};
