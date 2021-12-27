import React, { useState } from "react";
import Select from '../components/Select'

//img
import imgStandart from '../assets/images/car-standart.jpg'
import imgPremium from '../assets/images/car-premium.jpg'
import imgBusiness from '../assets/images/car-business.jpg'


function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const FormForMap = () => {
	const [active, setActive] = useState(false)

	const handleSubmit = (event) => {
		event.preventDefault();
		// делаем что то с данными
		alert(`Форма отправлена! ${active}`)
	}

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
							<div className="w-1/3 px-3 cursor-pointer">
								<div className="flex flex-col shadow-me rounded-lg p-3">
									<p>Стандарт</p>
									<p className="text-xs">Стоимость</p>
									<p className="text-2xl">150 ₽</p>
									<img src={imgStandart} alt="car" className="w-full h-auto" />
								</div>
							</div>
							<div className="w-1/3 px-3 cursor-pointer opacity-50">
								<div className="flex flex-col shadow-me rounded-lg p-3">
									<p>Премиум</p>
									<p className="text-xs">Стоимость</p>
									<p className="text-2xl">250 ₽</p>
									<img src={imgPremium} alt="car" className="w-full h-auto" />
								</div>
							</div>
							<div className="w-1/3 px-3 cursor-pointer opacity-50">
								<div className="flex flex-col shadow-me rounded-lg p-3">
									<p>Бизнес</p>
									<p className="text-xs">Стоимость</p>
									<p className="text-2xl">300 ₽</p>
									<img src={imgBusiness} alt="car" className="w-full h-auto" />
								</div>
							</div>
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

export default FormForMap