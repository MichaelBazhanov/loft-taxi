import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'

//Router
import { BrowserRouter } from 'react-router-dom'

//Redux
import { Provider } from 'react-redux'

//Store
import createStore from './store'
const store = createStore();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
)
