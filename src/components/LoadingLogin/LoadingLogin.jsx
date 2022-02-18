import React from "react";
import logoTaxiVertical from '../../assets/images/logo-taxi-vertical.svg';

const LoadingLogin = () => {
	return (
		<div className="flex flex-col justify-center items-center w-full h-screen">
			<div className="w-full md:w-1/3 flex-grow-0 bg-black-me flex justify-center items-center pt-7">
				<img
					src={logoTaxiVertical}
					className="logo-taxi-vertical"
					alt="logo" />
			</div>
			<svg className="animate-spin h-10 w-10 text-yellow-me" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
				<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
				<path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
			</svg>
		</div>
	)
}

export default LoadingLogin