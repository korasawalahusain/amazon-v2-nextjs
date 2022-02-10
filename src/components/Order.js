import Currency from "react-currency-formatter";

const Order = ({ id, amount, amountShipping, items, date, images }) => {
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 text-sm bg-gray-100 text-gray-600">
        <div>
          <p className="font-bold text-xs">ORDERS PLACES</p>
          <p>{date}</p>
        </div>
        <div>
          <p className="text-xs font-bold">TOTAL</p>
          <Currency quantity={amount} currency="INR" /> - Next-Day Delivery{" "}
          <Currency quantity={amountShipping} currency="INR" />
        </div>

        <p className="text-sm whitespace-nowrap lg:text-xl flex-1 self-end text-right text-blue-500">
          {items.length} items
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate text-xs whitespace-nowrap">
          ORDER # {id}
        </p>
      </div>

      <div className="p-5 sm:p-10">
        <div className="flex space-x-10 overflow-x-auto">
          {images.map((image, i) => (
            <img
              src={image}
              key={i}
              alt=""
              className="h-20 object-contain sm:h-32"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Order;
