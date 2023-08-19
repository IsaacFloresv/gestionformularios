
import { useState } from 'react';
import Cookies from 'universal-cookie'
import "./dashboard.css"

const cookies = new Cookies()


function Dheader() {

    /*const [ agente, setAgente ] = useState(cookies.get('info'))


    //Cerrar Secion
    const CerrarSession = () => {
        cookies.remove('info')
        cookies.remove('token')
    }

    const Redireccion = () => {
        if (cookies.get('info')) {
            window.location.assign('/formpres')
        }
    }*/

    return (

        <header className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow container-flud">
            <a className="navbar-brand col-md-3 col-lg-2 me-0 px-3 fs-6 bg-transparent" href="#">ATENCION EN PLATAFORMA MEIC</a>
            <h2 className="navbar-brand col-md-3 col-lg-2 fs-6 bg-transparent text-end"> Agente: {agente}</h2>
            <div className="navbar-nav">
                <div className="nav-item text-nowrap">
                    <a className="nav-link px-3" href="/login" onClick={() => CerrarSession()}>SALIR</a>
                </div>
            </div>
        </header>
    )
}

export default Dheader;