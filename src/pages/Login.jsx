import React, { useState } from "react";
import logoTaxiVertical from '../assets/images/logo-taxi-vertical.svg';
import { connect } from 'react-redux'
import { authenticate } from '../actions' //просто импортируем action
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const Login = ({ authenticate, isLoggedIn }) => {
	const [state, setState] = useState({ email: 'test@test.com', password: '123123' }) // hard code

	const navigate = useNavigate()

	const handleSubmit = (event) => {
		event.preventDefault()
		// делаем что то с данными

		const { email, password } = state // получаем из state
		authenticate(email, password) // отдаем данные для авторизации
	}

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.value })
	}

	const { email, password } = state

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
				{
					isLoggedIn
						?
						<span
							onClick={() => { navigate("/map", { replace: true }) }}
							className="block text-center cursor-pointer mt-11 bg-yellow-me py-4 px-10 text-2xl rounded-full">
							Перейти на карту
						</span>
						:
						<form
							onSubmit={handleSubmit} className="max-w-xl w-full bg-white px-28 py-14 shadow-lg rounded-2xl ">
							<h4
								className="font-bold text-3xl text-black text-center mb-14">
								Войти
							</h4>

							<label
								className="flex flex-col justify-between font-bold cursor-pointer">
								<span>Email*</span>
								<input
									onChange={handleChange}
									value={email}
									type="email"
									name="email"
									required
									placeholder="mail@mail.ru"
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
									required
									placeholder="*************"
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
				}

			</div>
		</div>
	)

}

Login.propTypes = {
	authenticate: PropTypes.func.isRequired,
	isLoggedIn: PropTypes.bool.isRequired
}

export default connect(
	(state) => ({ isLoggedIn: state.auth.isLoggedIn }), // ЭТО СЕЛЕКТОР - (state) (auth - это имя reducers) (isLoggedIn - поле)
	{ authenticate } //диспатчим новый экшен
)(Login)

// connect принимает 2 аргумента
// -----------------------------1 селектор
// -----------------------------2 мапинг функции dispatch в props