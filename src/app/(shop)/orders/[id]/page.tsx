import { PayPalButton, Title } from "@/components";
import Image from "next/image";
import clsx from "clsx";
import { IoCardOutline } from "react-icons/io5";
import { getOrderById } from "@/actions";
import { redirect } from "next/navigation";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params;
  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect('/')
  }

  const address = order?.OrderAddress;

  return (
    <div className="flex justify-center items-center mb-72 p-10 sm:px-0">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full">
        <div>
          <Title title={`Order #${id.split('-').at(-1)}`} />
          <div className="flex flex-col mt-5">
            <div className={
              clsx(
                "flex items-center rounded-lg py-2 px-3.5 text-xs font-bold text-white mb-5",
                {
                  'bg-red-500': !order!.isPaid,
                  'bg-green-500': order!.isPaid,
                }
              )
            }>
              <IoCardOutline size={30} />
              <span className="mx-2">
                {
                  order?.isPaid ? 'Paid' : 'Not Paid'
                }
              </span>
            </div>
          </div>
          {
            order!.OrderItem.map(item => (
              <div key={item.product.slug + '-' + item.size} className="flex mb-5">
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  alt={item.product.title}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{item.product.title}</p>
                  <p>{currencyFormat(item.price)} x {item.quantity} </p>
                  <p className="font-bold">Subtotal: {currencyFormat(item.price * item.quantity)}</p>
                  <button className="underline mt-3">Remove</button>
                </div>
              </div>
            ))
          }
        </div>
        {/* Summary */}
        <div className="bg-white rounded-xl shadow-xl p-7">
          <h2 className="text-2xl mb-2 font-bold">Delivery Address</h2>
          <div className="mb-10">
            <p className="text-xl">{address?.firstName} {address?.lastName}</p>
            <p className="text-sm">{address?.address}</p>
            <p className="text-sm">{address?.address2}</p>
            <p className="text-sm">{address?.postalCode}</p>
            <p className="text-sm">{address?.city}, {address?.countryId}</p>
            <p className="text-sm">{address?.phone}</p>
          </div>
          {/* Divider  */}
          <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

          <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>
          <div className="grid grid-cols-2">
            <span>No Products</span>
            <span className="text-right">{order?.totalItems === 1 ? '1 item' : `${order?.totalItems} items`}</span>

            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(order!.subTotalPrice)}</span>

            <span>Taxes(15%)</span>
            <span className="text-right">{currencyFormat(order!.tax)}</span>

            <span className="mt-5 text-2xl">Total: </span>
            <span className="mt-5 text-2xl text-right">{currencyFormat(order!.totalPrice)}</span>
          </div>

          <div className="mt-5 mb-2 w-full">
            <PayPalButton />
          </div>
        </div>
      </div>
    </div>
  );
}