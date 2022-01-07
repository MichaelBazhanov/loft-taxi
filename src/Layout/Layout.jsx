import React from "react";
import { Outlet } from "react-router-dom";

import Header from '../components/Header'

import { useLocation } from 'react-router-dom'

const Layout = () => {
	let location = useLocation();

	return (
		<div className='App sans antialiased'>
			{(location.pathname !== '/login' && location.pathname !== '/registration') && <Header />}
			{/* <Header /> */}
			<main>
				<section className="bg-black-me">
					<Outlet />
				</section>
			</main>
		</div >
	)
}

export default Layout

