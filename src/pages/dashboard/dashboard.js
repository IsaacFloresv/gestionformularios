import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie'

import ReactHTMLTableToExcel from './ReactHTMLTableToExcel.jsx'


const cookies = new Cookies()
const meicimg = "logo_meic.jpg";
const URI = "https://fwmback-production.up.railway.app/asepress";



function Dashboard() {
  const [ agente, setAgente ] = useState(cookies.get('info'))

  const CerrarSession = () => {
    const respuesta = confirm("¿Desea salir?")
    if (respuesta == true) {
      cookies.remove('info')
      cookies.remove('token')
    }
  }


  const [ dreportes, setDReportes ] = useState([])
  const [ freportes, setFReportes ] = useState([])
  const [ reportes, setReportes ] = useState([])
  useEffect(() => {
    getReportes()
  }, [])

  const getReportes = async () => {
    const res = await axios.get(URI)
    const report = res.data
    
    setReportes(report)
    setDReportes(report)
  }

  const bscNReport = (e) => {
    console.log(e)
    if (e) {
      const filt = dreportes.filter((reporte) => (reporte.id_report).toString().includes(e.target.value))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscAgent = (e) => {
    if (e) {
      const filt = dreportes.filter((reporte) => reporte.id_agente?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscFchCreado = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.fchareg.includes(e.target.value))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscStatus = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.status.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscOrigenr = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.origen_r.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscUsuarios = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.usuario_s.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscUsObser = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.us_obser.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscTdia = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.tdia?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscNdia = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.ndia.includes(e.target.value))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscNombA = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.nomba?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscApell1A = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.apell1a?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscApell2A = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.apell2a?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscEmail1 = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.email?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscEmail2 = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.email2?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscTel1= (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.tel?.includes(e.target.value))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscTel2 = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.tel2?.includes(e.target.value))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscProv = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.provi?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscCanto = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.canto?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscDistr = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.distr?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscMateria = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.materia?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscAsuntot = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.asunto?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscBien = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.bien?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscTdiC = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.tdic?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscNdiCt = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.ndic.includes(e.target.value))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscRSocial = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.razon_social?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscNFantacy = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.nombre_fantasia?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscDesch = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.desch?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  const bscRespe = (e) => {
    if (e !== '') {
      const filt = dreportes.filter((reporte) => reporte.respe?.toLowerCase().includes(e.target.value.toLowerCase()))
      console.log(filt)
      if (filt !== null) {
        setReportes(filt)
      }
    }
    else {
      setReportes(dreportes)
    }
  }

  return (
    <>
      <nav className="navbar bg-body-white fixed-top position-relative shadow">
        <div className="container">
          <img
            src={meicimg}
            alt="MEIC"
            width="140"
            height="55"
            className="d-flex justify-content-start"
          />
          <p className="fs-2 fw-bolder text-center clrTitle">LISTADO DE FORMULARIOS MEIC</p>
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
                    className="nav-link"
                    aria-current="page">
                    Formularios de Asesoria
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

      <div className="d-none container-fluid my-3">
        <div className="row">
          <label>Filtros</label>
          <br />
          <div className="col-2">
            <label htmlFor="fcini">Fecha Inicial</label>
            <input id="fcini" type="date" />
          </div>
          <div className="col-2">
            <label htmlFor="fcfin">Fecha Final</label>
            <input id="fcfin" type="date" />
          </div>
          <div className="col-2 align-bottom">
            <button className="btn btn-primary" type="button">Aplicar Filtro</button>
          </div>
        </div>
      </div>
      <br />
      <div className="container-fluid position-absolute start-0 w-auto p-3 table-bordered">
        <div className="d-flex flex-row mb-1 ms-2">
          <ReactHTMLTableToExcel
            id="test-table-xls-button"
            className="btn btn-success me-1"
            table="RepoSoliPres"
            filename="Reporte General"
            sheet="Solicitud Presencial de Asesorias"
            buttonText="Exportar datos a Excel"
          />
          <button className="d-none btn btn-success me-1">Exportar datos a PDF</button>
          <button className="d-none btn btn-success">Exportar datos a CSV </button>
        </div>
        <table id="RepoSoliPres" className="table table-dark table-striped caption-top badge text-nowrap table-bordered border-primary">
          <caption>Reportes solicitud de asesoria presencial</caption>
          <thead>
            <tr>
              <th scope="col"># Reporte</th>
              <th scope="col">Agente</th>
              <th scope="col">Creado</th>
              <th scope="col">Estado</th>
              <th scope="col">Origen</th>
              <th scope="col">Usuario Esp.</th>
              <th scope="col">Observasión</th>
              <th scope="col">Tipo Ident.</th>
              <th scope="col">N. Ident.</th>
              <th scope="col">Nombre Cliente</th>
              <th scope="col">1er Apell Cliente</th>
              <th scope="col">2do Apell Cliente</th>
              <th scope="col">Correo 1</th>
              <th scope="col">Correo 2</th>
              <th scope="col">Telefono 1</th>
              <th scope="col">Telefono 2</th>
              <th scope="col">Provincia</th>
              <th scope="col">Canton</th>
              <th scope="col">Distrito</th>
              <th scope="col">Materia</th>
              <th scope="col">Asunto Consult.</th>
              <th scope="col">Bien</th>
              <th scope="col">Tipo Ident. Comerciante</th>
              <th scope="col">N. Ident. Comerciante</th>
              <th scope="col">Razon Social/Nombre Comerciante</th>
              <th scope="col">Nombre Fantasía</th>
              <th scope="col">Descripción del caso</th> 
              <th scope="col">Respuesta Enviada</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><input id="buscar" onKeyUp={(e) => bscNReport(e)} /></td>
              <td><input id="buscar" onKeyUp={(e) => bscAgent(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscFchCreado(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscStatus(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscOrigenr(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscUsuarios(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscUsObser(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscTdia(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscNdia(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscNombA(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscApell1A(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscApell2A(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscEmail1(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscEmail2(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscTel1(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscTel2(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscProv(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscCanto(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscDistr(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscMateria(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscAsuntot(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscBien(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscTdiC(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscNdiCt(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscRSocial(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscNFantacy(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscDesch(e)}/></td>
              <td><input id="buscar" onKeyUp={(e) => bscRespe(e)}/></td>
            </tr>
            {reportes.map((reportes) => (
              <tr key={reportes.id}>
                <th scope="row">{reportes.id_report}</th>
                <td>{reportes.id_agente}</td>
                <td>{reportes.fchareg}</td>
                <td>{reportes.status}</td>
                <td>{reportes.origen_r}</td>
                <td>{reportes.usuario_s}</td>
                <td>{reportes.us_obser}</td>
                <td>{reportes.tdia}</td>
                <td>{reportes.ndia}</td>
                <td>{reportes.nomba}</td>
                <td>{reportes.apell1a}</td>
                <td>{reportes.apell2a}</td>
                <td>{reportes.email}</td>
                <td>{reportes.email2}</td>
                <td>{reportes.tel}</td>
                <td>{reportes.tel2}</td>
                <td>{reportes.provi}</td>
                <td>{reportes.canto}</td>
                <td>{reportes.distr}</td>
                <td>{reportes.materia}</td>
                <td>{reportes.asunto}</td>
                <td>{reportes.bien}</td>
                <td>{reportes.tdic}</td>
                <td>{reportes.ndic}</td>
                <td>{reportes.razon_social}</td>
                <td>{reportes.nombre_fantasia}</td>
                <td>{reportes.desch}</td>
                <td>{reportes.respe}</td>
              </tr>
            )
            )}
          </tbody>
        </table>
        <nav className="d-none" aria-label="...">
          <ul className="pagination">
            <li className="page-item disabled">
              <a className="page-link">Previous</a>
            </li>
            <li className="page-item active"><a className="page-link" href="#">1</a></li>
            <li className="page-item" aria-current="page">
              <a className="page-link" href="#">2</a>
            </li>
            <li className="page-item"><a className="page-link" href="#">3</a></li>
            <li className="page-item">
              <a className="page-link" href="#">Next</a>
            </li>
          </ul>
        </nav>

      </div>
    </>
  );
}

export default Dashboard;