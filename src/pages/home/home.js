import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie'


const cookies = new Cookies()
const meicimg = "logo_meic.jpg";
const alegaimg = "logo.png";
const URI = "https://fwmback-production.up.railway.app/asepress";



function Home() {
  const [ agente, setAgente ] = useState(cookies.get('info'))

  const CerrarSession = () => {
    const respuesta = confirm("¿Desea salir?")
    if (respuesta == true) {
      cookies.remove('info')
      cookies.remove('token')
    }
  }

  const [ reportes, setReportes ] = useState([])
  useEffect(() => {
    getReportes()
  }, [])

  const getReportes = async () => {
    const res = await axios.get(URI)
    const report = res.data
    setReportes(report)
  }

  return (
    <>
      <nav className="navbar bg-body-white fixed-top position-relative shadow">
        <div className="container-fluid">
          <img
            src={meicimg}
            alt="MEIC"
            width="140"
            height="55"
            className="d-flex justify-content-start"
          />
          <p className="fs-2 fw-bolder text-center clrTitle">Pagina Principal</p>
          <p className="mt-5 text-secondary d-flex flex-row-reverse">
            Agente: {agente}
          </p>
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Opciones</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    to={"/home"}
                    id="btnenviar"
                    type="buttom"
                    className="nav-link"
                    aria-current="page">
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href={"/formpres"}
                    id="btnenviar"
                    type="button"
                    className="nav-link"
                    aria-current="page">
                    Formulario Solicitud Asesoria
                  </a>
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
                <li className="nav-item">
                  <Link
                    to={"/"}
                    id="btncerrar"
                    type="button"
                    className="nav-link"
                    onClick={() => CerrarSession()}
                    aria-current="page">
                    Salir
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

 
          <br/>
        <br/>
      <br/>
      <br/>
        <br/>
      <br/>
      <div className="container-fluid top-50">
        <div className="row">
      <img
            src={meicimg}
            alt="MEIC"
            width="160"
            height="200"
            className="col d-flex justify-content-start"
          /> <img
          src={alegaimg}
          alt="ALEGA"
          width="160"
          height="200"
          className="col d-flex justify-content-end"
        />
      </div></div>
    </>
  );
}

export default Home;