import React, { Component } from "react";
// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxGl from '!mapbox-gl';
import { connect } from 'react-redux'

import { HOCMapContainer } from '../components/MapContainer'

export const drawRoute = (map, coordinates, width) => {
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

	//Вписываем маршрут в размер экрана
	const bounds = new mapboxGl.LngLatBounds(
		coordinates[0],
		coordinates[0]
	);
	for (const coord of coordinates) {
		bounds.extend(coord);
	}
	let cord = width < 1024 ? { padding: { top: 20, bottom: 200, left: 20, right: 20 } } : { padding: 40 }
	map.fitBounds(bounds, cord);

};

class Map extends Component {
	state = { width: window.innerWidth }; // ресайз
	map = null
	mapContainer = React.createRef(); // создаем ссылку

	updateDimensions = () => {
		this.setState({
			width: window.innerWidth
		})
	}

	componentDidMount() {
		mapboxGl.accessToken = 'pk.eyJ1IjoibWljaGFlbDMzIiwiYSI6ImNreG4xYWVycjA0NDgybm9lbW55ZTN6d2EifQ.v5o2tFYQgax6FxvwN-Vd1g'

		this.map = new mapboxGl.Map({ // создаем карту и вкладываем настройки
			container: this.mapContainer.current, // это ссылка на элемент которому мы передали референс
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [40.41667, 56.13333], // starting position [lng, lat]
		})
		// const bbox = [[-79, 43], [-73, 45]];
		// this.map.fitBounds(bbox, {
		// 	padding: 20
		// });
		window.addEventListener("resize", this.updateDimensions);
	}

	componentDidUpdate() {
		if (this.map.getLayer('route')) {
			this.map.removeLayer('route');
		}
		if (this.map.getSource('route')) {
			this.map.removeSource('route');
		}
		if (this.props.coordinates.length > 0) {
			drawRoute(this.map, [...this.props.coordinates], this.state.width)
		}
	}

	componentWillUnmount() {
		this.map.remove(); // удаляем карту
		window.removeEventListener("resize", this.updateDimensions);
	}

	render() {

		return (
			<div className="relative h-full overflow-hidden">
				<div
					data-testid='map'
					className="absolute inset-0"
					ref={this.mapContainer}
				/>
				<HOCMapContainer />
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
