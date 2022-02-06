import { useState } from "react";
import { counterState } from "../interfaces/Prompt";


export const useCounter = () => {
  const [value, setValue] = useState<counterState>({
    valor1: 0,
    valor2: 0
  });

  const handleCounter = (type:string) => {
    if (type === 'valor1') {
      setValue({
        ...value,
        valor1: value.valor1 + 1
      })
    } else {
      setValue({
        ...value,
        valor2: value.valor2 + 1
      })
    }
  }
  return { 
    handleCounter,
    value,
    setValue
  }
};
