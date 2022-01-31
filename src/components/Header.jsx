import React from "react";
import logoTaxi from '../assets/images/logo-taxi.svg';
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { logOut } from '../modules/authorization' //просто импортируем action
import { NavLink } from 'react-router-dom'

const setActive = ({ isActive }) => isActive ? 'text-yellow-me' : ''

const Header = ({ logOut }) => {
	return (
		<header className="bg-black-me">
			<div className="container mx-auto py-5 px-8">

				<div className="flex justify-between items-center">
					<img src={logoTaxi} className="logo-taxi" alt="logo" />

					<nav className="flex text-white space-x-7">

						<button type="button" className="hover:text-yellow-me text-xl">
							<NavLink to={'map'} className={setActive}>Карта</NavLink>
						</button>

						<button type="button" className="hover:text-yellow-me text-xl">
							<NavLink to={'profile'} className={setActive}>Профиль</NavLink>
						</button>

						<button onClick={() => { logOut() }} type="button" className="hover:text-yellow-me text-xl">
							<NavLink to={'login'} className={setActive}>Выйти</NavLink>
						</button>

					</nav>

				</div>
			</div>
		</header>
	)
}
Header.propTypes = {
	props: PropTypes.shape({
		logOut: PropTypes.func.isRequired,
	})
}

// export default Header

export default connect(
	null,
	{ logOut } //диспатчим экшен
)(Header)