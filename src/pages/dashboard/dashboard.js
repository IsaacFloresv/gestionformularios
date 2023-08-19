import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from 'universal-cookie'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { startOfDay, endOfDay } from 'date-fns';

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
  // Estados para almacenar los valores de los filtros
  const [filtroNReport, setFiltroNReport] = useState("");
  const [filtroAgent, setFiltroAgent] = useState("");
  const [filtroFchCreado, setFiltroFchCreado] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");
  const [filtroOrigen, setFiltroOrigen] = useState("");
  const [filtroUsuario_s, setFiltroUsuario_s] = useState("");
  const [filtroUs_obser, setFiltroUs_obser] = useState("");
  const [filtroTdia, setFiltroTdia] = useState("");
  const [filtroNdia, setFiltroNdia] = useState("");
  const [filtroNomba, setFiltroNomba] = useState("");
  const [filtroApell1a, setFiltroApell1a] = useState("");
  const [filtroApell2a, setFiltroApell2a] = useState("");
  const [filtroEmail, setFiltroEmail] = useState("");
  const [filtroEmail2, setFiltroEmail2] = useState("");
  const [filtroTel, setFiltroTel] = useState("");
  const [filtroTel2, setFiltroTel2] = useState("");
  const [filtroProvi, setFiltroProvi] = useState("");
  const [filtroCanto, setFiltroCanto] = useState("");
  const [filtroDistr, setFiltroDistr] = useState("");
  const [filtroMateria, setFiltroMateria] = useState("");
  const [filtroAsunto, setFiltroAsunto] = useState("");
  const [filtroBien, setFiltroBien] = useState("");
  const [filtroTdic, setFiltroTdic] = useState("");
  const [filtroNdic, setFiltroNdic] = useState("");
  const [filtroRsocial, setFiltroRsocial] = useState("");
  const [filtroFantasia, setFiltroFantasia] = useState("");
  const [filtroDesch, setFiltroDesch] = useState("");
  const [filtroRespe, setFiltroRespe] = useState("");
  const [startDateFilter, setStartDateFilter] = useState(null);
  const [endDateFilter, setEndDateFilter] = useState(null);





  const [ dreportes, setDReportes ] = useState([])
  const [ freportes, setFReportes ] = useState([])
  const [ reportes, setReportes ] = useState([])

  useEffect(() => {
    getReportes()
  }, [])

  useEffect(() => {

      buscarReportes();

  }, [filtroNReport, filtroAgent, filtroFchCreado, filtroStatus, filtroOrigen, 
    filtroUsuario_s, filtroUs_obser, filtroTdia, filtroNdia, filtroNomba, 
    filtroApell1a, filtroApell2a, filtroEmail, filtroEmail2, filtroTel, filtroTel2,
    filtroProvi, filtroCanto, filtroDistr, filtroMateria, filtroAsunto, filtroBien,
    filtroTdic, filtroNdic, filtroRsocial, filtroFantasia, filtroDesch, filtroRespe]);


  // Función de búsqueda que combina los filtros
  const buscarReportes = () => {
    const filt = dreportes.filter((reporte) => {
      const [fechaPart, horaPart] = reporte.fchareg.split(', ');
  
      // Separar la cadena de fecha en día, mes y año
      const [fecha, hora] = fechaPart.split(' ');
      const [dia, mes, ano] = fecha.split('/');
  
      if (horaPart) {
        // Dividir la hora en horas, minutos y segundos
        const [horas, minutos, segundos] = horaPart.split(':');
  
        // Crear un objeto Date con los valores extraídos
        const reportDate = new Date(ano, mes - 1, dia, horas, minutos, segundos);
  
      return(
      reporte.id_report.toString().includes(filtroNReport) &&
      reporte.id_agente?.toLowerCase().includes(filtroAgent.toLowerCase())&&
      reporte.fchareg.includes(filtroFchCreado) &&
      reporte.status?.toLowerCase().includes(filtroStatus.toLowerCase())&&
      reporte.origen_r?.toLowerCase().includes(filtroOrigen.toLowerCase())&&
      reporte.usuario_s?.toLowerCase().includes(filtroUsuario_s.toLowerCase())&&
      reporte.us_obser?.toLowerCase().includes(filtroUs_obser.toLowerCase())&&
      reporte.tdia?.toLowerCase().includes(filtroTdia.toLowerCase())&&
      reporte.ndia?.toLowerCase().includes(filtroNdia.toLowerCase())&&
      reporte.nomba?.toLowerCase().includes(filtroNomba.toLowerCase())&&
      reporte.apell1a?.toLowerCase().includes(filtroApell1a.toLowerCase())&&
      reporte.apell2a?.toLowerCase().includes(filtroApell2a.toLowerCase())&&
      reporte.email?.toLowerCase().includes(filtroEmail.toLowerCase())&&
      reporte.email2?.toLowerCase().includes(filtroEmail2.toLowerCase())&&
      reporte.tel?.toLowerCase().includes(filtroTel.toLowerCase())&&
      reporte.tel2?.toLowerCase().includes(filtroTel2.toLowerCase())&&
      reporte.provi?.toLowerCase().includes(filtroProvi.toLowerCase())&&
      reporte.canto?.toLowerCase().includes(filtroCanto.toLowerCase())&&
      reporte.distr?.toLowerCase().includes(filtroDistr.toLowerCase())&&
      reporte.materia?.toLowerCase().includes(filtroMateria.toLowerCase())&&
      reporte.asunto?.toLowerCase().includes(filtroAsunto.toLowerCase())&&
      reporte.bien?.toLowerCase().includes(filtroBien.toLowerCase())&&
      reporte.tdic?.toLowerCase().includes(filtroTdic.toLowerCase())&&
      reporte.ndic?.toLowerCase().includes(filtroNdic.toLowerCase())&&
      reporte.razon_social?.toLowerCase().includes(filtroRsocial.toLowerCase())&&
      reporte.nombre_fantasia?.toLowerCase().includes(filtroFantasia.toLowerCase())&&
      reporte.desch?.toLowerCase().includes(filtroDesch.toLowerCase())&&
      reporte.respe?.toLowerCase().includes(filtroRespe.toLowerCase())&&
      (!startDateFilter || reportDate >= startOfDay(new Date(startDateFilter))) &&
      (!endDateFilter || reportDate <= endOfDay(new Date(endDateFilter)))
    );
  }
  return false; // Si no se proporciona la hora, no se considera el reporte
  });
    setReportes(filt);
  };


  // Manejadores de eventos para los cambios en los inputs de los filtros

  const handleFiltroNReport = (e) => {
    setFiltroNReport(e.target.value);
  };

  const handleFiltroAgent = (e) => {
    setFiltroAgent(e.target.value);
  };

  const handleFiltroFchCreado = (e) => {
    setFiltroFchCreado(e.target.value);
  };

  const handleFiltroStatus = (e) => {
    setFiltroStatus(e.target.value);
  };

  const handleFiltroOrigen = (e) => {
    setFiltroOrigen(e.target.value);
  };

  const handleFiltroUsuario_s = (e) => {
    setFiltroUsuario_s(e.target.value);
  };

  const handleFiltroUs_obser = (e) => {
    setFiltroUs_obser(e.target.value);
  };

  const handleFiltroTdia = (e) => {
    setFiltroTdia(e.target.value);
  };

  const handleFiltroNdia = (e) => {
    setFiltroNdia(e.target.value);
  };

  const handleFiltroNomba = (e) => {
    setFiltroNomba(e.target.value);
  };

  const handleFiltroApell1a = (e) => {
    setFiltroApell1a(e.target.value);
  };

  const handleFiltroApell2a = (e) => {
    setFiltroApell2a(e.target.value);
  };

  const handleFiltroEmail = (e) => {
    setFiltroEmail(e.target.value);
  };

  const handleFiltroEmail2 = (e) => {
    setFiltroEmail2(e.target.value);
  };

  const handleFiltroTel = (e) => {
    setFiltroTel(e.target.value);
  };

  const handleFiltroTel2 = (e) => {
    setFiltroTel2(e.target.value);
  };

  const handleFiltroProvi = (e) => {
    setFiltroProvi(e.target.value);
  };

  const handleFiltroCanto = (e) => {
    setFiltroCanto(e.target.value);
  };

  const handleFiltroDistr = (e) => {
    setFiltroDistr(e.target.value);
  };

  const handleFiltroMateria = (e) => {
    setFiltroMateria(e.target.value);
  };

  const handleFiltroAsunto = (e) => {
    setFiltroAsunto(e.target.value);
  };

  const handleFiltroBien = (e) => {
    setFiltroBien(e.target.value);
  };

  const handleFiltroTdic = (e) => {
    setFiltroTdic(e.target.value);
  };

  const handleFiltroNdic = (e) => {
    setFiltroNdic(e.target.value);
  };

  const handleFiltroRsocial = (e) => {
    setFiltroRsocial(e.target.value);
  };

  const handleFiltroFantasia = (e) => {
    setFiltroFantasia(e.target.value);
  };

  const handleFiltroDesch = (e) => {
    setFiltroDesch(e.target.value);
  };

  const handleFiltroRespe = (e) => {
    setFiltroRespe(e.target.value);
  };

  const handleStartDateChange = (date) => {
    setStartDateFilter(date);
  };
  
  const handleEndDateChange = (date) => {
    setEndDateFilter(date);
  };

  const handleFiltrarClick = () => {
    buscarReportes();
  };
  

  const getReportes = async () => {
    const res = await axios.get(URI)
    const report = res.data
    
    setReportes(report)
    setDReportes(report)
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
          <DatePicker.default
            selected={startDateFilter}
            onChange={handleStartDateChange}
            selectsStart
            startDate={startDateFilter}
            endDate={endDateFilter}
            placeholderText="Fecha inicial"
            dateFormat="dd/MM/yyyy, HH:mm:ss"
          />
          <DatePicker.default
            selected={endDateFilter}
            onChange={handleEndDateChange}
            selectsEnd
            startDate={startDateFilter}
            endDate={endDateFilter}
            placeholderText="Fecha final"
            dateFormat="dd/MM/yyyy, HH:mm:ss"
          />

          <button onClick={handleFiltrarClick} className="btn btn-primary">Filtrar</button>
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
              <th scope="col">Observación</th>
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
              <td><input id="buscarNReport" onChange={handleFiltroNReport} /></td>
              <td><input id="buscarAgent" onChange={handleFiltroAgent} /></td>
              <td><input id="buscarFchCreado" onChange={handleFiltroFchCreado} /></td>
              <td><input id="buscarStatus" onChange={handleFiltroStatus} /></td>
              <td><input id="buscarOrigen" onChange={handleFiltroOrigen} /></td>
              <td><input id="buscarUsuario_s" onChange={handleFiltroUsuario_s} /></td>
              <td><input id="buscarUs_obser" onChange={handleFiltroUs_obser} /></td>
              <td><input id="buscarTdia" onChange={handleFiltroTdia} /></td>
              <td><input id="buscarNdia" onChange={handleFiltroNdia} /></td>
              <td><input id="buscarNomba" onChange={handleFiltroNomba} /></td>
              <td><input id="buscarApell1a" onChange={handleFiltroApell1a} /></td>
              <td><input id="buscarApell2a" onChange={handleFiltroApell2a} /></td>
              <td><input id="buscarEmail" onChange={handleFiltroEmail} /></td>
              <td><input id="buscarEmail2" onChange={handleFiltroEmail2} /></td>
              <td><input id="buscarTel" onChange={handleFiltroTel} /></td>
              <td><input id="buscarTel2" onChange={handleFiltroTel2} /></td>
              <td><input id="buscarProvi" onChange={handleFiltroProvi} /></td>
              <td><input id="buscarCanto" onChange={handleFiltroCanto} /></td>
              <td><input id="buscarDistr" onChange={handleFiltroDistr} /></td>
              <td><input id="buscarMateria" onChange={handleFiltroMateria} /></td>
              <td><input id="buscarAsunto" onChange={handleFiltroAsunto} /></td>
              <td><input id="buscarBien" onChange={handleFiltroBien} /></td>
              <td><input id="buscarTdic" onChange={handleFiltroTdic} /></td>
              <td><input id="buscarNdic" onChange={handleFiltroNdic} /></td>
              <td><input id="buscarRsocial" onChange={handleFiltroRsocial} /></td>
              <td><input id="buscarFantasia" onChange={handleFiltroFantasia} /></td>
              <td><input id="buscarDesch" onChange={handleFiltroDesch} /></td>
              <td><input id="buscarRespe" onChange={handleFiltroRespe} /></td>
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