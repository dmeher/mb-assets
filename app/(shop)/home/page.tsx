"use client";

import { Input } from "@heroui/input";

export default function Home() {
  return (
    <div className="h-screen">
      <section className="flex flex-col items-center justify-center gap-4 px-6">
        <div className="flex items-center justify-center gap-3 w-screen">
          <i className="bi bi-geo-alt-fill text-[1.5rem] text-invert"></i>
          <div className="font-bold">Chhepapali, Nuabasti</div>
        </div>
        <div className="w-[100%]">
          <Input
            variant="bordered"
            endContent={
              <i className="bi bi-search text-[1.5rem] text-primary pr-[1rem]"></i>
            }
            classNames={{ inputWrapper: "h-[3.5rem] border-primary", input: "text-[1.25rem]" }}
            color="primary"
          />
        </div>
      </section>
    </div>
  );
}
