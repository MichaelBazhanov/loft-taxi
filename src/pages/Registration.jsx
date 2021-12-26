import React, { useState } from "react";
import logoTaxiVertical from '../assets/images/logo-taxi-vertical.svg';

const Registration = ({ navigate }) => {
	const [state, setState] = useState({ email: '', name: '', password: '' })

	const handleSubmit = (event) => {
		event.preventDefault()
		// делаем что то с данными
		alert(`Форма отправлена! ${state.email} ${state.name} ${state.password}`)
	}

	const handleChange = (event) => {
		setState({...state,  [event.target.name]: event.target.value })
	}

	const { email, name, password } = state

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
					onSubmit={handleSubmit} className="max-w-xl w-full bg-white px-28 py-14 shadow-lg rounded-2xl">
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

					<span
						className="block text-center cursor-pointer mt-11 bg-yellow-me w-full py-4 text-2xl rounded-full">
						Зарегистрироваться
					</span>

					<p
						className="mt-8 text-gray-me text-center">
						Уже зарегистрированы?&nbsp;
						<span
							onClick={() => { navigate('login') }}
							className="inline-block text-yellow-me cursor-pointer">
							Войти
						</span>
					</p>
				</form>
			</div>
		</div>
	)

}

export default Registration