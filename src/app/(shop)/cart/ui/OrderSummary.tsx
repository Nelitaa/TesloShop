'use client';

import { useCartStore } from "@/store";
import { useEffect, useState } from "react";

export const OrderSummary = () => {
  const { totalItems, totalPrice, tax, subTotalPrice } = useCartStore((state) => state.getSummaryInformation());
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setLoaded(true);
  }, []);
  if (!loaded) return <p>Loading...</p>;

  return (
    <>
      <div className="grid grid-cols-2">
        <span>No Products</span>
        <span className="text-right">{totalItems === 1 ? '1 item' : `${totalItems} items`}</span>

        <span>Subtotal</span>
        <span className="text-right">${subTotalPrice}</span>

        <span>Taxes(15%)</span>
        <span className="text-right">${tax}</span>

        <span className="mt-5 text-2xl">Total: </span>
        <span className="mt-5 text-2xl text-right">${totalPrice}</span>
      </div>
    </>
  )
}