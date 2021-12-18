import React from "react";
import logoTaxiVertical from '../assets/images/logo-taxi-vertical.svg';

class Login extends React.Component {
	state = { email: '', password: '', }

	handleSubmit = (event) => {
		event.preventDefault()

		// делаем что то с данными
		alert(`Форма отправлена! ${this.state.email} ${this.state.password}`)
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	render() {
		const { email, password } = this.state

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
						onSubmit={this.handleSubmit} className="max-w-xl bg-white px-28 py-14 shadow-sm rounded-2xl">
						<h4
							className="font-bold text-3xl text-black text-center mb-14">
							Войти
						</h4>

						<label
							className="flex flex-col justify-between font-bold cursor-pointer">
							<span>Email:</span>
							<input
								onChange={this.handleChange}
								value={email}
								type="email"
								name="email"
								placeholder="mail@mail.ru"
								className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
						</label>

						<label className="flex flex-col justify-between font-bold cursor-pointer mt-6">
							<span>Password:</span>
							<input
								onChange={this.handleChange}
								value={password}
								type="password"
								name="password"
								placeholder="*************"
								className="mt-1 block w-full border-b-2 border-gray-300 shadow-sm
						focus:outline-none focus:border-yellow-me focus:ring-yellow-me focus:placeholder-yellow-me
						placeholder:text-gray-me"/>
						</label>

						<p
							className="mt-3 text-right">
							<button
								type="button"
								className="inline-block text-gray-me cursor-pointer hover:text-yellow-me">
								Забыли пароль?
							</button>
						</p>

						<button
							type="submit"
							className="mt-11 bg-yellow-me w-full py-4 text-2xl rounded-full">
							Войти
						</button>

						<p
							className="mt-8 text-gray-me">
							Новый пользователь?&nbsp;
							<button
								onClick={() => { this.props.navigate('registration') }}
								type="button"
								className="inline-block text-yellow-me">
								Регистрация
							</button>
						</p>
					</form>
				</div>
			</div>
		)
	}
}

export default Login