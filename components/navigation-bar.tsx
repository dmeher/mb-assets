"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { useState } from "react";

export default function NavigationBar() {
  const [currentPage, setCurrentPage] = useState("shop");

  return (
    <div className="flex justify-around w-[100%] items-center">
      <Link className="flex flex-col justify-center items-center gap-[.125rem]">
        <Button
          className="flex items-center justify-center h-[2rem] w-[2rem] bg-transparent"
          onPress={() => setCurrentPage("shop")}
          isIconOnly
          variant="flat"
        >
          <i
            className={
              "bi bi-shop text-[1.75rem] " +
              (currentPage === "shop" ? "text-primary" : "text-black")
            }
          ></i>
        </Button>
        <div
          className={
            "font-semibold text-[1rem] " +
            (currentPage === "shop" ? "text-primary" : "text-black")
          }
        >
          Shop
        </div>
      </Link>
      <Link className="flex flex-col justify-center items-center gap-[.125rem]">
        <Button
          className="flex items-center justify-center h-[2rem] w-[2rem] bg-transparent"
          onPress={() => setCurrentPage("explore")}
          isIconOnly
          variant="flat"
        >
          <i
            className={
              "bi bi-search text-[1.75rem] " +
              (currentPage === "explore" ? "text-primary" : "text-black")
            }
          ></i>
        </Button>
        <div
          className={
            "font-semibold text-[1rem] " +
            (currentPage === "explore" ? "text-primary" : "text-black")
          }
        >
          Explore
        </div>
      </Link>
      <Link className="flex flex-col justify-center items-center gap-[.125rem]">
        <Button
          className="flex items-center justify-center h-[2rem] w-[2rem] bg-transparent"
          onPress={() => setCurrentPage("cart")}
          isIconOnly
          variant="flat"
        >
          <i
            className={
              "bi bi-basket text-[1.75rem] " +
              (currentPage === "cart" ? "text-primary" : "text-black")
            }
          ></i>
        </Button>
        <div
          className={
            "font-semibold text-[1rem] " +
            (currentPage === "cart" ? "text-primary" : "text-black")
          }
        >
          Cart
        </div>
      </Link>
      {/* <div className="flex flex-col justify-center items-center gap-[.125rem]">
        <div className="flex items-center justify-center h-[2rem] w-[2rem]">
          <i className="bi bi-heart text-[1.75rem] text-secondary"></i>
        </div>
        <div className="font-semibold text-secondary text-[1rem]">Favourite</div>
      </div> */}
      <Link className="flex flex-col justify-center items-center gap-[.125rem]">
        <Button
          className="flex items-center justify-center h-[2rem] w-[2rem] bg-transparent"
          onPress={() => setCurrentPage("account")}
          isIconOnly
          variant="flat"
        >
          <i
            className={
              "bi bi-person text-[1.75rem] " +
              (currentPage === "account" ? "text-primary" : "text-black")
            }
          ></i>
        </Button>
        <div
          className={
            "font-semibold text-[1rem] " +
            (currentPage === "account" ? "text-primary" : "text-black")
          }
        >
          Account
        </div>
      </Link>
    </div>
  );
}
