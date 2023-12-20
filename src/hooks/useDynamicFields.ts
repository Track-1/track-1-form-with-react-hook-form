import {
  FieldValues,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormGetValues,
} from "react-hook-form";
import { checkIsDuplicated } from "../utils/checkDuplicated";

type FieldArrayType<T extends string> = {
  append: UseFieldArrayAppend<FieldValues, T>;
  remove: UseFieldArrayRemove;
  fields: Record<"id", string>[];
};

type FormContextType = {
  instanceRef: React.MutableRefObject<HTMLInputElement | undefined>;
  getValues: UseFormGetValues<FieldValues>;
};

export default function useDynamicFields<T extends FieldValues>(
  formContext: FormContextType,
  fieldArray: FieldArrayType<keyof FieldValues>,
  fieldName: T
) {
  const { instanceRef, getValues } = formContext;
  const { append, remove, fields } = fieldArray;
  const idx = Number(instanceRef.current?.name.split(".")[1]);

  const checkFieldValueDuplicated = (alertMessage?: string) => {
    if (instanceRef.current === undefined) return;

    if (
      idx > 0 &&
      checkIsDuplicated(
        getValues(`${fieldName}.${idx}`),
        getValues(`${fieldName}`).slice(0, getValues(`${fieldName}`).length - 1)
      )
    ) {
      alertMessage ?? alert(alertMessage);
      instanceRef.current.autofocus = true;
      return;
    }
  };

  const lockDynamicField = () => {
    if (instanceRef.current === undefined) return;

    instanceRef.current.readOnly = true;
  };

  const appendDynamicField = (fieldLimit?: number) => {
    if (fieldLimit && fields.length > fieldLimit) return;

    append("");
  };

  const handleKeyDownEnter = (
    e: React.KeyboardEvent<HTMLInputElement>,
    handleFieldCallbacks?: (() => void)[]
  ) => {
    if (instanceRef.current === undefined) return;

    if (e.code === "Enter") {
      handleFieldCallbacks?.forEach((callback) => {
        callback?.();
      });
    }
  };

  const deleteDynamicField = <T extends HTMLElement>(
    e: React.MouseEvent<T>,
    idx: number,
    appendNewFiled?: boolean
  ) => {
    const deleteTarget = e.target as T;

    deleteTarget.style.display = "none";

    remove(idx);
    appendNewFiled ?? append("");
  };

  const activeField = () => {
    if (instanceRef.current === undefined) return;

    if (instanceRef.current.value === "") {
      instanceRef.current.readOnly = false;
    }
  };

  const clickOutside = (
    e: Event,
    ignoredTarget?: HTMLElement,
    handleFieldCallbacks?: (() => void)[]
  ) => {
    if (instanceRef.current === undefined) return;

    const target = e.target as HTMLElement;

    if (ignoredTarget && Number(target.dataset.idx) === idx) return;

    handleFieldCallbacks?.forEach((callback) => {
      callback?.();
    });
  };

  return {
    handleKeyDownEnter,
    checkFieldValueDuplicated,
    lockDynamicField,
    appendDynamicField,
    deleteDynamicField,
    activeField,
    clickOutside,
  };
}
