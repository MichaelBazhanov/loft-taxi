import React, { useEffect, useState } from "react";
import logoTaxiVertical from '../assets/images/logo-taxi-vertical.svg';
import { connect } from 'react-redux'
import { authenticate } from '../modules/authorization'
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { Formik } from 'formik';

//pic
import one from '../assets/images/pre-login-image/pre-login-1.svg'
import two from '../assets/images/pre-login-image/pre-login-2.svg'
import three from '../assets/images/pre-login-image/pre-login-3.svg'

import LoadingLogin from '../components/LoadingLogin'

const onSubmitFunction = (values, FormikBag, authenticate) => {
	// console.log('===onSubmitFunction', values, FormikBag)
	const { email, password } = values
	authenticate(email, password)
	FormikBag.setSubmitting(true) // защита от повторной отправки
}

function classNames(...classes) {
	return classes.filter(Boolean).join(' ')
}

const Login = ({ authenticate, isLoggedIn, isLoading, onSubmit = onSubmitFunction }) => {
	const [width, setWidth] = useState(window.innerWidth)
	const [open, setOpen] = useState(true)
	const navigate = useNavigate()

	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	useEffect(() => { // Следим за isLoggedIn в redux
		isLoggedIn ? navigate("/map", { replace: true }) : navigate("/login", { replace: true })
	}, [isLoggedIn])

	const updateDimensions = () => {
		setWidth(window.innerWidth);
	}
	// const handleSubmit = (event) => {
	// 	event.preventDefault()
	// 	const { email, password } = state // получаем из state
	// 	authenticate(email, password) // отдаем данные для авторизации
	// }

	// const handleChange = (event) => { console.log('handleChange good')
	// 	setState({ ...state, [event.target.name]: event.target.value })
	// }

	// const { email, password } = state


	if (isLoading) return <LoadingLogin />

	const StartWindow = ({ setOpen }) => {
		const [index, setIndex] = useState(0)
		const windows = [
			{
				image: one,
				title: 'Быстрая подача',
				description: 'Вам не прийдется долго ждать, у нас много водителей по всей Москве и области.',
				index: 0,
			},
			{
				image: two,
				title: 'Перевоз животных',
				description: 'Есть возможность перевезти своего питомца. Укажите в настройках заказа.',
				index: 1,
			},
			{
				image: three,
				title: 'Встретим в Аэропорту',
				description: 'Встретим в аэропорту или на вокзале с большим багажом, в любое время.',
				index: 2,
			},
		]

		return (
			<>
				{index >= 0 && (
					<div className="absolute inset-0 bg-white flex flex-col flex-nowrap justify-center items-center text-center">
						<img src={windows[index].image} alt="Logo" className="h-80" />
						<h2 className="text-3xl font-bold mt-12">{windows[index].title}</h2>
						<p className="mt-5 text-xl text-gray-me">{windows[index].description}</p>

						<ul className="absolute bottom-12 flex space-x-2.5">
							<li className={classNames(index === 0 ? 'bg-yellow-me' : 'bg-gray-me', 'w-3 h-3 rounded-full')}></li>
							<li className={classNames(index === 1 ? 'bg-yellow-me' : 'bg-gray-me', 'w-3 h-3 rounded-full')}></li>
							<li className={classNames(index === 2 ? 'bg-yellow-me' : 'bg-gray-me', 'w-3 h-3 rounded-full')}></li>
						</ul>

						<div className="absolute bottom-0 left-0 right-0">
							{index !== 0 && <div onClick={() => setIndex(index - 1)}
								className='cursor-pointer absolute left-0 bottom-0 flex justify-center items-center h-14 w-14 bg-black rounded-tr-3xl'
							>
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
									className="fill-white"
								>
									<path d="M2.62268e-07 6L12 11.1962L12 0.803847L2.62268e-07 6Z" />
								</svg>
							</div>}
							{index >= 0 && <div onClick={() => index !== windows.length - 1 ? setIndex(index + 1) : setOpen(false)}
								className='cursor-pointer absolute right-0 bottom-0 flex justify-center items-center h-14 w-14 bg-yellow-me rounded-tl-3xl'
							>
								<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"
									className="fill-black"
								>
									<path d="M12 6L4.64275e-07 11.1962L9.18537e-07 0.803847L12 6Z" />
								</svg>
							</div>}
						</div>
					</div>)}
			</>
		)
	}

	const handleSubmitFunction = (values, FormikBag) => {
		// console.log('handleSubmitFunction', values, FormikBag)
		onSubmit(values, FormikBag, authenticate)
	}

	return (
		<>
			<div
				className="container mx-auto flex flex-col md:flex-row h-screen md:bg-map bg-center">

				<div className="w-full md:w-1/3 flex-grow-0 bg-black-me flex justify-center items-center pt-7 md:pt-0">
					<img
						src={logoTaxiVertical}
						className="logo-taxi-vertical"
						alt="logo" />
				</div>

				<div className="w-full md:w-2/3 flex-grow flex justify-center items-center">
					<Formik
						onSubmit={handleSubmitFunction}
						// onSubmit={(values, FormikBag) => {
						// 	const { email, password } = values
						// 	authenticate(email, password)
						// 	FormikBag.setSubmitting(true) // защита от повторной отправки
						// }}
						initialValues={{ email: "test@test.com", password: "123123" }} // hard code - пользователь по умолчанию
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
								onSubmit={handleSubmit} className="max-w-xl flex flex-col justify-center w-full h-full lg:h-auto bg-white px-3  md:px-28 md:py-14 shadow rounded-2xl">

								<h4
									className="font-bold text-3xl text-black text-center">
									Войти
								</h4>

								<label className="flex flex-col pt-14 justify-between font-bold cursor-pointer">
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
										className="mt-2 md:mt-1 block w-full border-b-2 border-gray-300 shadow-sm
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
										className="mt-2 md:mt-1 block w-full border-b-2 border-gray-300 shadow-sm
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
									className="block text-center cursor-pointer mt-11 bg-yellow-me w-full py-4 text-2xl rounded-full disabled:opacity-75 disabled:cursor-default disabled:bg-gray-300 disabled:text-zinc-400">
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

			{/* Дополнительные 4ре слайда перед логином */}
			{width < 640 && open && <StartWindow setOpen={setOpen} />}
		</>
	)

}

Login.propTypes = {
	authenticate: PropTypes.func,
	isLoggedIn: PropTypes.bool,
	isLoading: PropTypes.bool
}

export default connect(
	(state) => ({
		isLoggedIn: state.authorizationReducer.isLoggedIn,
		isLoading: state.authorizationReducer.isLoading,
	}), // (isLoggedIn - поле для роутинга что бы ходить по роутам)
	{ authenticate } //диспатчим новый экшен
)(Login)

// connect принимает 2 аргумента
// -----------------------------1 селектор
// -----------------------------2 мапинг функции dispatch в props