import { Title } from "@/components";

import Link from "next/link";
import Image from "next/image";
import { ProductsInCart } from "./ui/ProductsInCart";



export default function CheckoutPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Check Order" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          <div className="flex flex-col mt-5">
            <span className="text-xl">Adjust elements</span>
            <Link href="/cart" className="underline mb-5">Edit Shopping Cart</Link>
            <ProductsInCart />
          </div>
          {/* Summary */}
          <div className="bg-white rounded-xl shadow-xl p-7">
            <h2 className="text-2xl mb-2 font-bold">Delivery Address</h2>
            <div className="mb-10">
              <p className="text-xl">John Doe</p>
              <p className="text-sm">1234 Main Street</p>
              <p className="text-sm">City, State, 12345</p>
              <p className="text-sm">United States</p>
            </div>
            {/* Divider  */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2 font-bold">Order Summary</h2>
            <div className="grid grid-cols-2">
              <span>No Products</span>
              <span className="text-right">3 items</span>

              <span>Subtotal</span>
              <span className="text-right">$ 100</span>

              <span>Taxes(15%)</span>
              <span className="text-right">$ 115</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">$ 115</span>
            </div>

            <div className="mt-5 mb-2 w-full">
              {/* Disclaimer */}
              <p className="mb-5">
                <span className="text-xs">By placing your order, you agree to our <Link href="#" className="underline">Terms of Service</Link> and <Link href="#" className="underline">Privacy Policy</Link></span>
              </p>
              <Link
                className="flex btn-primary justify-center"
                href="/orders/123"
              >
                Place Order
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}