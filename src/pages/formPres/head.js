import { useState } from 'react';
import Cookies from 'universal-cookie'
const cookies = new Cookies()
import { Link } from "react-router-dom";




const CompHead = () => {
const [agente, setAgente] = useState(cookies.get('info'))

const CerrarSession = () => {
  const respuesta = confirm("¿Desea salir?")
  if (respuesta == true) {
    cookies.remove('info')
    cookies.remove('token')
  }
}


  const meicimg = "logo_meic.jpg";
  return (
    <header>
      <nav class="navbar bg-body-white fixed-top position-relative shadow">
        <div class="container-fluid">
          <img
            src={meicimg}
            alt="MEIC"
            width="140"
            height="55"
            className="d-flex justify-content-start"
          />
          <p class="fs-2 fw-bolder text-center clrTitle">SOLICITUD ASESORIA</p>
          <p className="mt-5 text-secondary d-flex flex-row-reverse">
                Agente: {agente}
              </p>
          <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Opciones</h5>
              <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div class="offcanvas-body">
              <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li class="nav-item">
                  <Link
                    to={"/home"}
                    id="btnenviar"
                    type="buttom"
                    className="nav-link"
                    aria-current="page">
                    Inicio
                  </Link>
                </li>
                <li class="nav-item">
                  <a
                    href={"/dashboard"}
                    id="btnenviar"
                    type="button"
                    className="nav-link"
                    aria-current="page">
                    Listado de Formularios de Asesoria
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href={"/stadistic"}
                    id="btnenviar"
                    type="button"
                    className="nav-link"
                    aria-current="page">
                    Estadisticas
                  </a>
                </li>
                <li class="nav-item">
                  <Link
                    to={"/"}
                    id="btncerrar"
                    type="button"
                    className="nav-link"
                    onClick={()=>CerrarSession()}
                    aria-current="page">
                    Salir
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default CompHead;
