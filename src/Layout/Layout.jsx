import React from "react";
import { Outlet } from "react-router-dom";
import Header from '../components/Header'
import { useLocation } from 'react-router-dom'
import Notification from '../components/Notification'
import { connect } from 'react-redux'
import { hide } from '../modules/tooltips'

const Layout = ({ isTooltipShown, tooltipText, tooltipType, hide }) => {
	let location = useLocation();

	return (
		<div className='App sans antialiased grid auto-cols-fr grid-rows-[auto_1fr] relative h-screen'>
			{(location.pathname !== '/login' && location.pathname !== '/registration' && location.pathname !== '/') && <Header />}

			<main>
				<section className="h-full bg-black-me">
					<Outlet />
				</section>
			</main>

			<div className={isTooltipShown ? 'notify-container active' : 'notify-container'}>
				<div className="notification">
					<Notification
						text={tooltipText}
						type={tooltipType}
						onClick={() => hide()}
					/>
				</div>
			</div>
		</div >
	)
}

export default connect(
	state => ({
		isTooltipShown: state.tooltipsReducer.isShown,
		tooltipText: state.tooltipsReducer.text,
		tooltipType: state.tooltipsReducer.type,
	}),
	{ hide }
)(Layout)

