import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { logOut } from '../modules/authorization'
import { sendPaymentCard, getPaymentCard } from '../modules/payment' //просто импортируем action
import { useNavigate } from "react-router-dom";
import { withFormik } from 'formik';
////////////////////////////////////////////////////////////////////////////////////////////////////////
//img
import vector from '../assets/images/vector.svg'
import miniLogo from '../assets/images/mini-logo.svg'
import circle from '../assets/images/circle.svg'

import Loading from '../components/Loading'

// const onSubmitFunction = (values, FormikBag, token, setSwitchView, sendPaymentCard) => {
// 	// console.log('===onSubmitFunction', values, FormikBag)
// 	const { cardName, cardNumber, expiryDate, cvc } = values
// 	sendPaymentCard(cardName, cardNumber, expiryDate, cvc, token)
// 	FormikBag.setSubmitting(true) // защита от повторной отправки
// 	return setSwitchView(false)
// }

const Profile = (props) => {
	console.log('RENDERING ', props)
	const [switchView, setSwitchView] = useState(true)
	const navigate = useNavigate()
	// useEffect(() => {
	// 	setData({ ...data, cardName, cardNumber, expiryDate, cvc })
	// }, [cardName, cardNumber, expiryDate, cvc])
	useEffect(() => {
		console.log('getPaymentCard(token)')
		getPaymentCard(token)
	}, [])
	// if (isLoadingGetPaymentCard) return <Loading />
	// if (isLoadingSendPaymentCard) return <Loading />
	// if (isLoadingSendPaymentCardNewUser) return <Loading />
	// const handleSubmitFunction = (values, FormikBag) => {
	// 	// console.log('handleSubmitFunction', values, FormikBag)
	// 	// onSubmit(values, FormikBag, token, setSwitchView, sendPaymentCard)
	// 	const { cardName, cardNumber, expiryDate, cvc } = values
	// 	sendPaymentCard(cardName, cardNumber, expiryDate, cvc, token)
	// 	FormikBag.setSubmitting(true) // защита от повторной отправки
	// 	return setSwitchView(false)
	// }
	const {
		values,
		errors,
		touched,
		handleChange,
		handleBlur,
		handleSubmit,
		isValid,
		isSubmitting,
		logOut,
		sendPaymentCard,
		getPaymentCard,
		isLoadingGetPaymentCard,
		isLoadingSendPaymentCard,
		isLoadingSendPaymentCardNewUser,
		cardName,
		cardNumber,
		expiryDate,
		cvc,
		token,
		validateOnMount,
	} = props;

	// const test = () => {
	// 	console.log('setFieldValue ', setFieldValue)
	// 	console.log('setFieldTouched ', setFieldTouched)
	// }
	// test()

	return (
		<div className="bg-map bg-center h-full relative">
			<div className="absolute inset-0 bg-black-me opacity-30" />
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

							{true &&
								<div className="sm:mt-12 flex flex-col sm:flex-row justify-between sm:-mx-12">

									{/* Форма */}
									<form
										data-testid="profile-form"
										onSubmit={handleSubmit}
										id="formProfile"
										className="flex flex-col sm:w-1/2 sm:px-12 order-2 mt-10 sm:mt-auto">
										<label
											className="flex flex-col justify-between font-bold cursor-pointer">
											<span>Имя владельца*</span>
											<input
												onChange={handleChange}
												onBlur={handleBlur}
												value={values.cardName}
												type="text"
												name="cardName"
												required
												placeholder="Loft"
												autoComplete="off"
												className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
											{touched.cardName && errors.cardName && <div className="text-red-600">{errors.cardName}</div>}
										</label>

										<label
											className="flex flex-col justify-between font-bold cursor-pointer mt-6">
											<span>Номер карты*</span>
											<input
												onBlur={handleBlur}
												onChange={handleChange}
												value={values.cardNumber}
												type="text"
												name="cardNumber"
												required
												autoComplete="off"
												placeholder="0000 0000 0000 0000"
												className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
											{touched.cardNumber && errors.cardNumber && <div className="text-red-600">{errors.cardNumber}</div>}
										</label>

										<div className="flex justify-between items-start">
											<label
												className="flex flex-col justify-between font-bold cursor-pointer mt-6 w-1/2">
												<span>MM/YY*</span>
												<input
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.expiryDate}
													type="date"
													name="expiryDate"
													required
													autoComplete="off"
													placeholder="15/05/08"
													className="mt-1 block w-full border-b-2 h-7 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
												{touched.expiryDate && errors.expiryDate && <div className="text-red-600">{errors.expiryDate}</div>}
											</label>

											<label
												className="flex flex-col justify-between font-bold cursor-pointer mt-6">
												<span>CVC*</span>
												<input
													onBlur={handleBlur}
													onChange={handleChange}
													value={values.cvc}
													type="number"
													maxLength={3}
													name="cvc"
													required
													placeholder="667"
													min="000" max="999"
													autoComplete="off"
													className="mt-1 block w-full border-b-2 h-7 border-gray-300 shadow-sm
										focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
										placeholder:text-gray-me"/>
												{touched.cvc && errors.cvc && <div className="text-red-600">{errors.cvc}</div>}
											</label>
										</div>
									</form>

									{/* Платежная карта */}
									<div className="flex flex-col sm:w-1/2 md:px-12 justify-center order-1 sm:order-3 mt-7 sm:mt-auto">
										<div className="bg-white px-7 py-5 rounded-xl shadow-me-3 h-48">
											<div className="flex justify-between items-center">
												<img src={miniLogo} alt="mini-logo" />
												<span className="text-xs">{values.expiryDate || expiryDate}</span>
											</div>
											<p className="text-xl mt-7">{values.cardNumber || cardNumber}</p>
											<div className="flex justify-between items-center mt-9">
												<div className="flex items-center">
													<img src={vector} alt="vector" />
													<span className="ml-2">{values.cardName || cardName}</span>
												</div>
												<img src={circle} alt="circle" />
											</div>
										</div>

									</div>

								</div>
							}

							<button
								form="formProfile"
								disabled={isSubmitting || !isValid}
								type="submit"
								className="w-full sm:w-1/3 bg-yellow-me text-xl py-5 mt-10 rounded-full self-center disabled:opacity-75 disabled:cursor-default disabled:bg-gray-300 disabled:text-zinc-400">
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
	// cvc: PropTypes.string, // c сервера приходит всегда строка а само поле cvc работает с числом

	isLoadingGetPaymentCard: PropTypes.bool,
	isLoadingSendPaymentCard: PropTypes.bool,
	isLoadingSendPaymentCardNewUser: PropTypes.bool,
}

