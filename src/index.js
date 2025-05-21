import React from 'react';
import ReactDOM from 'react-dom/client';
import './Home.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter basename="/personal-website">
        <App />
    </BrowserRouter>
);
