import React, { useState, useEffect } from "react";
import logoTaxiVertical from '../assets/images/logo-taxi-vertical.svg';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { getRegistration } from '../modules/registration'
import { sendPaymentCardNewUser } from '../modules/payment'

import Loading from '../components/Loading'

const Registration = ({ getRegistration, sendPaymentCardNewUser, token, isLoggedIn, isLoading }) => {
	const [state, setState] = useState({ email: 'email@example.com', name: 'Name', password: 'password', surname: 'Surname' })

	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()

		const { email, password, name, surname } = state // получаем из state
		getRegistration(email, password, name, surname) // Регистрируем пользователя
	}

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	useEffect(() => { // Следим за isLoggedIn в redux
		if (isLoggedIn) {
			sendPaymentCardNewUser(token) // Устанавливаем ему платежную карт пустую по умолчанию
			navigate("/map", { replace: true })
		} else {
			navigate("/registration", { replace: true })
		}

	}, [isLoggedIn])

	const { email, name, password, surname } = state

	if (isLoading) return <Loading />

	return (
		<div className="container mx-auto flex flex-col md:flex-row h-screen md:bg-map bg-center">

			<div className="w-full md:w-1/3 flex-grow-0 bg-black-me flex justify-center items-center pt-7 md:pt-0">
				<img
					src={logoTaxiVertical}
					className="logo-taxi-vertical"
					alt="logo" />
			</div>

			<div className="w-full md:w-2/3 flex-grow flex justify-center items-center">

				<form
					onSubmit={handleSubmit} className="max-w-xl flex flex-col justify-center w-full h-full lg:h-auto bg-white px-3 py-16 md:px-28 md:py-14 shadow-lg rounded-2xl">

					<h4
						className="font-bold text-3xl text-black text-center">
						Регистрация
					</h4>

					<label
						className="flex flex-col pt-14 justify-between font-bold cursor-pointer">
						<span>Email*</span>
						<input
							onChange={handleChange}
							value={email}
							type="email"
							name="email"
							placeholder="mail@mail.ru"
							required
							autoComplete="off"
							className="mt-2 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
					</label>

					<label className="flex flex-col justify-between font-bold cursor-pointer mt-6">
						<span>Name*</span>
						<input
							onChange={handleChange}
							value={name}
							type="text"
							name="name"
							placeholder="Michael"
							required
							autoComplete="off"
							className="mt-2 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
					</label>

					<label className="flex flex-col justify-between font-bold cursor-pointer mt-6">
						<span>Surname*</span>
						<input
							onChange={handleChange}
							value={surname}
							type="text"
							name="surname"
							placeholder="Bashanov"
							required
							autoComplete="off"
							className="mt-2 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
					</label>

					<label className="flex flex-col justify-between font-bold cursor-pointer mt-6">
						<span>Password*</span>
						<input
							onChange={handleChange}
							value={password}
							type="password"
							name="password"
							placeholder="*************"
							required
							autoComplete="off"
							className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
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