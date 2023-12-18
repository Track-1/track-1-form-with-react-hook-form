import { FieldValues, useFormContext } from "react-hook-form";

export function useValidFormContext<TFieldValues extends FieldValues>() {
  const context = useFormContext<TFieldValues>();

  if (context) {
    return context;
  }

  throw Error("use this method in valid scope!");
}
