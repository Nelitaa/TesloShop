'use client';

import { QuantitySelector, SizeSelector } from "@/components"
import type { Product, Size } from "@/interfaces"
import { useState } from "react";

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();

  return (
    <>
      <SizeSelector
        onSizeChanged={setSize}
        selectedSize={size}
        availableSizes={product.sizes}
      />
      <QuantitySelector quantity={2} />
      <button className="btn-primary my-5">Add to cart</button>
    </>
  )
}
