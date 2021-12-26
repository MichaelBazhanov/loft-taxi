import React from "react";
import logoTaxi from '../assets/images/logo-taxi.svg';
import PropTypes from "prop-types";

const Header = (props) => {
	return (
		<header className="bg-black-me">
			<div className="container mx-auto py-5 px-8">

				<div className="flex justify-between items-center">
					<img src={logoTaxi} className="logo-taxi" alt="logo" />

					<nav className="flex text-white space-x-7">
						<button onClick={() => { props.navigate('map') }} type="button" className="hover:text-yellow-me text-xl">Карта</button>
						<button onClick={() => { props.navigate('profile') }} type="button" className="hover:text-yellow-me text-xl">Профиль</button>
						<button onClick={() => {
							props.logOut()
							props.navigate('login')
						}} type="button" className="hover:text-yellow-me text-xl">Выйти</button>
					</nav>

				</div>
			</div>
		</header>
	)
}
Header.propTypes = {
	props: PropTypes.shape({
		logOut: PropTypes.func.isRequired,
		navigate: PropTypes.func.isRequired
	})
}

export default Header