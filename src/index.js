import {
    BrowserRouter as Router,
    Route,
    Routes
  } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Power from './components/Power';
import Device from './components/Device';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Routes>
            <Route path="/" element={<App />}/>
            <Route path="/power" element={ <Power />}/>
            <Route path="device" element={ <Device />} />
        </Routes>
    </Router>
    
);
