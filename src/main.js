import React from "react";
import ReactDOM from "react-dom";
import App from '@/App';

import 'scss/app.scss';
// import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<App/>, document.getElementById('app'));

if (module.hot) { // enables hot module replacement if plugin is installed
 module.hot.accept();
}