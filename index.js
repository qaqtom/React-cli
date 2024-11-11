import React from 'react';
import ReactDom from 'react-dom';
import App from './src/App'
import { HashRouter } from 'react-router-dom'
import 'antd/dist/antd.css';

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
    <HashRouter>
        <App />
    </HashRouter>
    
)