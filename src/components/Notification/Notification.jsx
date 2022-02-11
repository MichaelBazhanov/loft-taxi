import React from "react";
import PropTypes from "prop-types";

const Notification = ({ type = 'success', text = '', onClick }) => {
	return (
		<div className={`min-w-[400px] relative flex justify-between items-center text-white rounded-t-lg ${type}`}>
			<div className="pl-5 select-none">{text}</div>
			<button onClick={onClick} className="p-5 text-black ml-5 cursor-pointer
			hover:text-white
			transition-colors duration-500 ease-in-out">
				<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 stroke-current stroke-[3px]" viewBox="0 0 20 20" fill="currentColor">
					<path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
				</svg>
			</button>
		</div>
	)
}

Notification.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func
}

export default Notification