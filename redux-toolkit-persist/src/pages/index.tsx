import type { NextPage } from "next";
import { useCounter } from "state/counter.slice";

const PageHome: NextPage = () => {
  const [counterState, counterActions] = useCounter();

  return (
    <div>
      <button onClick={counterActions.increment}>+</button>

      <button onClick={counterActions.decrement}>-</button>
      <pre>{JSON.stringify(counterState, null, 4)}</pre>
    </div>
  );
};

export default PageHome;
