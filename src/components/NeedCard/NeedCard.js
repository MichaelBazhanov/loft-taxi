import { useNavigate } from "react-router-dom";
import { styles } from "./styles";

const NeedCard = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <p className={styles.title}>Заполните платежные данные</p>
      <p className={styles.subtitle}>
        Укажите информацию о платежной карте что бы сделать заказ.
      </p>
      <button
        onClick={() => navigate("/profile")}
        type="button"
        className={styles.button}
      >
        Перейти в профиль
      </button>
    </div>
  );
};

export default NeedCard;
