import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getRoutesCoordinates,
  resetRoutesAndAddress,
} from "../../modules/route";
import { getPaymentCard } from "../../modules/payment";
import { getAddressList } from "../../modules/address";
import Select from "../Select";
import { useNavigate } from "react-router-dom";

//img
import imgStandart from "../../assets/images/car-standart.jpg";
import imgPremium from "../../assets/images/car-premium.jpg";
import imgBusiness from "../../assets/images/car-business.jpg";

import Loading from "../Loading";
import Error from "../Error";

//Car
import CarForForm from "../CarForForm";

//=========================================
import FormSelectors from "../FormSelectors";
//=========================================

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const FormForMap = ({
  getAddressList,
  getRoutesCoordinates,
  resetRoutesAndAddress,
  getPaymentCard,
  isLoadingSendPaymentCardNewUser,
  errorSendPaymentCardNewUser,
  isLoading,
  error,
  address,
  cardName,
  cardNumber,
  expiryDate,
  cvc,
  token,
}) => {
  const [width, setWidth] = useState(window.innerWidth);
  const [activeBlock, setActiveBlock] = useState("without-card"); //1 = 'without-card', 2 = 'next-order', 3 = 'default'
  const [activeIndexCar, setActiveIndexCar] = useState(1);
  const [addressStart, setAddressStart] = useState(null);
  const [addressEnd, setAddressEnd] = useState(null);

  const navigate = useNavigate();

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setActiveBlock("next-order"); // Следующий заказ

    if (addressStart && addressEnd && addressStart.rout && addressEnd.rout) {
      getRoutesCoordinates(addressStart, addressEnd);
    }
  };

  //Все useEffect при первом рендере выполняются !!!
  useEffect(() => {
    getAddressList();
  }, []);

  useEffect(() => {
    if (!isLoadingSendPaymentCardNewUser) getPaymentCard(token); // Если для нового пользователя карта уже установлена то ...
  }, [isLoadingSendPaymentCardNewUser]);

  useEffect(() => {
    if (
      cardName === "" ||
      cardName === " " ||
      cardNumber === "" ||
      cardNumber === " " ||
      expiryDate === "" ||
      expiryDate === " " ||
      cvc === "" ||
      cvc === " "
    ) {
      setActiveBlock("default"); // Данные карты пустые!
    } else {
      setActiveBlock("without-card"); // Данные карты НЕ пустые!
    }
  }, [cardName, cardNumber, expiryDate, cvc]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (isLoadingSendPaymentCardNewUser) return <Loading />;
  if (errorSendPaymentCardNewUser) return <Error />;

  return (
    <div className="container mx-auto relative pointer-events-none h-full">
      <div className="flex flex-col items-center lg:items-stretch h-full">

        {/* Форма */}
        {activeBlock === "without-card" && (
          <div className="flex flex-col h-full">
            <form
              onSubmit={handleSubmit}
              className="sm:max-w-[486px]  w-full sm:mt-16 lg:ml-24 rounded-xl sm:shadow-lg
              flex flex-col h-full sm:h-auto sm:bg-white
              "
            >
              <FormSelectors
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

              {/* Машинки и заказать */}
              <div className="py-4 px-3 sm:py-8 sm:px-10 sm:mt-6 rounded-xl border mt-auto bg-white shadow-lg sm:shadow-none pointer-events-auto">
                <div className="flex -mx-3">
                  <CarForForm
                    price={"150 ₽"}
                    imgSRC={imgStandart}
                    index={1}
                    setActiveIndexCar={setActiveIndexCar}
                    activeIndexCar={activeIndexCar}
                  />
                  <CarForForm
                    price={"200 ₽"}
                    imgSRC={imgPremium}
                    index={2}
                    setActiveIndexCar={setActiveIndexCar}
                    activeIndexCar={activeIndexCar}
                  />
                  <CarForForm
                    price={"300 ₽"}
                    imgSRC={imgBusiness}
                    index={3}
                    setActiveIndexCar={setActiveIndexCar}
                    activeIndexCar={activeIndexCar}
                  />
                </div>

                <button
                  type="submit"
                  className="text-2xl py-4 w-full bg-yellow-me rounded-full mt-7 disabled:opacity-75"
                  disabled={
                    !(
                      addressStart &&
                      addressStart.rout &&
                      addressEnd &&
                      addressEnd.rout
                    )
                  }
                >
                  Заказать
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Заказ размещен */}
        {activeBlock === "next-order" && (
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
                setActiveBlock("without-card"); // активный индекс "блока"
                setAddressStart(null); //обнуляем state
                setAddressEnd(null); //обнуляем state
                setActiveIndexCar(1); // устанавливаем первый индекс
              }}
              type="button"
              className="text-lg lg:text-2xl py-2 lg:py-4 w-full bg-yellow-me rounded-full mt-2 lg:mt-7"
            >
              Сделать новый заказ
            </button>
          </div>
        )}

        {/* Заполните платежные данные */}
        {activeBlock === "default" && (
          <div
            className={classNames(
              width < 640 ? "mt-auto" : "",
              "max-w-[486px] w-full bg-white sm:mt-16 sm:ml-24 rounded-xl shadow-lg p-3 sm:py-10 sm:px-11 pointer-events-auto text-center sm:text-left"
            )}
          >
            <p className="font-bold text-xl sm:text-4xl">
              Заполните платежные данные
            </p>
            <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-me">
              Укажите информацию о платежной карте что бы сделать заказ.
            </p>
            <button
              onClick={() => {
                navigate("/profile");
              }}
              type="button"
              className="text-lg sm:text-2xl py-2 sm:py-4 w-full bg-yellow-me rounded-full mt-2 sm:mt-7"
            >
              Перейти в профиль
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
export default connect(
  (state) => ({
    token: state.authorizationReducer.token,

    isLoading: state.addressReducer.isLoading,
    error: state.addressReducer.error,
    address: state.addressReducer.address,

    cardName: state.paymentReducer.cardName,
    cardNumber: state.paymentReducer.cardNumber,
    expiryDate: state.paymentReducer.expiryDate,
    cvc: state.paymentReducer.cvc,

    isLoadingSendPaymentCardNewUser:
      state.paymentReducer.isLoadingSendPaymentCardNewUser,
    errorSendPaymentCardNewUser:
      state.paymentReducer.errorSendPaymentCardNewUser,
  }),
  {
    getAddressList,
    getRoutesCoordinates,
    getPaymentCard,
    resetRoutesAndAddress,
  } // просто дергаем ACTION
)(FormForMap);
