"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@heroui/form";

interface FieldInvalid {
  isInvalid: boolean;
  errorMessage: string;
}

interface FormValid {
  mobile: FieldInvalid;
  password: FieldInvalid;
}

export default function LoginPage() {
  const mobileNoRegEx = "^[6-9]\\d{9}$";
  const [isLoginEnable, setIsLoginEnable] = useState<boolean>(false);
  const [mobileNumber, setMobileNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isFormValid, setIsFormValid] = useState<FormValid>({
    mobile: {
      isInvalid: false,
      errorMessage: "Please enter a valid mobile number.",
    },
    password: {
      isInvalid: false,
      errorMessage: "Password must be at least 5 characters long.",
    },
  });
  const router = useRouter();

  const validateMobileNo = (value: string) => {
    if (value.length === 10 && new RegExp(mobileNoRegEx).test(value)) {
      return true;
    } else {
      return false;
    }
  };

  const validatePassword = (value: string) => {
    if (value.length >= 5) {
      return true;
    } else {
      return false;
    }
  };

  const setMobileNoInvalid = (isInvalid: boolean) => {
    setIsFormValid((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        isInvalid: isInvalid,
      },
    }));
  };

  const setPasswordInvalid = (isInvalid: boolean) => {
    setIsFormValid((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        isInvalid: isInvalid,
      },
    }));
  };

  const validate = (mobileNumber: string, password: string) => {
    if (validateMobileNo(mobileNumber) && validatePassword(password)) {
      setIsLoginEnable(true);
    } else {
      setIsLoginEnable(false);
    }
  };

  const onMobileNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNumber(event.target.value);
    setMobileNoInvalid(false);
    validate(event.target.value, password);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordInvalid(false);
    validate(mobileNumber, event.target.value);
  };

  const onPasswordBlur = () => {
    if (password.length) {
      if (validatePassword(password)) {
        setPasswordInvalid(false);
      } else {
        setPasswordInvalid(true);
      }
    } else {
      setPasswordInvalid(false);
    }
  };

  const onMobileBlur = () => {
    if (mobileNumber.length) {
      if (validateMobileNo(mobileNumber)) {
        setMobileNoInvalid(false);
      } else {
        setMobileNoInvalid(true);
      }
    } else {
      setMobileNoInvalid(false);
    }
  };

  const resetOnClearMobileNo = () => {
    setMobileNumber("");
    setMobileNoInvalid(true);
    setIsLoginEnable(false);
  };

  const resetOnClearPassword = () => {
    setPassword("");
    setPasswordInvalid(true);
    setIsLoginEnable(false);
  };

  const onLogin = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push("/admin/dashboard");
  };

  return (
    <div className="flex flex-col h-screen px-6">
      <Form onSubmit={onLogin}>
        <div className="w-[100%] flex items-center justify-start pt-[1rem]">
          <Input
            key={"mobile"}
            label="Mobile"
            labelPlacement={"outside"}
            type="tel"
            variant="underlined"
            maxLength={10}
            minLength={10}
            startContent={
              <i className="bi bi-phone text-[1.25rem] text-invert"></i>
            }
            className="w-[100%] tracking-widest"
            fullWidth
            pattern={mobileNoRegEx}
            validationBehavior="aria"
            isInvalid={isFormValid.mobile.isInvalid}
            errorMessage={isFormValid.mobile.errorMessage}
            isClearable
            onChange={onMobileNoChange}
            onBlur={onMobileBlur}
            onClear={resetOnClearMobileNo}
            classNames={{
              label: "font-semibold tracking-widest",
              input: "text-[1.25rem] tracking-[.5rem] font-extrabold",
              innerWrapper: "gap-[1rem]",
            }}
          />
        </div>
        <div className="w-[100%] flex items-center justify-start pt-[1rem]">
          <Input
            key={"password"}
            label="Password"
            labelPlacement={"outside"}
            type="password"
            variant="underlined"
            minLength={5}
            startContent={
              <i className="bi bi-lock text-[1.25rem] text-invert"></i>
            }
            className="w-[100%] tracking-widest"
            fullWidth
            validationBehavior="aria"
            isInvalid={isFormValid.password.isInvalid}
            errorMessage={isFormValid.password.errorMessage}
            isClearable
            onChange={onPasswordChange}
            onBlur={onPasswordBlur}
            onClear={resetOnClearPassword}
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
            className="font-bold tracking-[.25rem] h-[3rem] text-large"
            isDisabled={!isLoginEnable}
            type="submit"
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
