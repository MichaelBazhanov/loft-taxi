import React, { Component } from "react";
import mapboxGl from "mapbox-gl";

import FormForMap from '../components/FormForMap'

class Map extends Component {
	map = null
	mapContainer = React.createRef(); // создаем ссылку

	componentDidMount() {
		mapboxGl.accessToken = 'pk.eyJ1IjoibWljaGFlbDMzIiwiYSI6ImNreG4xYWVycjA0NDgybm9lbW55ZTN6d2EifQ.v5o2tFYQgax6FxvwN-Vd1g'

		this.map = new mapboxGl.Map({ // создаем карту и вкладываем настройки
			container: this.mapContainer.current, // это ссылка на элемент которому мы передали референс
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [40.41667, 56.13333], // starting position [lng, lat]
			zoom: 12 // starting zoom
		})
	}

	componentWillUnmount() {
		this.map.remove(); // удаляем карту
	}

	render() {

		return (
			// <div className="bg-map bg-center">
			// 	<div className="container mx-auto h-screen ">

			// 		{/* <FormForMap /> */}

			// 		<div className="map-wrapper">
			// 			<div
			// 				data-testid='map'
			// 				className="map"
			// 				ref={this.mapContainer}
			// 			>
			// 			</div>
			// 		</div>

			// 	</div>
			// </div>
			<div className="relative">
				<div
					data-testid='map'
					className="absolute inset-0"
					ref={this.mapContainer}
				>
				</div>
					<FormForMap />
			</div>
		)
	}
}

export default Map