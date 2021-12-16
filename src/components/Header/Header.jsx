import React from "react";
import './index.css'
import logoTaxi from '../../images/logo-taxi.svg';

const Header = () => {
	return (
		<header className="header">
			<div className="wrapper">
				<div className="header-container">
					<div className="header__logo">
						<img src={logoTaxi} className="logo-taxi" alt="logo" />
					</div>
					<nav className="header__nav-items">
						<a className="header__nav-item" href="#">Карта</a>
						<a className="header__nav-item" href="#">Профиль</a>
						<a className="header__nav-item" href="#">Выйти</a>
					</nav>
				</div>
			</div>
		</header>
	)
}

export default Header