'use client';

import { getStockBySlug } from "@/actions";
import { titleFont } from "@/config/fonts"
import { useEffect, useState } from "react";

interface Props {
  slug: string;
}

export const StockLabel = ({ slug }: Props) => {

  const [stock, setStock] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getStock();
  }, []);

  const getStock = async () => {
    const inStock = await getStockBySlug(slug);
    setStock(inStock);
    setIsLoading(false);
  }

  return (
    <>
      {
        isLoading ? (
          <h1 className={`${titleFont.className} antialiased text-mg animate-pulse bg-gray-100`}>
            &nbsp;Loading...
          </h1>
        ) : (
          <h1 className={`${titleFont.className} antialiased text-mg`}>
            Stock: {stock}
          </h1>
        )
      }
    </>
  )
}
