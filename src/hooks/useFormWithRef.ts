import { FieldValues, useForm, UseFormProps } from "react-hook-form";
import { useRegisterWithRef } from "./useRegisterWithRef";

export default function useFormWithRef<TFieldValues extends FieldValues = {}>(
  formProps?: UseFormProps<TFieldValues>
) {
  const methods = useForm<TFieldValues>(formProps);
  const { register } = methods;

  const { registerWithRef, instanceRef } =
    useRegisterWithRef<TFieldValues>(register);

  return { ...methods, instanceRef, registerWithRef };
}
