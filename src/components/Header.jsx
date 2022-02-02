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
		if (parent) {
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

					<div className="bg-transparent py-5 px-8 pl-3 fixed z-20 cursor-pointer" id="toggle-menu" onClick={toggleMenu}>

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

						<nav className="h-full flex flex-col justify-center items-center text-white select-none">

							<button onClick={() => { toggleMenuDefault() }} type="button" className="hover:text-yellow-me text-3xl leading-loose flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
								</svg>
								<NavLink to={'map'} className={({ isActive }) => (isActive ? 'text-yellow-me ml-2' : 'ml-2' )}>Карта</NavLink>
							</button>

							<button onClick={() => { toggleMenuDefault() }} type="button" className="hover:text-yellow-me text-3xl leading-loose flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
								</svg>
								<NavLink to={'profile'} className={({ isActive }) => (isActive ? 'text-yellow-me ml-2' : 'ml-2' )}>Профиль</NavLink>
							</button>

							<button onClick={() => { logOut(); toggleMenuDefault() }} type="button" className="hover:text-yellow-me text-3xl leading-loose flex items-center">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
								</svg>
								<NavLink to={'login'} className={({ isActive }) => (isActive ? 'text-yellow-me ml-2' : 'ml-2' )}>Выйти</NavLink>
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