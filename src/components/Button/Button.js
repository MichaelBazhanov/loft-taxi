import { useContext } from "react";
import { ContextMap } from "../MapContainer";

const Button = () => {
  const { addressStart, addressEnd } = useContext(ContextMap);

  return (
    <button
      type="submit"
      className="text-2xl py-4 w-full bg-yellow-me rounded-full mt-7 disabled:opacity-75"
      disabled={
        !(addressStart?.rout && addressEnd?.rout)
      }
    >
      Заказать
    </button>
  );
};

export default Button;
