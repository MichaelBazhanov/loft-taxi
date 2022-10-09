import CarsContainer from "../CarsContainer";
import Button from "../Button";

const SelectCar = () => {
  return (
    <div className="py-4 px-3 sm:py-8 sm:px-10 sm:mt-6 rounded-xl border mt-auto bg-white shadow-lg sm:shadow-none pointer-events-auto">
      <CarsContainer />

      <Button />
    </div>
  );
};

export default SelectCar;
