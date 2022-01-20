import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { getAddressList } from '../actions' //просто импортируем action
import Select from '../components/Select'

//img
import imgStandart from '../assets/images/car-standart.jpg'
import imgPremium from '../assets/images/car-premium.jpg'
import imgBusiness from '../assets/images/car-business.jpg'

//Error
import Error from "./Error";

//Loading
import Loading from "./Loading/index";

//Car
import CarForForm from './CarForForm'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const FormForMap = ({ getAddressList, isLoading, error, address }) => {
	const [active, setActive] = useState(false)
	const [activeIndexCar, setActiveIndexCar] = useState(1)
	const [addressStart, setAddressStart] = useState(null)
	const [addressEnd, setAddressEnd] = useState(null)

	const handleSubmit = (event) => {
		event.preventDefault();
		// делаем что то с данными
		alert(`Форма отправлена! ${active}  ${activeIndexCar} ${addressStart.rout} ${addressEnd.rout}`)
	}

	useEffect(() => {
		getAddressList() // Этот dispatch запускает перерэндер компонента путем обновления пропсов
	}, [])
	useEffect(() => {
		setAddressStart(address[0])
		setAddressEnd(address[address.length - 1])
	}, [address])

	//================================================================= ЭТО занимает какое то время и до этого компонент не отображаем
	// console.log('рендер компонента 1 :', isLoading, error, address, address1, address2) // Рендер компонента ДО useEffect
	// useEffect(() => {
	// 	console.log('Установка sate в useEffect')
	// 	setAddressUSE('123') // Установка useState запускает перерэндер компонента
	// }, [])
	// console.log('рендер компонента 2 :', addressUSE, isLoading, error, address, address1, address2) // Рендер компонента ПОСЛЕ useEffect
	//================================================================= ЭТО занимает какое то время и до этого компонент не отображаем

	if (isLoading) return <Loading />
	if (error) return <Error />

	const filterAddress = () => {
		return address.filter(item => addressStart && addressEnd ? item.rout !== addressStart.rout && item.rout !== addressEnd.rout : true)
	}


	const changeAddress1 = value => setAddressStart(value)
	const changeAddress2 = value => setAddressEnd(value)

	return (
		<div className="container mx-auto h-screen relative pointer-events-none">

			<div className="flex flex-col">

				<form onSubmit={handleSubmit} className={classNames(active ? 'hidden' : '', 'max-w-[486px] w-full bg-white  mt-16 ml-24 rounded-xl shadow-lg pointer-events-auto')}>

					<div className="p-6 pb-0">
						{address.length > 0 && <Select addressList={filterAddress()} currentAddress={address[0]}
							onChange={changeAddress1} />}
						{address.length > 0 && <Select addressList={filterAddress()} currentAddress={address[address.length - 1]}
							onChange={changeAddress2} />}
					</div>

					<hr className="border w-full" />

					<div className="py-8 px-10 mt-6 rounded-xl border">
						<div className="flex -mx-3">
							<CarForForm price={'150 ₽'} imgSRC={imgStandart} index={1} setActiveIndexCar={setActiveIndexCar} activeIndexCar={activeIndexCar} />
							<CarForForm price={'200 ₽'} imgSRC={imgPremium} index={2} setActiveIndexCar={setActiveIndexCar} activeIndexCar={activeIndexCar} />
							<CarForForm price={'300 ₽'} imgSRC={imgBusiness} index={3} setActiveIndexCar={setActiveIndexCar} activeIndexCar={activeIndexCar} />
						</div>
						{/* верхний блок что то должен вернуть и я запишу это в инпуты */}
						<input type="hidden" name="car" />
						<button onClick={() => { setActive(true) }} type="submit" className="text-2xl py-4 w-full bg-yellow-me rounded-full mt-7">Заказать</button>
					</div>
				</form>

				<div className={classNames(active ? '' : 'hidden', 'max-w-[486px] w-full bg-white  mt-16 ml-24 rounded-xl shadow-lg py-10 px-11 pointer-events-auto')}>
					<p className="font-bold text-4xl">Заказ размещен</p>
					<p className="mt-4 text-lg text-gray-me">Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</p>
					<button onClick={() => { setActive(false) }} type="submit" className="text-2xl py-4 w-full bg-yellow-me rounded-full mt-7">Сделать новый заказ</button>
				</div>

			</div>
		</div>
	)
}
export default connect(
	state => ({
		isLoading: state.address.isLoading,
		error: state.address.error,
		address: state.address.address,
	}),
	{ getAddressList } // просто дергаем ACTION
)(FormForMap)