import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

import ReactHTMLTableToExcel from "../dashboard/ReactHTMLTableToExcel.jsx";

import "./App.css";
import BarChart from "./components/BarChart.js";
import LineChart from "./components/LineChart.js";
import PieChart from "./components/PieChart.js";
import { UserData } from "./Data.js";

const cookies = new Cookies();
const meicimg = "logo_meic.jpg";
const alegaimg = "logo.png";
const URI = "https://fwmback-production.up.railway.app/asepress";

var elme;
var fchIni = "X";
var fchFin = "X";
var graFic = "";
var top = 0;

function Stadistic() {
  const [materia, setMateria] = useState([]);
  const [asunto, setAsunto] = useState([]);
  const [bien, setBien] = useState([]);
  const [idMat, setidMat] = useState();

  const [dreportes, setDReportes] = useState([]);
  const [freportes, setFReportes] = useState([]);

  const [dato1, setDato1] = useState();
  const [dato2, setDato2] = useState();
  const [dato3, setDato3] = useState();

  const [idAsu, setidAsu] = useState();
  const [idBie, setidBie] = useState();
  const [agente, setAgente] = useState(cookies.get("info"));
  const [reportes, setReportes] = useState([]);
  useEffect(() => {
        getTotalReportes()
        //getMaterias()
    }, [])

  const [fini, setFini] = useState();
  const [top, setTop] = useState();
  const [fend, setFend] = useState();
  const [title, setTitle] = useState("Gráfico");
  const [deshaBar, setdeshaBar] = useState("d-none");
  const [deshaLine, setdeshaLine] = useState("d-none");
  const [deshaPie, setdeshaPie] = useState("d-none");
  const [deshabTxtTop, setDeshabTxtTop] = useState("d-none");
  const [destabla, setDesTabla] = useState("d-none");
  const [txtTop, setTxtTop] = useState("");

  const CerrarSession = () => {
    const respuesta = confirm("¿Desea salir?");
    if (respuesta == true) {
      cookies.remove("info");
      cookies.remove("token");
    }
  };

  const exportarCompleto = () => {
    if (fchFin === "X" || fchIni === "X") {
    const respuesta = confirm("Se exportara la totalidad de los registros de la base de datos, esto es un archivo pesado por lo que tomara un poco mas de tiempo. ¿Desea Continuar?");
    }
  }

  Array.prototype.unicos = function () {
    const unicos = [];
    this.forEach((elemento) => {
      if (!unicos.includes(elemento)) {
        unicos.push(elemento);
      }
    });

    return unicos;
  };

  const definDat3 = () => {
    if (fchFin || fchIni) {
      setDato3(2);
    } else {
      setDato3(1);
    }
  };

  const getTotalReportes = async () => {
    const res = await axios.get(URI)
    const report = res.data
    
    setReportes(report)
    setDReportes(report)
  }

  const getReportes = async () => {
    let bodyContent
    let headersList = {
      Accept: "*/*",
      //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    if (fchFin === "X" || fchIni === "X") {
      bodyContent = JSON.stringify({
        elemt: `${elme}`,
        top: dato2,
        opc: 1,
      });
    } else {
      bodyContent = JSON.stringify({        
        opc: 3,
        fchaFin: `${fchFin}`,
        fchaIni: `${fchIni}`,
      });
    }
    

    let reqOptions = {
      url: "https://fwmback-production.up.railway.app/topelemt",
      method: "PUT",
      headers: headersList,
      data: bodyContent,
    };
    console.log(bodyContent);
    let res = await axios.request(reqOptions);
    const report = res.data[0];

    console.log(report)
    setReportes(report);
    setDReportes(report);
  };

  const contador = async () => {
    VerTabla();
    let bodyContent;
    let headersList = {
      Accept: "*/*",
      //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };
    console.log(fchFin, fchIni);
    if (fchFin === "X" || fchIni === "X") {
      bodyContent = JSON.stringify({
        elemt: `${elme}`,
        top: dato2,
        opc: 1,
      });
    } else {
      bodyContent = JSON.stringify({
        elemt: `${elme}`,
        top: dato2,
        opc: 2,
        fchaFin: `${fchFin}`,
        fchaIni: `${fchIni}`,
      });
    }

    let reqOptions = {
      url: "https://fwmback-production.up.railway.app/topelemt",
      method: "PUT",
      headers: headersList,
      data: bodyContent,
    };
    console.log(bodyContent);
    let response = await axios.request(reqOptions);
    console.log(response.data[0]);

    setTop(response.data[0]);

    setUserData({
      labels: top?.map((data) => data.elemt),
      datasets: [
        {
          label: `${title}`,
          data: top?.map((data) => data.total),
          backgroundColor: [
            "rgba(75,192,192,1)",
            "#ecf0f1",
            "#50AF95",
            "#f3ba2f",
            "#2a71d0",
          ],
          borderColor: "black",
          borderWidth: 2,
        },
      ],
    });

    getReportes();
  };

  const selectTop = (e) => {
    let valor = e.target.selectedIndex;
    let oreg = e.target.options[valor].text;
    console.log(valor);
    if (valor === 1) {
      setDato2("10");
      setDeshabTxtTop("d-none");
      setTxtTop("");
    }
    if (valor === 2) {
      setDato2("20");
      setDeshabTxtTop("d-none");
      setTxtTop("");
    }
    if (valor === 3) {
      setDato2("30");
      setDeshabTxtTop("d-none");
      setTxtTop("");
    }
    if (valor === 4) {
      setDato2("") | setDeshabTxtTop("d-none");
      setTxtTop("");
    }
    if (valor === 5) {
      setDato2("");
      setDeshabTxtTop("d-block col-md-4");
      setTxtTop("");
    }
    console.log(valor, oreg);
  };

  const selectElem = (e) => {
    let valor = e.target.selectedIndex;
    let elment = "";
    if (valor === 1) {
      elment = "materia";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 2) {
      elment = "asunto";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 3) {
      elment = "bien";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 4) {
      elment = "provi";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 5) {
      elment = "canto";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 6) {
      elment = "distr";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 7) {
      elment = "tdia";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 8) {
      elment = "tdic";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 9) {
      elment = "ndia";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 10) {
      elment = "ndic";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 11) {
      elment = "id_agente";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 12) {
      elment = "origen_r";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 13) {
      elment = "status";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 14) {
      elment = "r_social";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 15) {
      elment = "nombre_fantasia";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 16) {
      elment = "fchareg";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 17) {
      elment = "fchacomplet";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 18) {
      elment = "usuario_s";
      setDato1(elment);
      elme = elment;
    }
  };

  const validarTxtTop = (e) => {
    let valor = e;
    setTxtTop(valor);
    setDato2(e);
    console.log(e, valor);
    let resp = /^[0-9]{9}$/.test(valor);
    console.log(resp);
    if (resp) {
      console.log("paso resp");
      setDato2(e);
      setTxtTop(e);
    }
  };

  const [userData, setUserData] = useState({
    labels: top?.map((data) => data.elemt),
    datasets: [
      {
        label: `${title}`,
        data: top?.map((data) => data.total),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });

  const obtGrafic = (e) => {
    if (e.target.selectedIndex == 1) {
      setdeshaBar("d-block");
      setdeshaLine("d-none");
      setdeshaPie("d-none");
      graFic = "Bar";
    } else if (e.target.selectedIndex == 2) {
      setdeshaBar("d-none");
      setdeshaLine("d-block");
      setdeshaPie("d-none");
      graFic = "Line";
    } else if (e.target.selectedIndex == 3) {
      setdeshaBar("d-none");
      setdeshaLine("d-none");
      setdeshaPie("d-block");
      graFic = "Pie";
    } else {
      setdeshaBar("d-none");
      setdeshaLine("d-none");
      setdeshaPie("d-none");
      graFic = "";
    }
  };

  const ResetTable = () => {
    setReportes(dreportes);
  };

  const VerTabla = () => {
    console.log(dato1);
    setDesTabla(
      "container-fluid position-absolute start-35 table-bordered text-center"
    );
  };

  //#region Filtros Tabla
  const MayorFcha = (e) => {
    fchFin = e;
    console.log(fchFin);
  };

  const MenorFcha = (e) => {
    fchIni = e;
    console.log(fchIni);
  };

  const bscNReport = (e) => {
    console.log(e.target.value);
    if (e.target.value !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.id_report.toString().includes(e.target.value)
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscAgent = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.id_agente.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscFchCreado = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.fchareg.includes(e.target.value)
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscStatus = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.status.toLowerCase().include(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscOrigenr = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.origen_r.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscUsuarios = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.usuario_s.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscUsObser = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.us_obser.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscTdia = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.tdia.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscNdia = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.ndia.includes(e.target.value)
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscNombA = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.nomba.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscApell1A = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.apell1a.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscApell2A = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.apell2a.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscEmail1 = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.email.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscEmail2 = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.email2.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscTel1 = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.tel.includes(e.target.value)
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscTel2 = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.tel2.includes(e.target.value)
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscProv = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.provi.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscCanto = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.canto.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscDistr = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.distr.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscMateria = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.materia.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscAsuntot = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.asunto.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscBien = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.bien.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscTdiC = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.tdic.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscNdiCt = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.ndic.includes(e.target.value)
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscRSocial = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.razon_social
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscNFantacy = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.nombre_fantasia
          .toLowerCase()
          .includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscDesch = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.desch.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };

  const bscRespe = (e) => {
    if (e !== "") {
      const filt = dreportes.filter((reporte) =>
        reporte.respe.toLowerCase().includes(e.target.value.toLowerCase())
      );
      console.log(filt);
      if (filt !== null) {
        setFReportes(filt);
        setReportes(freportes);
      }
    }
  };
  //#endregion

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
          <p className="fs-2 fw-bolder text-center clrTitle">
            Pagina Principal
          </p>
          <p className="mt-5 text-secondary d-flex flex-row-reverse">
            Agente: {agente}
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Opciones
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
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
                    Formulario Solicitud de asesoria
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
      <br />
      <br />
      <div className="row py-2">
        <h3>Definición de gráficos y tablas</h3>
        <br />
        <div className="col-md-4">
          <label htmlFor="fcini" className="form-label">
            Fecha Inicial
          </label>
          <input
            className="form-control"
            id="fcini"
            type="date"
            value={fend}
            onChange={(e) => MenorFcha(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="fcfin" className="form-label">
            Fecha Final
          </label>
          <input
            className="form-control"
            id="fcfin"
            type="date"
            value={fini}
            onChange={(e) => MayorFcha(e.target.value)}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="input_TID" className="form-label">
            Elemento a Evaluar
          </label>
          <select
            id="input_TID"
            className="form-select"
            name="tid"
            onChange={(e) => selectElem(e)}>
            <option value="0" selected="selected" disabled>
              Seleccione...
            </option>
            <option defaultValue="1">Materias</option>
            <option defaultValue="2">Asuntos Consultados</option>
            <option defaultValue="3">Bienes</option>
            <option defaultValue="4">Provincia</option>
            <option defaultValue="5">Canton</option>
            <option defaultValue="6">Distrito</option>
            <option defaultValue="7">Tipo de identificación Usuario</option>
            <option defaultValue="8">Tipo de identificación Comerciante</option>
            <option defaultValue="9">N. Ident. Usuario</option>
            <option defaultValue="10">N. Ident. Comerciante</option>
            <option defaultValue="11">Agente</option>
            <option defaultValue="12">Linea de Origen</option>
            <option defaultValue="13">Estado</option>
            <option defaultValue="14">Razon Social/Nombre Comerciante</option>
            <option defaultValue="15">Nombre Fantasía</option>
            <option defaultValue="16">Fecha de Creación</option>
            <option defaultValue="17">Fecha de Completado</option>
            <option defaultValue="18">Usuario Especial</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="input_Top" className="form-label mx-2">
            Filtros Top
          </label>

          <select
            id="input_TID"
            className="form-select"
            name="tid"
            onChange={(e) => selectTop(e)}>
            <option value="0" selected="selected" disabled>
              Seleccione...
            </option>
            <option defaultValue="1">Top 10</option>
            <option defaultValue="2">Top 20</option>
            <option defaultValue="3">Top 30</option>
            <option className="d-none" defaultValue="4">
              Todos
            </option>
            <option defaultValue="5">Definir</option>
          </select>
        </div>
        <div className={deshabTxtTop}>
          <label className="form-label" htmlFor="txtTop">
            Top ?
          </label>
          <input
            className="form-control"
            type="text"
            value={txtTop}
            onChange={(e) => validarTxtTop(e.target.value)}
            id="txtTop"
          />
        </div>
      </div>
      <div className="row mt-2">
        <div className="col-md-4">
          <label htmlFor="input_TID" className="form-label">
            Tipo de Gráfico
          </label>
          <select
            id="input_TDG"
            className="form-select"
            onChange={(e) => obtGrafic(e)}
            name="tdg"
            required>
            <option value="0" selected="selected" disabled>
              Seleccione...
            </option>
            <option defaultValue="1">De Barras</option>
            <option defaultValue="2">Lineal</option>
            <option defaultValue="3">Circular</option>
          </select>
        </div>
        <div className="row">
          <div>
            <label htmlFor="inputCed" className="form-label mt-2">
              Titulo del Gráfico
            </label>
            <input
              name="nid"
              type="text"
              className={`form-control`}
              id="inputCed"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
              }}
              required
            />
          </div>
          <div className="row mt-2">
            <p>Opciones para Exportar</p>
            <div className="col-md-4 mt-2 text-wrap" onClick={(e) => exportarCompleto()}>
              <ReactHTMLTableToExcel
                id="test-table-xls-button"
                className="btn btn-success"
                table="TabletTotal"
                filename="Reporte General"
                sheet="Solicitud Presencial de Asesorias"
                buttonText="Exportar datos a Excel"                
              />
            </div>
            <div className="d-none col-md-4 mt-2 text-wrap">
              <button className="btn btn-success me-1">
                Exportar a PDF
              </button>
              <button
                className="d-none btn btn-success"
                onClick={() => contador()}>
                Exportar a CSV
              </button>
            </div>
            <div className="col-md-4 mt-2 text-wrap">
              <button className="btn btn-success" onClick={() => contador()}>
                Mostrar Grafico y tabla
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <table id="TabletTotal">
      <div className="container-fluid top-50">
        <div className="row">
          <div className="App fs-5">
            <div id="Bar" className={deshaBar}>
              <div style={{ width: 1000}}>
                <BarChart chartData={userData} />
              </div>
            </div>
            <div id="Line" className={deshaLine}>
              <div style={{ width: 1000 }}>
                <LineChart chartData={userData} />
              </div>
            </div>
            <div id="Pie" className={deshaPie}>
              <div style={{ width: 1000 }}>
                <PieChart chartData={userData} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
      
        <div className={destabla}>
          <table
            id="RepoSoliPres"
            className="table table-dark fs-5 table-striped caption-top badge text-nowrap table-bordered border-primary overflow-auto">
            <caption>{title}</caption>
            <thead>
              <tr>
                <th scope="col">{dato1}</th>
                <th scope="col">Total</th>
              </tr>
            </thead>
            <tbody>
              {top?.map((dato) => (
                <tr key={dato.elemt}>
                  <th scope="row">{dato.elemt}</th>
                  <td>{dato.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <br />
        <div>
          <div>
            <div>
              <div className="d-none container-fluid table-bordered">
                <button
                  className="d-none btn btn-danger"
                  onClick={() => ResetTable()}>
                  Restrablecer Tabla
                </button>
                <table
                  id="RepoTotal"
                  className="table table-dark table-striped badge text-nowrap table-bordered border-primary overflow-auto">
                  <caption>{title}</caption>
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
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </table>
    </>
  );
}

export default Stadistic;
