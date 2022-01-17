import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { getAddressList } from '../actions' //просто импортируем action
import Select from '../components/Select'

//img
import imgStandart from '../assets/images/car-standart.jpg'
import imgPremium from '../assets/images/car-premium.jpg'
import imgBusiness from '../assets/images/car-business.jpg'

//Car
import CarForForm from './CarForForm'

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const FormForMap = ({ getAddressList, address, address1, address2 }) => {
	const [active, setActive] = useState(false)
	const [activeIndexCar, setActiveIndexCar] = useState(1)
	const [addressUSE, setAddressUSE] = useState([])

	const handleSubmit = (event) => {
		event.preventDefault();
		// делаем что то с данными
		alert(`Форма отправлена! ${active}`)
	}

	useEffect(() => {
		getAddressList()
	}, [])

	//================================================================= ЭТО занимает какое то время и до этого компонент не отображаем
	// console.log('рендер компонента :', address)
	useEffect(() => { // дополнительная обработка адресов
		let addr = address.map((el, inx) => {
			return { id: inx + 1, rout: el }
		})
		// console.log('useEffect :', addr)
		setAddressUSE(addr) // Установка useState запускает перерэндер компонента
	}, [address, address1, address2])
	// console.log('Установленный state in useEffect: ', addressUSE)
	//================================================================= ЭТО занимает какое то время и до этого компонент не отображаем



	return (
		<div className="container mx-auto h-screen relative pointer-events-none">

			<div className="flex flex-col">

				<form onSubmit={handleSubmit} className={classNames(active ? 'hidden' : '', 'max-w-[486px] w-full bg-white  mt-16 ml-24 rounded-xl shadow-lg pointer-events-auto')}>

					<div className="p-6 pb-0">
						{/* {addressUSE.length > 0 && <Select addressList={addressUSE} currentAddress={addressUSE[0]} idx='1' />}
						{addressUSE.length > 0 && <Select addressList={addressUSE} currentAddress={addressUSE[address.length - 1]} idx='2' />} */}

						{/* {address1 && <h2> address1 : {address1.rout}</h2>}
						{addressUSE && <h2>addressUSE : {addressUSE.map(item => item.rout)}</h2>} */}

						{/* {address1 && addressUSE.length > 0 && <Select addressList={addressUSE.filter(item => item.rout !== address1.rout)} currentAddress={addressUSE[0]} idx='1' />} */}
						{addressUSE.length > 0 && <Select addressList={addressUSE.filter(item => address1 ? item.rout !== address1.rout : true)} currentAddress={addressUSE[0]} idx='1' />}
						{addressUSE.length > 0 && <Select addressList={addressUSE.filter(item => address2 ? item.rout !== address1.rout : true)} currentAddress={addressUSE[address.length - 1]} idx='2' />}
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
		address: state.address.address,
		address1: state.routes.address1,
		address2: state.routes.address2
	}),
	{ getAddressList } // просто дергаем ACTION
)(FormForMap)