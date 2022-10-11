import { ContextMap } from "../MapContainer";
import { useContext } from "react";
import { styles } from "./styles";

const OrderNext = () => {
  const { resetRoutesAndAddress } = useContext(ContextMap);

  return (
    <div className={styles.container}>
      <p className={styles.title}>Заказ размещен</p>
      <p className={styles.subtitle}>
        Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.
      </p>
      <button
        onClick={() => resetRoutesAndAddress()}
        type="button"
        className={styles.button}
      >
        Сделать новый заказ
      </button>
    </div>
  );
};

export default OrderNext;
