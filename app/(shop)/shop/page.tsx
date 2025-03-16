"use client";

import SearchProduct from "@/components/search";
import { Product } from "@/app/api/products/route";
import { useState } from "react";
import Products from "./products";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = (products: Product[]) => {
    setProducts(products);
  };

  return (
    <div className="h-screen">
      <section className="flex flex-col items-center justify-center gap-1 px-6">
        <div className="flex items-center justify-center gap-3 w-screen">
          <i className="bi bi-geo-alt-fill text-[1.5rem] text-invert"></i>
          <div className="font-bold">Chhepapali, Nuabasti</div>
        </div>
        <SearchProduct products={products} />
        <Products callback={getProducts} />
      </section>
    </div>
  );
}
