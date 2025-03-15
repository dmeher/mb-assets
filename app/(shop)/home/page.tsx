"use client";

import { Input } from "@heroui/input";

export default function Home() {
  return (
    <div className="h-screen">
      <section className="flex flex-col items-center justify-center gap-1 px-6">
        <div className="flex items-center justify-center gap-3 w-screen">
          <i className="bi bi-geo-alt-fill text-[1.5rem] text-invert"></i>
          <div className="font-bold">Chhepapali, Nuabasti</div>
        </div>
        <div className="w-[80%]">
          <Input
            variant="faded"
            startContent={
              <i className="bi bi-search text-[1.25rem] pr-[.5rem]"></i>
            }
            classNames={{ inputWrapper: "h-[3rem]", input: "text-[1rem]" }}
            color="primary"
            isClearable
          />
        </div>
      </section>
    </div>
  );
}
