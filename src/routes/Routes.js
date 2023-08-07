import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from '../pages/login/login.js'
import CompFormPrese from '../pages/formPres/CompoForm.js'
import Dashboard from '../pages/dashboard/dashboard.js'
import Home from '../pages/home/home.js'
import Stadistic from "../pages/stadistic/stadistic.js";

import { ProtectedRoute } from "../componentes/ProtectedRouter.jsx";



function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route replace path="/" element={<Login />} />
                <Route element={<ProtectedRoute/>} >
                <Route replace path="/home" element={<Home />} />
                    <Route replace path="/formpres" element={<CompFormPrese />} />
                    <Route replace path="/dashboard" element={<Dashboard />} />
                    <Route replace path="/stadistic" element={<Stadistic />} />
                    <Route replace path="*" element={<Navigate replace to="/" />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default Router