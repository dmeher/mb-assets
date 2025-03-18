"use client";

import { Product } from "@/app/api/products/route";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProductsProps {
  callback: (products: Product[]) => void;
}

export default function Products({ callback }: Readonly<ProductsProps>) {
  const [productList, setProductList] = useState<Product[]>([]);

  const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get("/api/products");
    return response.data;
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
    <section className="flex flex-col items-center justify-center gap-1">
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
