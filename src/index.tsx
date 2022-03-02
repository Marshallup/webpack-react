import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'src/redux';
import App from 'src/App';

import 'assets/styles/app.scss';

ReactDOM.render(
    <StrictMode>
        <Provider store={store}>
            <Router>
                <App/>
            </Router>
        </Provider>
    </StrictMode>,
    document.getElementById('app')
);

if (module.hot) { // enables hot module replacement if plugin is installed
    module.hot.accept();
}