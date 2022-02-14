import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { connect } from 'react-redux'

//============================================================================Моя вставка на роутер
const PrivateRoute = ({ children, isLoggedIn }) => {
	// const location = useLocation();


	if (!isLoggedIn) {
		return <Navigate to='/login' state={{ replace: true }} /> //те в '/login' сможем узнать то откуда мы пришли через {state: location}
	}
	return children
}

export default connect(
	state => ({ isLoggedIn: state.authorizationReducer.isLoggedIn }) // selector
)(PrivateRoute)
//============================================================================Моя вставка на роутер

//====================================================================из LoftSchool по старому роуту
// import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
// import { connect } from 'redux'

// export const PrivateRoute = connect(
// 	state => ({ isLoggedIn: state.auth.isLoggedIn }) // selector
// )(
// 	({ element: Component, isLoggedIn, ...rest }) => (
// 		<Routes>
// 			<Route
// 				{...rest}
// 				element={(props) => {
// 					isLoggedIn ? <Component {...props} /> : <Navigate to={'/login'} replace />
// 				}}
// 			/>
// 		</Routes>
// 	)
// )
// // 8 строка
// //         1) Принимает любой компонент =>component: Component
// //         2) Принимает props =>isLoggedIn
// //         3) Принимает все оставшиеся props'Ы =>...rest
// // 9 строка - это тело компонента

//Копируем ребенка с props'ами=====================================
// const childrenWithProps = React.Children.map(children, child => {
// 	if (React.isValidElement(child)) {
// 		return React.cloneElement(child, { props });
// 	}
// 	return child;
// });

// return <div>{childrenWithProps}</div>
//==================================================================