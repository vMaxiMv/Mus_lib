import React from 'react';
import {Route, Routes } from 'react-router-dom';
import { musRoutes } from '../route';

const AppRouter = ()=>{
    return (
        <Routes>
            {musRoutes.map(({path, Component}) => 
                <Route key={path} path={path} element={<Component/>} />
            )}
        </Routes>
    )
}

export default AppRouter