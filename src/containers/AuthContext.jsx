import React, { useState } from "react";

export const AuthContext = React.createContext()

export const AuthProvider = ({ children }) => { // компонент принимает в себя ребенка
	const [isLoggedIn, setIsLoggedIn] = useState(false) // устанавливаем простой state

	const logIn = ({ email, password }) => {
		// Если email, password правильные то мы меняет state на TRUE
		if (email !== 'valid@email.com' || password !== 'correctpassword') { // если проверку не прошли то возвращаем ничего
			return
		}
		// вход
		setIsLoggedIn(true)
	}

	// выход
	const logOut = () => {
		setIsLoggedIn(false)
	}

	// isLoggedIn для проверки доступности конкретной страницы
	// logIn функция входа
	// logOut функция выхода
	return (
		<AuthContext.Provider value={{ logIn, logOut, isLoggedIn }}>
			{children}
		</AuthContext.Provider>
	)
}

//HOC это компонент высшего порядка
export const withAuth = (WrapperComponent) => {
	return class extends React.Component {
		render() {
			return (
				<AuthContext.Consumer>
					{
						(contextProps) => (

							<WrapperComponent
								{...contextProps}
								{...this.props}
							/>

						)
					}
				</AuthContext.Consumer>
			)
		}
	}
}