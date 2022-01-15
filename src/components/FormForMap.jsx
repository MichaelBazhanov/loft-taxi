import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import { getAddressList, getRoutes } from '../actions' //просто импортируем action
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

const FormForMap = ({ getAddressList, address, getRoutes }) => {
	const [active, setActive] = useState(false)
	const [activeIndexCar, setActiveIndexCar] = useState(1)

	const handleSubmit = (event) => {
		event.preventDefault();
		// делаем что то с данными
		alert(`Форма отправлена! ${active}`)
	}

	useEffect(() => {
		getAddressList()
		// getRoutes() // сюда нужно отдать 2 адреса
	}, [])

	return (
		<div className="container mx-auto h-screen relative pointer-events-none">
			<div className="flex flex-col">

				<form onSubmit={handleSubmit} className={classNames(active ? 'hidden' : '', 'max-w-[486px] w-full bg-white  mt-16 ml-24 rounded-xl shadow-lg pointer-events-auto')}>
					{/* Select что то должен вернуть и я запишу это в инпуты */}
					<input type="hidden" name="rout-1" />
					<input type="hidden" name="rout-2" />

					<div className="p-6 pb-0">
						<Select />
						<Select />
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
	state => ({ address: state.address.address }),
	// state => ({ address1: state.routes.address1}),
	// state => ({ address2: state.routes.address2}),
	{ getAddressList, getRoutes } // просто дергаем ACTION
)(FormForMap)