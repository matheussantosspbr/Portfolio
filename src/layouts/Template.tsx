import {BrowserRouter, Routes, Route, } from 'react-router-dom'

// Template
import Header from "./Header";
import Footer from "./Footer";
import ButtonTop from './ButtonTop';

// Paginas Principais
import Inicio from '../views/Inicio';
import Sobre from '../views/Sobre';
import Portfolio from '../views/Portfolio';
import Certificado from '../views/Certificados';
import NotFound from '../views/NotFound';

export default function Template() {
    return (
        <>
            
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path='/' element={<Inicio/>}/>
                    <Route path='/sobre' element={<Sobre/>}/>
                    <Route path='/portfolio' element={<Portfolio/>}/>
                    <Route path='/certificados' element={<Certificado/>}/>
                    <Route path='*' element={<NotFound />} />
                </Routes>
                <ButtonTop/>
                <Footer/>
             </BrowserRouter>
            
        </>
      
    )
}