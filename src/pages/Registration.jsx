import React, { useEffect } from "react";
import logoTaxiVertical from '../assets/images/logo-taxi-vertical.svg';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { getRegistration } from '../modules/registration'
import { sendPaymentCardNewUser } from '../modules/payment'
import { Formik } from 'formik';

import Loading from '../components/Loading'

const onSubmitFunction = (values, FormikBag, getRegistration) => {
	const { email, password, name, surname} = values
	getRegistration(email, password, name, surname)
	FormikBag.setSubmitting(true) // защита от повторной отправки
}

const Registration = ({ getRegistration, sendPaymentCardNewUser, token, isLoggedIn, isLoading, onSubmit = onSubmitFunction }) => {
	const navigate = useNavigate()

	useEffect(() => { // Следим за isLoggedIn в redux
		if (isLoggedIn) {
			sendPaymentCardNewUser(token) // Устанавливаем ему платежную карт пустую по умолчанию
			navigate("/map", { replace: true })
		} else {
			navigate("/registration", { replace: true })
		}

	}, [isLoggedIn])

	if (isLoading) return <Loading />

	const handleSubmitFunction = (values, FormikBag) => {
		onSubmit(values, FormikBag, getRegistration)
	}

	return (
		<div className="container mx-auto flex flex-col md:flex-row h-screen md:bg-map bg-center">

			<div className="w-full md:w-1/3 flex-grow-0 bg-black-me flex justify-center items-center pt-7 md:pt-0">
				<img
					src={logoTaxiVertical}
					className="logo-taxi-vertical"
					alt="logo" />
			</div>

			<div className="w-full md:w-2/3 flex-grow flex justify-center items-center">

				<Formik
					onSubmit={handleSubmitFunction}
					initialValues={{
						email: 'email@example.com',
						name: 'Name',
						password: 'password',
						surname: 'Surname'
					}} // hard code - пользователь по умолчанию
					validate={(value) => {
						let errors = {}
						if (!value.email) {
							errors.email = 'Required';
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
							errors.email = 'Invalid email address';
						}
						if (value.password.length < 5) {
							errors.password = 'Password must be longer than 5 characters!'
						}
						if (value.name.length < 3) {
							errors.name = 'Name must be longer than 3 characters!'
						}
						if (value.surname.length < 3) {
							errors.surname = 'Surname must be longer than 3 characters!'
						}
						return errors
					}}
				>
					{({
						values,
						errors,
						touched,
						handleChange,
						handleBlur,
						handleSubmit,
						isValid,
						isSubmitting,
					}) => (

						<form
							data-testid="registration-form"
							onSubmit={handleSubmit} className="max-w-xl flex flex-col justify-center w-full h-full lg:h-auto bg-white px-3 py-16 md:px-28 md:py-14 shadow-lg rounded-2xl">

							<h4
								className="font-bold text-3xl text-black text-center">
								Регистрация
							</h4>

							<label
								className="flex flex-col pt-14 justify-between font-bold cursor-pointer">
								<span>Email*</span>
								<input
									type="email"
									name="email"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.email}
									required
									autoComplete="off"
									placeholder="mail@mail.ru"
									className="mt-2 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
								{touched.email && errors.email && <div className="text-red-600">{errors.email}</div>}
							</label>

							<label className="flex flex-col justify-between font-bold cursor-pointer mt-6">
								<span>Name*</span>
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.name}
									type="text"
									name="name"
									placeholder="Michael"
									required
									autoComplete="off"
									className="mt-2 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
								{touched.name && errors.name && <div className="text-red-600">{errors.name}</div>}
							</label>

							<label className="flex flex-col justify-between font-bold cursor-pointer mt-6">
								<span>Surname*</span>
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.surname}
									type="text"
									name="surname"
									placeholder="Bashanov"
									required
									autoComplete="off"
									className="mt-2 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
								{touched.surname && errors.surname && <div className="text-red-600">{errors.surname}</div>}
							</label>

							<label className="flex flex-col justify-between font-bold cursor-pointer mt-6">
								<span>Password*</span>
								<input
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									type="password"
									name="password"
									placeholder="*************"
									required
									autoComplete="off"
									className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
								{touched.password && errors.password && <div className="text-red-600">{errors.password}</div>}
							</label>

							<p
								className="mt-3 text-right">
								<span
									className="inline-block text-gray-me cursor-pointer hover:text-yellow-me">
									Забыли пароль?
								</span>
							</p>

							<button
								type="submit"
								className="block text-center cursor-pointer mt-11 bg-yellow-me w-full py-4 text-2xl rounded-full disabled:opacity-75 disabled:cursor-default disabled:bg-gray-300 disabled:text-zinc-400">
								Зарегистрироваться
							</button>

							<p
								className="mt-8 text-gray-me text-center">
								Уже зарегистрированы?&nbsp;
								<span
									onClick={() => { navigate("/login") }}
									className="inline-block text-yellow-me cursor-pointer">
									Войти
								</span>
							</p>
						</form>
					)}
				</Formik>

			</div>

		</div>
	)
}

export default connect(
	(state) => ({
		token: state.authorizationReducer.token,

		isLoggedIn: state.authorizationReducer.isLoggedIn,
		isLoading: state.registrationReducer.isLoading,
	}),
	{ getRegistration, sendPaymentCardNewUser } //диспатчим новый экшен
)(Registration)