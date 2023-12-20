import { FieldValues, useForm } from "react-hook-form";
import { useRegisterWithRef } from "./useRegisterWithRef";

export default function useFormWithRef<TFieldValues extends FieldValues = {}>(
  fieldValues?: TFieldValues
) {
  const methods = useForm<TFieldValues>(fieldValues);
  const { register } = methods;

  const { registerWithRef, instanceRef } =
    useRegisterWithRef<TFieldValues>(register);

  return { ...methods, instanceRef, registerWithRef };
}
