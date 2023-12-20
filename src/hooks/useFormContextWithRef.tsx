import { FieldValues } from "react-hook-form";
import { useRegisterWithRef } from "./useRegisterWithRef";
import { useValidFormContext } from "./useValidFormContext";

export default function useFormContextWithRef<
  TFieldValues extends FieldValues
>() {
  const methods = useValidFormContext<TFieldValues>();
  const { register } = methods;

  const { registerWithRef, instanceRef } =
    useRegisterWithRef<TFieldValues>(register);

  return { ...methods, instanceRef, registerWithRef };
}
