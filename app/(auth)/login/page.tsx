import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import "./style.css"

export default function LoginPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="w-[100%] flex items-center justify-center">
        <Image
          alt="HeroUI hero Image"
          src="./images/GroceryImage.png"
          className="w-[100%] md:w-[300] lg:w-[300] xl:w-[300]"
        />
      </div>
      <div className="w-[100%] flex items-center justify-start">
        <div className="flex flex-col items-start justify-center">
          <div className="font-bold">Get your groceries with</div>
          <div className="font-extrabold">MB Grocery</div>
        </div>
      </div>
      <div className="w-[100%] flex items-center justify-start pt-[1rem]">
        <div className="w-[100%] flex flex-col items-start justify-center">
          <Input
            key={"mobile"}
            label="Mobile"
            labelPlacement={"outside"}
            type="tel"
            variant="underlined"
            maxLength={10}
            minLength={10}
            startContent={<Image src="./images/IN.png" className="w-[2rem]" />}
            className="w-[100%] tracking-widest"
            fullWidth
            classNames={{input: "text-[1.25rem] tracking-[.5rem] font-extrabold", innerWrapper: "gap-[1rem]"}}
          />
        </div>
      </div>
    </div>
  );
}
