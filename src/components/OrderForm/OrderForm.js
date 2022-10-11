import { ContextMap } from "../MapContainer";
import SelectPoints from "../SelectPoints";
import SelectCar from "../SelectCar";
import { useContext } from "react";
import { styles } from "./styles";
import { useEffect } from "react";

const handleSubmit = (
  e,
  getRoutesCoordinates,
  addressStart,
  addressEnd,
) => {
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
      setActiveBlock("order-next"); // Если координаты успешно получены то получаем возможность сделать Следующий заказ
    }
  }, [coordinates]);



  return (
    <div className={styles.container}>
      <form
        onSubmit={(e) =>
          handleSubmit(
            e,
            getRoutesCoordinates,
            addressStart,
            addressEnd,
            setActiveBlock
          )
        }
        className={styles.form}
      >
        <SelectPoints
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
