import { type Dispatch, type SetStateAction, useState } from "react";

interface ReturnType {
  value: boolean;
  setValue: Dispatch<SetStateAction<boolean>>;
  setTrue: () => void;
  setFalse: () => void;
  toggle: () => void;
}

export default function useBoolean(defaultValue?: boolean): ReturnType {
  const [value, setValue] = useState(!!(defaultValue ?? false));

  const setTrue = (): void => {
    setValue(true);
  };
  const setFalse = (): void => {
    setValue(false);
    document.getElementsByTagName('html')[0].style.overflow = 'unset';
  };
  const toggle = (): void => {
    setValue((x) => !x);
  };

  return { value, setValue, setTrue, setFalse, toggle };
}
