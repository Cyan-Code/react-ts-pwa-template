import { useCounter } from "../hooks/useCounter";

export const Counter = () => {
  const {value, handleCounter, setValue} = useCounter();
  return <>
  <div className="counter">
    <div>
      <div>
        <span> {value.valor1} </span>
      </div>
      <div>
        <button
          className="button"
          onClick={()=>handleCounter('valor1')}
        >
          + 1
        </button>
      </div>
    </div>
    <div>
      <button
        className="button-reload"
        onClick={()=> setValue({valor1:0,valor2:0})}> Reiniciar </button>
    </div>
    <div>
      <div>
        <span> {value.valor2} </span>
      </div>
      <div>
        <button
          className="button"
          onClick={()=>handleCounter('valor2')}
        > + 1 </button>
      </div>
    </div>
  </div>
  </>;
};
