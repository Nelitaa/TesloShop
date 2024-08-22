'use client';

import { placeOrder } from "@/actions";
import { useAddressStore, useCartStore } from "@/store";
import { currencyFormat, sleep } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";

export const PlaceOrder = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const address = useAddressStore((state) => state.address);
  const { totalItems, subTotalPrice, tax, totalPrice } = useCartStore((state) => state.getSummaryInformation());
  const cart = useCartStore(state => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    // await sleep(2);
    const productsToOrder = cart.map(product => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }));

    await placeOrder(productsToOrder, address);
    setIsPlacingOrder(false);
  }

  if (!loaded) {
    return <p>Loading...</p>
  }
  return (
    <div className="bg-white rounded-xl shadow-xl p-7">
      <h2 className="text-2xl mb-2 font-bold">Delivery Address</h2>
      <div className="mb-10">
        <p className="text-xl">{address.firstName} {address.lastName}</p>
        <p className="text-sm">{address.address}</p>
        <p className="text-sm">{address.address2}</p>
        <p className="text-sm">{address.postalCode}</p>
        <p className="text-sm">{address.city}, {address.country}</p>
        <p className="text-sm">{address.phone}</p>
      </div>
      {/* Divider  */}
      <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

      <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>
      <div className="grid grid-cols-2">
        <span>No Products</span>
        <span className="text-right">{totalItems === 1 ? '1 item' : `${totalItems} items`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotalPrice)}</span>

        <span>Taxes(15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total: </span>
        <span className="mt-5 text-2xl text-right">{currencyFormat(totalPrice)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        {/* Disclaimer */}
        <p className="mb-5">
          <span className="text-xs">By placing your order, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link></span>
        </p>
        {/* <p className="text-red-500">Order creation error</p> */}
        <button
          onClick={onPlaceOrder}
          className={
            clsx({
              'btn-primary': !isPlacingOrder,
              'btn-disabled': isPlacingOrder
            })
          }
        >
          Place Order
        </button>
      </div>
    </div >
  )
}
