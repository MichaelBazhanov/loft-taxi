import React from "react";
import { Outlet } from "react-router-dom";

import Header from '../components/Header'

import { useLocation } from 'react-router-dom'

const Layout = () => {
	let location = useLocation();
	// 1grid-rows-[auto_1fr]1
	return (
		<div className='App sans antialiased grid auto-cols-fr grid-rows-[auto_1fr] h-screen overflow-hidden'>
			{(location.pathname !== '/login' && location.pathname !== '/registration' && location.pathname !== '/') && <Header/>}
			<main>
				<section className="h-full bg-black-me">
					<Outlet />
				</section>
			</main>
		</div >
	)
}

export default Layout

