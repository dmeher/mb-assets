"use client";

import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Form } from "@heroui/form";

interface FieldData {
  isValid: boolean;
  errorMessage: string;
  value: string;
  showError: boolean;
}

interface FormData {
  mobile: FieldData;
  password: FieldData;
}

export default function LoginPage() {
  const mobileNoRegEx = "^[6-9]\\d{9}$";
  const [formData, setFormData] = useState<FormData>({
    mobile: {
      isValid: false,
      errorMessage: "Please enter a valid mobile number.",
      value: "",
      showError: false,
    },
    password: {
      isValid: false,
      errorMessage: "Password must be at least 5 characters long.",
      value: "",
      showError: false,
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

  const setMobileNoValid = (isValid: boolean) => {
    setFormData((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        isValid,
      },
    }));
  };

  const setPasswordValid = (isValid: boolean) => {
    setFormData((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        isValid,
      },
    }));
  };

  const setMobileNoShowError = (showError: boolean) => {
    setFormData((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        showError,
      },
    }));
  };

  const setPasswordShowError = (showError: boolean) => {
    setFormData((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        showError,
      },
    }));
  };

  const setMobileNo = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      mobile: {
        ...prev.mobile,
        value,
      },
    }));
  };

  const setPassword = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      password: {
        ...prev.password,
        value,
      },
    }));
  };

  const validate = (mobileNumber: string, password: string) => {
    if (validateMobileNo(mobileNumber)) {
      setMobileNoValid(true);
    } else {
      setMobileNoValid(false);
    }

    if (validatePassword(password)) {
      setPasswordValid(true);
    } else {
      setPasswordValid(false);
    }
  };

  const onMobileNoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMobileNo(event.target.value);
    setMobileNoShowError(false);
    validate(event.target.value, formData.password.value);
  };

  const onPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
    setPasswordShowError(false);
    validate(formData.mobile.value, event.target.value);
  };

  const onPasswordBlur = () => {
    if (formData.password.value.length) {
      if (validatePassword(formData.password.value)) {
        setPasswordValid(true);
        setPasswordShowError(false);
      } else {
        setPasswordValid(false);
        setPasswordShowError(true);
      }
    } else {
      setPasswordValid(false);
      setPasswordShowError(false);
    }
  };

  const onMobileBlur = () => {
    if (formData.mobile.value.length) {
      if (validateMobileNo(formData.mobile.value)) {
        setMobileNoValid(true);
        setMobileNoShowError(false);
      } else {
        setMobileNoValid(false);
        setMobileNoShowError(true);
      }
    } else {
      setMobileNoValid(false);
      setMobileNoShowError(false);
    }
  };

  const resetOnClearMobileNo = () => {
    setMobileNo("");
    setMobileNoValid(false);
  };

  const resetOnClearPassword = () => {
    setPassword("");
    setPasswordValid(false);
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
            isInvalid={!formData.mobile.isValid && formData.mobile.showError}
            errorMessage={formData.mobile.errorMessage}
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
            isInvalid={
              !formData.password.isValid && formData.password.showError
            }
            errorMessage={formData.password.errorMessage}
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
            isDisabled={!formData.mobile.isValid || !formData.password.isValid}
            type="submit"
          >
            Login
          </Button>
        </div>
      </Form>
    </div>
  );
}
