import { useCountStore } from "../stores/countStore";

export default function CountButtons() {
  const decrement = useCountStore((state) => state.decrement);
  const reset = useCountStore((state) => state.reset);
  const increment = useCountStore((state) => state.increment);
  return (
    <>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>0</button>
      <button onClick={increment}>+</button>
    </>
  );
}
