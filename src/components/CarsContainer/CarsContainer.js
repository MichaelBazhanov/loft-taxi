import { useContext } from "react";
import { ContextMap } from "../MapContainer";
import Car from "../Car";

import imgStandart from "../../assets/images/car-standart.jpg";
import imgPremium from "../../assets/images/car-premium.jpg";
import imgBusiness from "../../assets/images/car-business.jpg";

// fake data
const data = [
  {
    name: "Стандарт",
    price: "150 ₽",
    imgSrc: imgStandart,
  },
  {
    name: "Премиум",
    price: "250 ₽",
    imgSrc: imgPremium,
  },
  {
    name: "Бизнес",
    price: "350 ₽",
    imgSrc: imgBusiness,
  },
];

const CarsContainer = () => {
  const { activeIndexCar, setActiveIndexCar } = useContext(ContextMap);

  return (
    // Альтернатива -mx-3 in px-3
    <div className="flex gap-6">
      {data.map((car, idx) => {
        return (
          <Car
            key={`${car.name}${idx}`}
            name={car.name}
            price={car.price}
            imgSrc={car.imgSrc}
            index={idx}
            setActiveIndexCar={setActiveIndexCar}
            activeIndexCar={activeIndexCar}
          />
        );
      })}
    </div>
  );
};

export default CarsContainer;
