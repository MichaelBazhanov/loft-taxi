import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import {
  getRoutesCoordinates,
  resetRoutesAndAddress,
} from "../../modules/route";
import { getPaymentCard } from "../../modules/payment";
import { getAddressList } from "../../modules/address";

import Loading from "../Loading";
import Error from "../Error";

import OrderForm from "../OrderForm";
import OrderNext from "../OrderNext";
import NeedCard from "../NeedCard";

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
  const [activeBlock, setActiveBlock] = useState("order-form"); //1 = 'order-form', 2 = 'order-next', 3 = 'need-card'
  const [activeIndexCar, setActiveIndexCar] = useState(1);
  const [addressStart, setAddressStart] = useState(null);
  const [addressEnd, setAddressEnd] = useState(null);

  const updateDimensions = () => {
    setWidth(window.innerWidth);
  };
  useEffect(() => {
    getAddressList();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []); //Все useEffect при первом рендере выполняются !!!

  useEffect(() => {
    if (coordinates && coordinates.length === 0) {
      // Заказа еще нет
      setAddressStart(null);
      setAddressEnd(null);
      setActiveIndexCar(1);
      setActiveBlock("order-form");
    } else {
      setActiveBlock("order-next"); // Заказ уже есть
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
        setActiveBlock("need-card"); // Данные карты пустые!
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
          {/* {activeBlock === "" && <Loading />} */}
          {/* еще ситуация когда 2 последних адреса не работают, нужно эту ошибку обрабатывать и показывать новую форму заказа  */}
          {/* те нужно переписать компоненты загрузки и ошибки */}

          {/* Форма заказа */}
          {activeBlock === "order-form" && <OrderForm />}

          {/* Заказ размещен */}
          {activeBlock === "order-next" && <OrderNext />}

          {/* Заполните платежные данные */}
          {activeBlock === "need-card" && <NeedCard />}

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
