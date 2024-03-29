import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {createStore} from "redux";
import registerServiceWorker from './registerServiceWorker';
import personReducer from "./store/reducer";
import {Provider} from "react-redux";

const store = createStore(personReducer);

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
