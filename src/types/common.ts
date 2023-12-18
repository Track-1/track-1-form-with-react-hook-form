import { FieldValues, useForm } from "react-hook-form";

export type Unpack<T> = T extends (infer U)[] ? U : T;

export type RegisterOption<TFieldValues extends FieldValues> = Parameters<
  ReturnType<typeof useForm<TFieldValues>>["register"]
> extends [unknown, ...infer U]
  ? Unpack<U>
  : never;
