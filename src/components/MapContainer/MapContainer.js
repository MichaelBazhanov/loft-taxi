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

import Loading from "../Loading";
import Error from "../Error";

//=========================================
import SelectPoints from "../SelectPoints";
import SelectCar from "../SelectCar";
import OrderForm from "../OrderForm";
import OrderNext from "../OrderNext";
//=========================================

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ContextMap = React.createContext(null); // Context API

const MapContainer = ({
  coordinates,
  getAddressList,
  getRoutesCoordinates,
  resetRoutesAndAddress,
  getPaymentCard,
  id,
  isLoadingGetPaymentCard,
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
    getAddressList();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []); //Все useEffect при первом рендере выполняются !!!

  useEffect(() => {
    if (coordinates && coordinates.length === 0) { // Заказа еще нет
      setAddressStart(null);
      setAddressEnd(null);
      setActiveIndexCar(1);
      setActiveBlock("without-card");
    } else {
      setActiveBlock("next-order"); // Заказ уже есть
    }
  }, [coordinates]);

  useEffect(() => {
    if (!isLoadingSendPaymentCardNewUser) getPaymentCard(token); // Если для нового пользователя банковская карта уже установлена то ...
  }, [isLoadingSendPaymentCardNewUser]);

  useEffect(() => {
    if (!isLoadingGetPaymentCard && id !== "") {
      // те id заполнен
      if (
        cardName.trim() === "" ||
        cardNumber.trim() === "" ||
        expiryDate.trim() === "" ||
        cvc.trim() === ""
      ) {
        setActiveBlock("default"); // Данные карты пустые!
      }
    }
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <Error />;
  if (isLoadingSendPaymentCardNewUser) return <Loading />;
  if (errorSendPaymentCardNewUser) return <Error />;

  return (
    <div className="container mx-auto relative pointer-events-none h-full">
      <div className="flex flex-col items-center lg:items-stretch h-full">
        <ContextMap.Provider
          value={{
            width: width,
            address: address,
            coordinates: coordinates,
            activeBlock: activeBlock,
            addressStart: addressStart,
            addressEnd: addressEnd,
            setAddressStart: setAddressStart,
            setAddressEnd: setAddressEnd,
            activeIndexCar: activeIndexCar,
            setActiveIndexCar: setActiveIndexCar,
            setActiveBlock: setActiveBlock,
            getRoutesCoordinates: getRoutesCoordinates,
            resetRoutesAndAddress: resetRoutesAndAddress,
          }}
        >
          {/* На будущее можно сделать 4ое состояние для Loading, отображая его между загрузками activeBlock */}

          {/* Форма заказа */}
          {activeBlock === "without-card" && <OrderForm />}

          {/* Заказ размещен */}
          {activeBlock === "next-order" && <OrderNext />}

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
        </ContextMap.Provider>
      </div>
    </div>
  );
};

const HOCMapContainer = connect(
  (state) => ({
    token: state.authorizationReducer.token,

    coordinates: state.routesReducer.coordinates,

    isLoading: state.addressReducer.isLoading,
    error: state.addressReducer.error,
    address: state.addressReducer.address,

    id: state.paymentReducer.id,
    cardName: state.paymentReducer.cardName,
    cardNumber: state.paymentReducer.cardNumber,
    expiryDate: state.paymentReducer.expiryDate,
    cvc: state.paymentReducer.cvc,

    isLoadingGetPaymentCard: state.paymentReducer.isLoadingGetPaymentCard,
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
)(MapContainer);

export { HOCMapContainer, ContextMap };
