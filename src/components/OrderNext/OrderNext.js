import { ContextMap } from "../MapContainer";
import SelectPoints from "../SelectPoints";
import SelectCar from "../SelectCar";
import { useContext } from "react";
import { styles } from "./styles";
import { useEffect } from "react";

const handleSubmit = (e, getRoutesCoordinates, addressStart, addressEnd) => {
  e.preventDefault();

  const addressesSelected =
    addressStart && addressStart?.rout && addressEnd && addressEnd?.rout;

  if (addressesSelected) {
    getRoutesCoordinates(addressStart, addressEnd);
  }
};

const OrderForm = () => {
  const {
    width,
    address,
    coordinates,
    addressStart,
    addressEnd,
    setAddressStart,
    setAddressEnd,
    getRoutesCoordinates,
    setActiveBlock,
  } = useContext(ContextMap);

  useEffect(() => {
    if (coordinates && coordinates.length > 0) {
      setActiveBlock("next-order"); // Если координаты успешно получены то получаем возможность сделать Следующий заказ
    }
  }, [coordinates]);

  return (
    <div
      className={classNames(
        width < 1024 ? "mt-auto" : "",
        "max-w-[486px] w-full bg-white lg:mt-16 xl:ml-24 rounded-xl shadow-lg p-3 lg:py-10 lg:px-11 pointer-events-auto text-center lg:text-left"
      )}
    >
      <p className="font-bold text-xl lg:text-4xl">Заказ размещен</p>
      <p className="mt-3 xl:mt-4 text-base lg:text-lg text-gray-me">
        Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.
      </p>
      <button
        onClick={() => {
          resetRoutesAndAddress(); //обнуляем в redux
        }}
        type="button"
        className="text-lg lg:text-2xl py-2 lg:py-4 w-full bg-yellow-me rounded-full mt-2 lg:mt-7"
      >
        Сделать новый заказ
      </button>
    </div>
  );
};

export default OrderForm;
