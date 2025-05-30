import { useEffect } from "react";
import { useCountStore } from "../stores/countStore";
import CountButtons from "./CountButtons";
import CountDisplay from "./CountDisplay";

export default function App() {
  useEffect(() => {
    const unSubscribe = useCountStore.subscribe(
      (state) => state.count,
      (newCount) => {
        console.log("new Count: ", newCount);
      }
    );
    return () => {
      unSubscribe();
    };
  }, []);
  return (
    <>
      <CountDisplay />
      <CountButtons />
    </>
  );
}
