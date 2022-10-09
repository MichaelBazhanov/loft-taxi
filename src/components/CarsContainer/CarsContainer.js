import { useContext } from 'react';
import Cars from '../Cars'
import { ContextMap } from "../MapContainer";

//img
import imgStandart from "../../assets/images/car-standart.jpg";
import imgPremium from "../../assets/images/car-premium.jpg";
import imgBusiness from "../../assets/images/car-business.jpg";

const CarsContainer = () => {
  const { activeIndexCar, setActiveIndexCar } = useContext(ContextMap);

  return (
    <div className="flex -mx-3">
      <Cars
        price={"150 ₽"}
        imgSRC={imgStandart}
        index={1}
        setActiveIndexCar={setActiveIndexCar}
        activeIndexCar={activeIndexCar}
      />
      <Cars
        price={"200 ₽"}
        imgSRC={imgPremium}
        index={2}
        setActiveIndexCar={setActiveIndexCar}
        activeIndexCar={activeIndexCar}
      />
      <Cars
        price={"300 ₽"}
        imgSRC={imgBusiness}
        index={3}
        setActiveIndexCar={setActiveIndexCar}
        activeIndexCar={activeIndexCar}
      />
    </div>
  );
};

export default CarsContainer;
