import React from "react";

const Error = ({ error }) => {
	return (
		<div className="flex justify-center items-center w-full h-screen">
			<div className="p-3 text-yellow-me text-4xl">{error ? error : 'Произошла сетевая ошибка'}</div>
		</div>
	)
}

export default Error