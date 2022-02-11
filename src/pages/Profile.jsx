import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { logOut } from '../modules/authorization'
import { sendPaymentCard, getPaymentCard } from '../modules/payment' //просто импортируем action
import { useNavigate } from "react-router-dom";

//img
import vector from '../assets/images/vector.svg'
import miniLogo from '../assets/images/mini-logo.svg'
import circle from '../assets/images/circle.svg'

import Loading from '../components/Loading'

const Profile = ({
	logOut, sendPaymentCard, getPaymentCard, isLoadingGetPaymentCard, isLoadingSendPaymentCard, isLoadingSendPaymentCardNewUser, cardName, cardNumber, expiryDate, cvc, token
}) => {
	const [data, setData] = useState({
		cardName: "",
		cardNumber: "",
		expiryDate: "",
		cvc: "",
	})
	const [switchView, setSwitchView] = useState(true)

	const navigate = useNavigate()

	const handleChangeCard = (event) => {
		setData({ ...data, [event.target.name]: event.target.value })
	}

	const handleForm = (event) => {
		event.preventDefault()
		setSwitchView(false) // переключаем представление

		const { cardName, cardNumber, expiryDate, cvc } = data // получаем из state
		sendPaymentCard(cardName, cardNumber, expiryDate, cvc, token)
	}

	useEffect(() => {
		setData({ ...data, cardName, cardNumber, expiryDate, cvc })
	}, [cardName, cardNumber, expiryDate, cvc])

	useEffect(() => {
		getPaymentCard(token)
	}, [])

	if (isLoadingGetPaymentCard) return <Loading />
	if (isLoadingSendPaymentCard) return <Loading />
	if (isLoadingSendPaymentCardNewUser) return <Loading />

	return (
		<div className="bg-map bg-center h-full relative">
			<div className="absolute inset-0 bg-black-me opacity-30"/>
			<div className="container mx-auto h-full">
				<div className="flex justify-center items-center relative w-full h-full">
					{switchView &&
						< div
							className={'flex flex-wrap flex-col max-w-4xl w-full bg-white py-14 px-11 sm:rounded-xl shadow-me-2'}>
							<h4
								className="font-bold text-4xl text-center hidden sm:block">
								Профиль
							</h4>
							<p
								className="text-sm sm:mt-3 sm:text-lg text-gray-me text-center">
								Введите платежные данные
							</p>

							<div className="sm:mt-12 flex flex-col sm:flex-row justify-between sm:-mx-12">

								{/* // Данные */}
								<form onSubmit={handleForm} id="formProfile" className="flex flex-col sm:w-1/2 sm:px-12 order-2 mt-10 sm:mt-auto">
									<label
										className="flex flex-col justify-between font-bold cursor-pointer">
										<span>Имя владельца*</span>
										<input
											onChange={handleChangeCard}
											value={data.cardName}
											type="text"
											name="cardName"
											required
											placeholder="Loft"
											className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
									</label>

									<label
										className="flex flex-col justify-between font-bold cursor-pointer mt-6">
										<span>Номер карты*</span>
										<input
											onChange={handleChangeCard}
											value={data.cardNumber}
											type="text"
											name="cardNumber"
											required
											placeholder="0000 0000 0000 0000"
											className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
									</label>

									<div className="flex justify-between">
										<label
											className="flex flex-col justify-between font-bold cursor-pointer mt-6">
											<span>MM/YY*</span>
											<input
												onChange={handleChangeCard}
												value={data.expiryDate}
												type="date"
												name="expiryDate"
												required
												placeholder="15/05/08"
												className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
										</label>

										<label
											className="flex flex-col justify-between font-bold cursor-pointer mt-6">
											<span>CVC*</span>
											<input
												onChange={handleChangeCard}
												value={data.cvc}
												type="number"
												maxLength={3}
												name="cvc"
												required
												placeholder="667"
												min="000" max="999"
												className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
										</label>
									</div>
								</form>

								{/* // Платежная карта */}
								<div className="flex flex-col sm:w-1/2 sm:px-12 justify-center order-1 sm:order-3 mt-7 sm:mt-auto">
									<div className="bg-white px-7 py-5 rounded-xl shadow-me-3  h-48">
										<div className="flex justify-between items-center">
											<img src={miniLogo} alt="mini-logo" />
											<span className="text-xs">{data.expiryDate}</span>
										</div>
										<p className="text-xl mt-7">{data.cardNumber}</p>
										<div className="flex justify-between items-center mt-9">
											<div className="flex items-center">
												<img src={vector} alt="vector" />
												<span className="ml-2">{data.cardName}</span>
											</div>
											<img src={circle} alt="circle" />
										</div>
									</div>
								</div>

							</div>

							<button
								form="formProfile"
								type="submit"
								className="w-full sm:w-1/3 bg-yellow-me text-xl py-5 mt-10 rounded-full self-center">
								Сохранить
							</button>
						</div>
					}
					{!switchView &&
						<div
							className={'flex flex-wrap flex-col max-w-4xl w-full bg-white py-14 px-11 rounded-xl shadow-me-2'}
						>
							<h4 className="font-bold text-4xl text-center">Профиль</h4>
							<p
								className="mt-3 text-lg text-gray-me text-center">
								Платёжные данные обновлены. Теперь вы можете заказывать такси.
							</p>
							<button
								onClick={() => { setSwitchView(false); navigate('/map') }}
								type="button"
								className="max-w-xs w-full bg-yellow-me text-xl py-5 mt-10 rounded-full self-center">
								Перейти на карту
							</button>
							<button
								onClick={() => { setSwitchView(false); logOut(); navigate('/login') }}
								type="button"
								className="max-w-xs w-full bg-yellow-me text-xl py-5 mt-10 rounded-full self-center">
								Выйти
							</button>
						</div>
					}
				</div>
			</div>
		</div >
	)
}

Profile.propTypes = {
	logOut: PropTypes.func.isRequired,
	sendPaymentCard: PropTypes.func.isRequired,
	getPaymentCard: PropTypes.func.isRequired,

	token: PropTypes.string,
	cardName: PropTypes.string,
	cardNumber: PropTypes.string,
	expiryDate: PropTypes.string,
	cvc: PropTypes.string,

	isLoadingGetPaymentCard: PropTypes.bool,
	isLoadingSendPaymentCard: PropTypes.bool,
	isLoadingSendPaymentCardNewUser: PropTypes.bool,
}

export default connect(
	(state) => ({
		token: state.authorizationReducer.token,
		cardName: state.paymentReducer.cardName,
		cardNumber: state.paymentReducer.cardNumber,
		expiryDate: state.paymentReducer.expiryDate,
		cvc: state.paymentReducer.cvc,

		isLoadingGetPaymentCard: state.paymentReducer.isLoadingGetPaymentCard,
		isLoadingSendPaymentCard: state.paymentReducer.isLoadingSendPaymentCard,
		isLoadingSendPaymentCardNewUser: state.paymentReducer.isLoadingSendPaymentCardNewUser,
	}),
	{ logOut, sendPaymentCard, getPaymentCard }
)(Profile)