const Formik = withFormik({
	enableReinitialize: true,
	validateOnMount: true,
	mapPropsToValues({ cardName, cardNumber, expiryDate, cvc }) {
		return {
			cardName: cardName,
			cardNumber: cardNumber,
			expiryDate: expiryDate,
			cvc: cvc,
		}
	},
	validate: values => {
		let errors = {}
		if (values.cardName.trim().length < 1) {
			errors.cardName = 'The field is empty !'
		}
		if (values.cardNumber.trim().length < 1) {
			errors.cardNumber = 'The field is empty !'
		}
		if (values.expiryDate.trim().length < 1) {
			errors.expiryDate = 'The field is empty !'
		}
		if (values.cvc.length < 1) {
			errors.cvc = 'The field is empty !'
		}
		return errors
	},
	// handleSubmit: (values, FormikBag) => {
	// 	setTimeout(() => {
	// 		FormikBag.props.sendPaymentCard(values.cardName, values.cardNumber, values.expiryDate, values.cvc, FormikBag.props.token)
	// 		FormikBag.setSubmitting(false) // защита от повторной отправки
	// 	}, 0);
	// 	// console.log('withFormik values :', values)
	// 	// console.log('withFormik FormikBag :', FormikBag)
	// 	// console.log('withFormik props :', props) // дело в  этих пропсах
	// 	// console.log('============================================= handleSubmit НАЧАЛСЯ')
	// 	// FormikBag.props.sendPaymentCard(values.cardName, values.cardNumber, values.expiryDate, values.cvc, FormikBag.props.token)
	// 	// FormikBag.setSubmitting(true) // защита от повторной отправки
	// 	// return setSwitchView(false) // хз как это сюда вытащить
	// 	// console.log('============================================= handleSubmit ЗАКОНЧИЛСЯ')
	// }
	handleSubmit: (values, { props, setSubmitting }) => {
		setTimeout(() => {
			console.log('============================================= handleSubmit НАЧАЛСЯ')
			console.log('withFormik values :', values)
			console.log('withFormik props :', props) // дело в  этих пропсах

			const { token, sendPaymentCard } = props
			sendPaymentCard(values.cardName, values.cardNumber, values.expiryDate, values.cvc, token)
			setSubmitting(true) // защита от повторной отправки
			// return setSwitchView(false) // хз как это сюда вытащить
			console.log('============================================= handleSubmit ЗАКОНЧИЛСЯ')
		}, 500);
	},
})(Profile);

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
)(Formik)


