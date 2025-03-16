"use client";

import { Product } from "@/app/api/products/route";
import { useEffect, useState } from "react";

interface ProductsProps {
  callback: (products: Product[]) => void;
}

export default function Products({ callback }: Readonly<ProductsProps>) {
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProducts = async (): Promise<Product[]> => {
    const data = await fetch("/api/products");
    return data.json();
  };

  useEffect(() => {
    fetchProducts().then((response) => {
      const products = response;
      setProductList(products);
      callback(products);
      products.forEach((product) => {
        console.log(product.product_name);
      });
    });
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-1 px-6">
      {productList.map((product) => {
        return (
          <div
            className="flex items-center justify-center gap-3 w-screen"
            key={product.sku}
          >
            <div className="font-bold">{product.product_name}</div>
          </div>
        );
      })}
    </section>
  );
}
