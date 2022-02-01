import React, { useEffect, useState } from "react";
import logoTaxi from '../assets/images/logo-taxi.svg';
import PropTypes from "prop-types";
import { connect } from 'react-redux'
import { logOut } from '../modules/authorization' //просто импортируем action
import { NavLink } from 'react-router-dom'

const setActive = ({ isActive }) => isActive ? 'text-yellow-me' : ''

const Header = ({ logOut }) => {
	const [width, setWidth] = useState(window.innerWidth);
	const updateDimensions = () => {
		setWidth(window.innerWidth);
	}
	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const toggleMenu = (e) => {
		const parent = e.target.closest('#toggle-menu')
		if(parent) {
			parent.classList.toggle('active-toggle-menu');

			const menuContent = document.querySelector('#toggle-menu-content')

			if (menuContent.classList.contains('animate-menu-in')) {
				menuContent.classList.remove('animate-menu-in'); //убираем класс
				menuContent.classList.add('animate-menu-out'); //добавляем класс
			} else {
				menuContent.classList.add('animate-menu-in'); //добавляем класс
				menuContent.classList.remove('animate-menu-out'); //убираем класс
			}
		}
	}

	const toggleMenuDefault = () => {
		const menuContent = document.querySelector('#toggle-menu-content')
		menuContent.classList.remove('animate-menu-in'); //убираем класс
		menuContent.classList.remove('animate-menu-out'); //убираем класс

		const menu = document.querySelector('#toggle-menu')
		menu.classList.remove('active-toggle-menu'); //убираем класс
	}

	return (
		<>
			{width > 640 &&
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
			}
			{width < 640 &&
				<header>
					<div className="bg-transparent py-5 px-8 fixed z-20 cursor-pointer" id="toggle-menu" onClick={toggleMenu}>

						<div className="text-black-me">
							<svg
								width="25"
								height="17"
								viewBox="0 0 25 17"
								xmlns="http://www.w3.org/2000/svg"
								className="cursor-pointer fill-current"
							>
								<rect width="25" height="3" rx="1.5" />
								<rect y="7" width="17" height="3" rx="1.5" />
								<rect y="14" width="25" height="3" rx="1.5" />
							</svg>
						</div>

					</div>
					<div className="bg-black absolute inset-0 z-10 transform -translate-x-full"
						id="toggle-menu-content">

						<nav className="h-full flex flex-col justify-center items-center text-white">

							<button onClick={() => { toggleMenuDefault() }} type="button" className="hover:text-yellow-me text-3xl leading-loose">
								<NavLink to={'map'} className={setActive}>Карта</NavLink>
							</button>

							<button onClick={() => { toggleMenuDefault() }} type="button" className="hover:text-yellow-me text-3xl leading-loose">
								<NavLink to={'profile'} className={setActive}>Профиль</NavLink>
							</button>

							<button onClick={() => { logOut(); toggleMenuDefault() }} type="button" className="hover:text-yellow-me text-3xl leading-loose">
								<NavLink to={'login'} className={setActive}>Выйти</NavLink>
							</button>

						</nav>

					</div>
				</header>
			}
		</>

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