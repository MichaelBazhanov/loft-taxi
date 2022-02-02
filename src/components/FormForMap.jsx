import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { getRoutesCoordinates } from '../modules/route'
import { getPaymentCard } from '../modules/payment'
import { getAddressList } from '../modules/address'
import Select from '../components/Select'
import { useNavigate } from "react-router-dom";

//img
import imgStandart from '../assets/images/car-standart.jpg'
import imgPremium from '../assets/images/car-premium.jpg'
import imgBusiness from '../assets/images/car-business.jpg'


import Loading from "./Loading";
import Error from "./Error";

//Car
import CarForForm from './CarForForm'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const FormForMap = ({ getAddressList, getRoutesCoordinates, getPaymentCard, isLoadingSendPaymentCardNewUser, errorSendPaymentCardNewUser, isLoading, error, address, cardName, cardNumber, expiryDate, cvc, token }) => {
	const [width, setWidth] = useState(window.innerWidth); //----------------
	const [activeIndex, setActiveIndex] = useState(1)
	const [activeIndexCar, setActiveIndexCar] = useState(1)
	const [addressStart, setAddressStart] = useState(null)
	const [addressEnd, setAddressEnd] = useState(null)

	const navigate = useNavigate()

	const updateDimensions = () => {//----------------
		setWidth(window.innerWidth);
	}
	const handleSubmit = (event) => {
		event.preventDefault();
		if (addressStart && addressEnd && addressStart.rout && addressEnd.rout) {
			getRoutesCoordinates(addressStart, addressEnd)
		}
	}
	useEffect(() => {//----------------
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	//Все useEffect при первом рендере выполняются !!!
	useEffect(() => {
		getAddressList()
	}, [])
	useEffect(() => {
		if (!isLoadingSendPaymentCardNewUser) getPaymentCard(token) // Если для нового пользователя карта уже установлена то ...
	}, [isLoadingSendPaymentCardNewUser])
	useEffect(() => {
		if (
			(cardName === '' || cardName === ' ') ||
			(cardNumber === '' || cardNumber === ' ') ||
			(expiryDate === '' || expiryDate === ' ') ||
			(cvc === '' || cvc === ' ')
		) {
			setActiveIndex(3) // Данные карты пустые!
		} else {
			setActiveIndex(1) // Данные карты НЕ пустые!
		}
	}, [cardName, cardNumber, expiryDate, cvc,])


	if (isLoading) return <Loading />
	if (error) return <Error />
	if (isLoadingSendPaymentCardNewUser) return <Loading />
	if (errorSendPaymentCardNewUser) return <Error />

	const filterAddress = () => {
		return address.filter(item => addressStart ? item.rout !== addressStart.rout : true).filter(item => addressEnd ? item.rout !== addressEnd.rout : true)
	}

	const changeAddress1 = value => {
		setAddressStart(value)
	}
	const changeAddress2 = value => {
		setAddressEnd(value)
	}

	return (
		<div className="container mx-auto relative pointer-events-none h-full">

			<div className="flex flex-col items-center lg:items-stretch h-full">
				{/* Форма */}
				<div className="flex flex-col h-full">

					{/* //selectors их недолжное быть когда заказ размещен или платежные данные не указаны*/}
					{activeIndex === 1 &&
						< div className="p-3 pb-0 sm:hidden pointer-events-auto mt-10 rounded-xl">
							{address.length > 0 && <Select
								margin='mt-0'
								roundedTop='rounded-t-xl'
								className=''
								placeholder='Откуда'
								addressList={filterAddress()}
								onChange={changeAddress1} />}
							{address.length > 0 && <Select
								margin='mt-0'
								roundedBottom='rounded-b-xl'
								placeholder='Куда'
								addressList={filterAddress()}
								onChange={changeAddress2} />}
						</div>
					}

					<form onSubmit={handleSubmit} className={classNames(activeIndex === 1 ? '' : 'hidden', 'max-w-[486px] w-full bg-white sm:mt-16 lg:ml-24 rounded-xl shadow-lg pointer-events-auto mt-auto')}>

						<div className="p-6 pb-0 hidden sm:block">
							{address.length > 0 && <Select
								margin='mt-1'
								placeholder='Откуда'
								addressList={filterAddress()}
								onChange={changeAddress1} />}
							{address.length > 0 && <Select
								margin='mt-1'
								placeholder='Куда'
								addressList={filterAddress()}
								onChange={changeAddress2} />}
						</div>

						<hr className="border w-full hidden sm:block" />

						{/* Машинки и заказать */}
						<div className="py-4 px-3 sm:py-8 sm:px-10 sm:mt-6 rounded-xl border">
							<div className="flex -mx-3">
								<CarForForm price={'150 ₽'} imgSRC={imgStandart} index={1} setActiveIndexCar={setActiveIndexCar} activeIndexCar={activeIndexCar} />
								<CarForForm price={'200 ₽'} imgSRC={imgPremium} index={2} setActiveIndexCar={setActiveIndexCar} activeIndexCar={activeIndexCar} />
								<CarForForm price={'300 ₽'} imgSRC={imgBusiness} index={3} setActiveIndexCar={setActiveIndexCar} activeIndexCar={activeIndexCar} />
							</div>
							{/* верхний блок что то должен вернуть и я запишу это в инпуты */}
							<input type="hidden" name="car" />
							<button onClick={() => { setActiveIndex(2) }} type="submit" className="text-2xl py-4 w-full bg-yellow-me rounded-full mt-7 disabled:opacity-75"
								disabled={(!(addressStart && addressStart.rout && addressEnd && addressEnd.rout))}>Заказать</button>
						</div>
					</form>
				</div>

				{/* Заказ размещен */}
				<div className={classNames(activeIndex === 2 ? '' : 'hidden', 'max-w-[486px] w-full bg-white  mt-16 ml-24 rounded-xl shadow-lg py-10 px-11 pointer-events-auto')}>
					<p className="font-bold text-4xl">Заказ размещен</p>
					<p className="mt-4 text-lg text-gray-me">Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</p>
					<button onClick={() => { setActiveIndex(1) }} type="submit" className="text-2xl py-4 w-full bg-yellow-me rounded-full mt-7" >Сделать новый заказ</button>
				</div>

				{/* Заполните платежные данные */}
				<div className={classNames(activeIndex === 3 ? '' : 'hidden', 'max-w-[486px] w-full bg-white  mt-16 ml-24 rounded-xl shadow-lg py-10 px-11 pointer-events-auto')}>
					<p className="font-bold text-4xl">Заполните платежные данные</p>
					<p className="mt-4 text-lg text-gray-me">Укажите информацию о платежной карте что бы сделать заказ.</p>
					<button onClick={() => { navigate('/profile') }} type="submit" className="text-2xl py-4 w-full bg-yellow-me rounded-full mt-7" >Перейти в профиль</button>
				</div>

			</div>
		</div >
	)
}
export default connect(
	state => ({
		token: state.authorizationReducer.token,

		isLoading: state.addressReducer.isLoading,
		error: state.addressReducer.error,
		address: state.addressReducer.address,

		cardName: state.paymentReducer.cardName,
		cardNumber: state.paymentReducer.cardNumber,
		expiryDate: state.paymentReducer.expiryDate,
		cvc: state.paymentReducer.cvc,

		isLoadingSendPaymentCardNewUser: state.paymentReducer.isLoadingSendPaymentCardNewUser,
		errorSendPaymentCardNewUser: state.paymentReducer.errorSendPaymentCardNewUser,
	}),
	{ getAddressList, getRoutesCoordinates, getPaymentCard } // просто дергаем ACTION
)(FormForMap)