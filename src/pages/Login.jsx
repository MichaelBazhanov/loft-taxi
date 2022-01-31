import React, { useEffect, useState } from "react";
import logoTaxiVertical from '../assets/images/logo-taxi-vertical.svg';
import { connect } from 'react-redux'
import { authenticate } from '../modules/authorization'
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Formik, Field } from 'formik'

import Loading from '../components/Loading'
import Error from '../components/Error'

const onSubmitFunction = (values, FormikBag, authenticate) => {
	// console.log('===onSubmitFunction', values, FormikBag)
	const { email, password } = values
	authenticate(email, password)
	FormikBag.setSubmitting(true) // защита от повторной отправки
}

const Login = ({ authenticate, isLoggedIn, isLoading, error, onSubmit = onSubmitFunction }) => {
	// const [state, setState] = useState({ email: 'test@test.com', password: '123123' }) // hard code
	// const [state, setState] = useState({ email: '', password: '' })

	const navigate = useNavigate()

	useEffect(() => { // Следим за isLoggedIn в redux
		isLoggedIn ? navigate("/map", { replace: true }) : navigate("/login", { replace: true })
	}, [isLoggedIn])

	// const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	const { email, password } = state // получаем из state
	// 	authenticate(email, password) // отдаем данные для авторизации
	// }

	// const handleChange = (event) => { console.log('handleChange good')
	// 	setState({ ...state, [event.target.name]: event.target.value })
	// }

	// const { email, password } = state

	if (isLoading) return <Loading />
	if (error) return <Error error={error} />

	const handleSubmitFunction = (values, FormikBag) => {
		// console.log('handleSubmitFunction', values, FormikBag)
		onSubmit(values, FormikBag, authenticate)
	}
	return (
		<div
			className="container mx-auto  flex   h-screen bg-map bg-center">

			<div
				className="w-1/3 bg-black-me flex justify-center items-center">
				<img
					src={logoTaxiVertical}
					className="logo-taxi-vertical"
					alt="logo" />
			</div>

			<div
				className="w-2/3 flex justify-center items-center"
			>
				<Formik
					onSubmit={handleSubmitFunction}
					// onSubmit={(values, FormikBag) => {
					// 	const { email, password } = values
					// 	authenticate(email, password)
					// 	FormikBag.setSubmitting(true) // защита от повторной отправки
					// }}
					initialValues={{ email: "test@test.com", password: "123123" }}
					validate={(value) => {
						// console.log('Formik - validate - value', value)
						let errors = {}
						if (!value.email) {
							errors.email = 'Required';
						} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value.email)) {
							errors.email = 'Invalid email address';
						}
						if (value.password.length < 5) {
							errors.password = 'Password must be longer than 5 characters!'
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
							data-testid="custom-element"
							onSubmit={handleSubmit} className="max-w-xl w-full bg-white px-28 py-14 shadow-lg rounded-2xl">
							<h4
								className="font-bold text-3xl text-black text-center mb-14">
								Войти
							</h4>

							<label
								className="flex flex-col justify-between font-bold cursor-pointer">
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
									className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
		focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
		placeholder:text-gray-me"/>
								{touched.email && errors.email && <div className="text-red-600">{errors.email}</div>}
							</label>

							<label className="flex flex-col justify-between font-bold cursor-pointer mt-6">
								<span>Password*</span>
								<input
									type="password"
									name="password"
									onChange={handleChange}
									onBlur={handleBlur}
									value={values.password}
									required
									autoComplete="off"
									placeholder="*************"
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
								disabled={isSubmitting || !isValid}
								type="submit"
								className="block text-center cursor-pointer mt-11 bg-yellow-me w-full py-4 text-2xl rounded-full disabled:opacity-75 disabled:cursor-default">
								Войти
							</button>

							<p
								className="mt-8 text-gray-me text-center">
								Новый пользователь?&nbsp;
								<span
									onClick={() => { navigate("/registration") }}
									className="inline-block text-yellow-me cursor-pointer">
									Регистрация
								</span>
							</p>
						</form>
					)}

				</Formik>
			</div>
		</div>
	)

}

Login.propTypes = {
	// authenticate: PropTypes.func.isRequired,
	// isLoggedIn: PropTypes.bool.isRequired
	authenticate: PropTypes.func,
	isLoggedIn: PropTypes.bool
}

export default connect(
	(state) => ({
		isLoggedIn: state.authorizationReducer.isLoggedIn,
		isLoading: state.authorizationReducer.isLoading,
		error: state.authorizationReducer.error
	}), // (isLoggedIn - поле для роутинга что бы ходить по роутам)
	{ authenticate } //диспатчим новый экшен
)(Login)

// connect принимает 2 аргумента
// -----------------------------1 селектор
// -----------------------------2 мапинг функции dispatch в props