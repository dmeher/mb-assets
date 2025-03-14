"use client";

import { Image } from "@heroui/image";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useState } from "react";

export default function LoginPage() {
  const mobileNoRegEx = "^[6-9]\\d{9}$";
  const [isLoginEnable, setIsLoginEnable] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");

  const validateMobileNo = (value: string) => {
    if (value.length === 10 && new RegExp(mobileNoRegEx).test(value)) {
      return true;
    } else {
      return false;
    }
  };

  const onMobileNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateMobileNo(event.target.value)) {
      setMobileNumber(event.target.value);
      setIsLoginEnable(true);
    } else {
      setIsLoginEnable(false);
    }
  };

  const resetOnClear = () => {
    setMobileNumber("");
    setIsLoginEnable(false);
  };

  const onLogin = () => {
    console.log("Mobile Number: ", mobileNumber);
  };

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
          pattern={mobileNoRegEx}
          errorMessage={<span>Please enter a valid mobile number.</span>}
          isClearable
          onChange={onMobileNoChange}
          onClear={resetOnClear}
          classNames={{
            label: "font-semibold tracking-widest",
            input: "text-[1.25rem] tracking-[.5rem] font-extrabold",
            innerWrapper: "gap-[1rem]",
          }}
        />
      </div>
      <div className="w-[100%] flex items-center justify-center pt-[1rem]">
        <Button
          color="primary"
          fullWidth
          className="font-bold tracking-[.25rem]"
          isDisabled={!isLoginEnable}
          onPress={onLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
