import React, { useState, useEffect } from "react";
import logoTaxiVertical from '../assets/images/logo-taxi-vertical.svg';
import { useNavigate } from "react-router-dom";
import { connect } from 'react-redux'
import { getRegistration } from '../modules/registration'
import { sendPaymentCardNewUser } from '../modules/payment'

import Loading from '../components/Loading'
import Error from '../components/Error'

const Registration = ({ getRegistration, sendPaymentCardNewUser, isLoggedIn, isLoading, error }) => {
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
			sendPaymentCardNewUser() // Устанавливаем ему платежную карт пустую по умолчанию
			navigate("/map", { replace: true })
		} else {
			navigate("/registration", { replace: true })
		}

	}, [isLoggedIn])

	const { email, name, password, surname } = state

	if (isLoading) return <Loading />
	if (error) return <Error error={error} />

	return (
		<div
			className="container mx-auto flex h-screen bg-map bg-center">
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
				<form
					onSubmit={handleSubmit} className="max-w-xl w-full bg-white px-28 py-14 shadow-lg rounded-2xl" autoComplete="off">
					<h4
						className="font-bold text-3xl text-black text-center mb-14">
						Регистрация
					</h4>

					<label
						className="flex flex-col justify-between font-bold cursor-pointer">
						<span>Email*</span>
						<input
							onChange={handleChange}
							value={email}
							type="email"
							name="email"
							placeholder="mail@mail.ru"
							required
							autoComplete="off"
							className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
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
							className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
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
							className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
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
						className="block text-center cursor-pointer mt-11 bg-yellow-me w-full py-4 text-2xl rounded-full">
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
		isLoggedIn: state.authorizationReducer.isLoggedIn,
		isLoading: state.registrationReducer.isLoading,
		error: state.registrationReducer.error
	}),
	{ getRegistration, sendPaymentCardNewUser } //диспатчим новый экшен
)(Registration)