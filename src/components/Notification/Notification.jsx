import React from "react";
import PropTypes from "prop-types";

const Notification = ({ type = 'success', text = '', onClick }) => {
	return (
		<div className={`inner-tooltip-container ${type}`}>
			<div className="tooltip__text">{text}</div>
			<button onClick={onClick} className="tooltip__close"></button>
		</div>
	)
}

Notification.propTypes = {
	type: PropTypes.string,
	text: PropTypes.string,
	onClick: PropTypes.func
}

export default Notification