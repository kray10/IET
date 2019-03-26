import React from 'react';
import ReactDOM from 'react-dom';
import './client/index.css';
import App from './client/App';
import * as serviceWorker from './client/serviceWorker';
import Firebase, {FirebaseContext} from './client/Auth'

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <FirebaseContext.Consumer>
            {firebase => <App firebase={firebase}/>}
        </FirebaseContext.Consumer>
    </FirebaseContext.Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
