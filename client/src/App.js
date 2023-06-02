import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import Explorar from "./pages/Explorar";
import React from "react";
import "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import PlanAmpliado from "./components/PlanAmpliado/planAmpliado";
import Plan from "./components/Plan/Plan";
import ExplorarCategoria from "./pages/ExplorarCategoria";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/perfil/:id" element={<Perfil />} />
                    <Route path="/explorar" element={<Explorar />} />
                    <Route path="/explorar/:categoria_id" element={<ExplorarCategoria />} />
            <Route path="/plan/:id" element={<PlanAmpliado/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
