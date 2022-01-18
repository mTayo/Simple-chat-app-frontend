import React from 'react';
import { render } from "react-dom"
import './index.css';
import App from './App';
import {store} from 'store/configureStore';
import { Provider } from "react-redux";

const rootElement = document.getElementById("root")
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)


