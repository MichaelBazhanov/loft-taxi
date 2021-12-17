import React from "react";

const Home = () => {
	return (
		<form>
			<label htmlFor="email">Email: </label>
			<input id="email" type="email" name="email" size='28' />

			<label htmlFor="name">Name: </label>
			<input id="name" type="text" name="name" size='28' />

			<label htmlFor="password">Password: </label>
			<input id="password" type="password" name="password" size='28' />
		</form>
	)
}

export default Home