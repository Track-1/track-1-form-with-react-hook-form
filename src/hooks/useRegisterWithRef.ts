import { useRef } from "react";
import { FieldValues, Path, UseFormRegister } from "react-hook-form";
import { RegisterOption } from "../types/common";

export function useRegisterWithRef<TFieldValues extends FieldValues>(
  register: UseFormRegister<TFieldValues>
) {
  const instanceRef = useRef<HTMLInputElement>();

  function createRegister(
    fieldName: Path<TFieldValues>,
    registerOptions: RegisterOption<TFieldValues>
  ) {
    return register(fieldName, registerOptions);
  }

  function registerWithRef(
    fieldName: Path<TFieldValues>,
    registerOptions: RegisterOption<TFieldValues>
  ) {
    const register = createRegister(fieldName, registerOptions);

    const ref = (instance: HTMLInputElement | null) => {
      if (!instance) return;

      instanceRef.current = instance;

      register.ref(instance);
    };

    return { ...register, ref };
  }

  return { registerWithRef, instanceRef };
}
