import React from "react";
import LogoTaxi from '../../images/logo-taxi.svg';

const Header = () => {
	return (
		<header className="bg-black-me">
			<div className="container mx-auto py-5 px-8">

				<div className="flex justify-between items-center">
					<img src={LogoTaxi} className="logo-taxi" alt="logo" />

					<nav className="flex text-white space-x-7">
						<a className="hover:text-yellow-me text-xl" href="#map">Карта</a>
						<a className="hover:text-yellow-me text-xl" href="#profile">Профиль</a>
						<a className="hover:text-yellow-me text-xl" href="#login">Выйти</a>
					</nav>

				</div>
			</div>
		</header>
	)
}

export default Header