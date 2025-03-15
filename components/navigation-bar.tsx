"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useState } from "react";

export default function NavigationBar() {
  const [currentPage, setCurrentPage] = useState("shop");

  return (
    <div className="flex justify-around w-[100%] items-center h-[4rem]">
      <Link className="flex justify-center items-center">
        <Button
          className="flex flex-col gap-[.125rem] items-center justify-center h-[2rem] w-[2rem] bg-transparent overflow-visible"
          onPress={() => setCurrentPage("shop")}
          isIconOnly
          variant="flat"
        >
          <i
            className={
              "bi bi-shop text-[1.75rem] " +
              (currentPage === "shop" ? "text-primary" : "text-invert")
            }
          ></i>
          <div
            className={
              "font-semibold text-[1rem] pt-[.5rem] " +
              (currentPage === "shop" ? "text-primary" : "text-invert")
            }
          >
            Shop
          </div>
        </Button>
      </Link>
      <Link className="flex justify-center items-center">
        <Button
          className="flex flex-col gap-[.125rem] items-center justify-center h-[2rem] w-[2rem] bg-transparent overflow-visible"
          onPress={() => setCurrentPage("explore")}
          isIconOnly
          variant="flat"
        >
          <i
            className={
              "bi bi-search text-[1.75rem] " +
              (currentPage === "explore" ? "text-primary" : "text-invert")
            }
          ></i>
          <div
            className={
              "font-semibold text-[1rem] pt-[.5rem] " +
              (currentPage === "explore" ? "text-primary" : "text-invert")
            }
          >
            Explore
          </div>
        </Button>
      </Link>
      <Link className="flex justify-center items-center">
        <Button
          className="flex flex-col gap-[.125rem] items-center justify-center h-[2rem] w-[2rem] bg-transparent overflow-visible"
          onPress={() => setCurrentPage("cart")}
          isIconOnly
          variant="flat"
        >
          <i
            className={
              "bi bi-basket text-[1.75rem] " +
              (currentPage === "cart" ? "text-primary" : "text-invert")
            }
          ></i>
          <div
            className={
              "font-semibold text-[1rem] pt-[.5rem] " +
              (currentPage === "cart" ? "text-primary" : "text-invert")
            }
          >
            Cart
          </div>
        </Button>
      </Link>
      <Link className="flex justify-center items-center">
        <Button
          className="flex flex-col gap-[.125rem] items-center justify-center h-[2rem] w-[2rem] bg-transparent overflow-visible"
          onPress={() => setCurrentPage("account")}
          isIconOnly
          variant="flat"
        >
          <i
            className={
              "bi bi-person text-[1.75rem] " +
              (currentPage === "account" ? "text-primary" : "text-invert")
            }
          ></i>
          <div
            className={
              "font-semibold text-[1rem] pt-[.5rem] " +
              (currentPage === "account" ? "text-primary" : "text-invert")
            }
          >
            Account
          </div>
        </Button>
      </Link>
    </div>
  );
}
