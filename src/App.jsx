import React from 'react';
import routers from 'routers/index.js'
import {  NavLink, useRoutes } from 'react-router-dom'

const App = () => {
    return (
        <>
            <h4>NavLink 跳转标签组件 高亮样式 active</h4>
            <ul>
                <li><NavLink to="/comp1">comp1</NavLink></li>
                <li><NavLink to="/comp2">comp2</NavLink></li>
            </ul>
            {useRoutes(routers)}
        </>
    );
}


export default App;