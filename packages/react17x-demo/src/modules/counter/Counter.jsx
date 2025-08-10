import { useSelector, useDispatch } from "react-redux";
import { Button } from "antd";
export default function Counter() {
  const value = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div>
      <Button onClick={() => dispatch({ type: "counter/increment" })}>+</Button>
      <span>{value}</span>
      <Button onClick={() => dispatch({ type: "counter/decrement" })}>-</Button>
    </div>
  );
}
