import React from "react";
import PropTypes from "prop-types";
import { styles } from "./styles";

const Cars = ({
  name,
  price,
  imgSrc,
  index,
  activeIndexCar,
  setActiveIndexCar,
}) => {
  return (
    <div
      className={styles.container({ flag: index === activeIndexCar })}
      onClick={() => setActiveIndexCar(index)}
    >
      <div className={styles.car}>
        <p>{name}</p>
        <p className={styles["price-name"]}>Стоимость</p>
        <p className={styles.price}>{price}</p>
        <img src={imgSrc} alt={name} className={styles.img} />
      </div>
    </div>
  );
};

Cars.propTypes = {
  price: PropTypes.string,
  imgSrc: PropTypes.string,
  index: PropTypes.number,
  activeIndexCar: PropTypes.number,
  setActiveIndexCar: PropTypes.func,
};

export default Cars;
