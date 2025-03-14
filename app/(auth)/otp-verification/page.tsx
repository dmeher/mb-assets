"use client";

import { Button } from "@heroui/button";
import { useState } from "react";
import { InputOtp } from "@heroui/input-otp";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const otpLength = 6;
  const [isVerifyEnable, setIsVerifyEnable] = useState<boolean>(false);
  const [otp, setOtp] = useState<string>("");

  const router = useRouter();

  const validateOTP = (value: string) => {
    if (value.length === otpLength) {
      return true;
    } else {
      return false;
    }
  };

  const onOtpChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (validateOTP(event.target.value)) {
      setIsVerifyEnable(true);
    } else {
      setIsVerifyEnable(false);
    }
  };

  const onOtpVerify = () => {
    console.log("OTP: ", otp);
    router.push("/home");
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-[100%] flex items-center justify-start">
        {/* <div className="flex flex-col items-start justify-center"> */}
        <div className="font-bold">Verify OTP</div>
        {/* </div> */}
      </div>
      <div className="w-[100%] flex items-center justify-start pt-[1rem]">
        <InputOtp
          length={otpLength}
          value={otp}
          onValueChange={setOtp}
          onChange={onOtpChange}
          onComplete={onOtpVerify}
          color="primary"
          fullWidth
          classNames={{ segmentWrapper: "w-[100%] justify-evenly" }}
        />
      </div>
      <div className="w-[100%] flex items-center justify-center pt-[1rem]">
        <Button
          color="primary"
          fullWidth
          className="font-bold tracking-[.25rem] h-[3rem] text-large"
          isDisabled={!isVerifyEnable}
          onPress={onOtpVerify}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}
