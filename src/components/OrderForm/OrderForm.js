import { ContextMap } from "../MapContainer";
import SelectPoints from "../SelectPoints";
import SelectCar from "../SelectCar";
import { useContext } from "react";
import { styles } from "./styles";

const handleSubmit = (
  e,
  setActiveBlock,
  getRoutesCoordinates,
  addressStart,
  addressEnd
) => {
  e.preventDefault();

  const addressesSelected =
    addressStart && addressStart?.rout && addressEnd && addressEnd?.rout;

  if (addressesSelected) {
    setActiveBlock("next-order"); // Следующий заказ
    getRoutesCoordinates(addressStart, addressEnd);
  } else {
    throw new Error("Входящие адреса не установлены")
  }
};

const OrderForm = () => {
  const {
    width,
    address,
    addressStart,
    addressEnd,
    setAddressStart,
    setAddressEnd,
    getRoutesCoordinates,
    setActiveBlock,
  } = useContext(ContextMap);

  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            setActiveBlock,
            getRoutesCoordinates,
            addressStart,
            addressEnd
          )
        }
        className={styles.form}
      >
        <SelectPoints
          className={
            width > 640
              ? "p-6 pb-0 bg-white pointer-events-auto shadow-lg sm:shadow-none"
              : "bg-white pointer-events-auto shadow-lg sm:shadow-none p-3 pb-0 sm:hidden mt-10 rounded-xl w-full"
          }
          margin={width > 640 ? "mt-1" : "mt-0"}
          placeholders={["Откуда", "Куда"]}
          address={address}
          addressStart={addressStart}
          addressEnd={addressEnd}
          setAddressStart={setAddressStart}
          setAddressEnd={setAddressEnd}
        />

        <SelectCar />
      </form>
    </div>
  );
};

export default OrderForm;
