import React from "react";
import PropTypes from "prop-types";

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const CarForForm = ({ price, imgSRC, index, activeIndexCar, setActiveIndexCar }) => {
	const toggleActive = () => {
		setActiveIndexCar(index)
	}

	return (
		<div className={classNames(index === activeIndexCar ? '' : 'opacity-50', 'w-1/3 px-3 cursor-pointer')} onClick={toggleActive}>
			<div className="flex flex-col shadow-me rounded-lg p-3">
				<p>Стандарт</p>
				<p className="text-xs">Стоимость</p>
				<p className="text-2xl">{price}</p>
				<img src={imgSRC} alt="car" className="w-full h-auto" />
			</div>
		</div>
	)
}

CarForForm.propTypes = {
	price: PropTypes.string,
	imgSRC: PropTypes.string,
	index: PropTypes.number,
	activeIndexCar: PropTypes.number,
	setActiveIndexCar: PropTypes.func
}

export default CarForForm

