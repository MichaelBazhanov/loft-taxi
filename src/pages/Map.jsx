import React, { Component } from "react";
import mapboxGl from "mapbox-gl";
import { connect } from 'react-redux'

import FormForMap from '../components/FormForMap'

export const drawRoute = (map, coordinates) => {
	map.flyTo({
		center: coordinates[0],
		zoom: 10
	});

	map.addLayer({
		id: "route",
		type: "line",
		source: {
			type: "geojson",
			data: {
				type: "Feature",
				properties: {},
				geometry: {
					type: "LineString",
					coordinates
				}
			}
		},
		layout: {
			"line-join": "round",
			"line-cap": "round"
		},
		paint: {
			"line-color": "#ffc617",
			"line-width": 8
		}
	});
};

class Map extends Component {
	map = null
	mapContainer = React.createRef(); // создаем ссылку

	componentDidMount() {
		mapboxGl.accessToken = 'pk.eyJ1IjoibWljaGFlbDMzIiwiYSI6ImNreG4xYWVycjA0NDgybm9lbW55ZTN6d2EifQ.v5o2tFYQgax6FxvwN-Vd1g'

		this.map = new mapboxGl.Map({ // создаем карту и вкладываем настройки
			container: this.mapContainer.current, // это ссылка на элемент которому мы передали референс
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [40.41667, 56.13333], // starting position [lng, lat]
		})

	}

	componentDidUpdate() {
		if (this.map.getLayer('route')) {
			this.map.removeLayer('route');
		}
		if (this.map.getSource('route')) {
			this.map.removeSource('route');
		}
		if (this.props.coordinates.length > 0) {
			drawRoute(this.map, [...this.props.coordinates])
		}
	}

	componentWillUnmount() {
		this.map.remove(); // удаляем карту
	}

	render() {

		return (
			<div className="relative h-full">
				<div
					data-testid='map'
					className="absolute inset-0"
					ref={this.mapContainer}
				/>
				<FormForMap />
			</div>
		)
	}
}

export default connect(
	state => ({
		coordinates: state.routesReducer.coordinates,
	}),
	null
)(Map)
