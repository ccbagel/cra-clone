import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById("root"));

registerServiceWorker();

// register service worker
function registerServiceWorker() {
    if('serviceWorker' in navigator) {
        navigator.serviceWorker.register("service-worker.js")
            .then(() => {
                console.log("service worker successfully registered");
            })
            .catch(err => {
                console.log(err, err.message)
            })
    }
}

// unregister service worker
function unregisterServiceWorker() {
    navigator.serviceWorker.getRegistrations().then(registrations => {
        registrations.forEach(reg => reg.unregister());
    })
} 