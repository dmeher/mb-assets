"use client";

import SearchProduct from "@/components/search";

export default function Home() {
  return (
    <div className="h-screen">
      <section className="flex flex-col items-center justify-center gap-1 px-6">
        <div className="flex items-center justify-center gap-3 w-screen">
          <i className="bi bi-geo-alt-fill text-[1.5rem] text-invert"></i>
          <div className="font-bold">Chhepapali, Nuabasti</div>
        </div>
        <SearchProduct />
      </section>
    </div>
  );
}
