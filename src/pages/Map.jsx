import React, { Component } from "react";
import mapboxGl from "mapbox-gl";
import { connect } from 'react-redux'
import { getRoutes } from '../actions' //просто импортируем action

import FormForMap from '../components/FormForMap'

class Map extends Component {
	map = null
	mapContainer = React.createRef(); // создаем ссылку

	componentDidMount() {
		// mapboxGl.accessToken = 'pk.eyJ1IjoibWljaGFlbDMzIiwiYSI6ImNreG4xYWVycjA0NDgybm9lbW55ZTN6d2EifQ.v5o2tFYQgax6FxvwN-Vd1g'

		// this.map = new mapboxGl.Map({ // создаем карту и вкладываем настройки
		// 	container: this.mapContainer.current, // это ссылка на элемент которому мы передали референс
		// 	style: 'mapbox://styles/mapbox/streets-v11', // style URL
		// 	center: [40.41667, 56.13333], // starting position [lng, lat]
		// 	// center: this.props.coordinates[2], // starting position [lng, lat]
		// 	zoom: 12 // starting zoom
		// })

		this.props.getRoutes()
	}

	componentWillUnmount() {
		this.map.remove(); // удаляем карту
	}

	render() {

		return (
			<div className="relative">
				<div
					data-testid='map'
					className="absolute inset-0"
					ref={this.mapContainer}
				>
				</div>
				{/* <h1>========================================</h1>
				{this.props.coordinates}
				<h1>========================================</h1> */}
				<FormForMap />
			</div>
		)
	}
}

export default connect(
	state => ({
		coordinates: state.routes.coordinates,
	}),
	{ getRoutes } // просто дергаем ACTION
)(Map)
