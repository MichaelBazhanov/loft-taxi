import { ContextMap } from "../MapContainer";
import SelectPoints from "../SelectPoints";
import SelectCar from "../SelectCar";
import { useContext } from "react";

const handleSubmit = (
  e,
  setActiveBlock,
  getRoutesCoordinates,
  addressStart,
  addressEnd
) => {
  e.preventDefault();
  setActiveBlock("next-order"); // Следующий заказ

  if (addressStart && addressEnd && addressStart.rout && addressEnd.rout) {
    getRoutesCoordinates(addressStart, addressEnd);
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
    <div className="flex flex-col h-full">
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
        className="sm:max-w-[486px]  w-full sm:mt-16 lg:ml-24 rounded-xl sm:shadow-lg
    flex flex-col h-full sm:h-auto sm:bg-white
    "
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
