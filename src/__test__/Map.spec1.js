// import React from 'react'
// import TestRenderer from 'react-test-renderer'
// import { Provider } from 'react-redux'

// import Map from '../pages/Map'

// // Мокаем useNavigate что бы внутри <Map /> отдал просто функцию (ПО СУТИ МЫ МОКАЕМ ХУК)
// jest.mock('mapbox-gl', () => ({
//   // ...jest.requireActual('mapbox-gl'),
//   mapboxGl: () => ({
//     accessToken: '',
//     Map: jest.fn(() => true),
//   }),
// }))
// jest.mock('../components/FormForMap', () => () =>  (<div>Home component</div>) )

// // Формируем замоканый стор
// const mockStore = {
//   getState: () => ({
//     // входящие пропсы
//     routesReducer: { coordinates: [] },
//   }),
//   subscribe: () => {},
//   dispatch: () => {},
// }

// it('Renders correctly', () => {
//   const MapExample = TestRenderer.create(
//     <Provider store={mockStore}>
//       <Map />
//     </Provider>,
//   ).toJSON()

//   expect(MapExample).toMatchSnapshot()
// })
