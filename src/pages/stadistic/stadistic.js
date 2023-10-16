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
  /*useEffect(() => {
        getTotalReportes()
        //getMaterias()
    }, [])
*/
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

  //Declaracion de variables para desaparecer opciones en elementos a evaluar
  const [selectedOption1, setSelectedOption1] = useState("0");
  const [selectedOption2, setSelectedOption2] = useState("0");
  const [selectedOption3, setSelectedOption3] = useState("0");
  const [materiaOption, setMateriaOption] = useState("0");
  const [materiaOption2, setMateriaOption2] = useState("0");

  const CerrarSession = () => {
    const respuesta = confirm("¿Desea salir?");
    if (respuesta == true) {
      cookies.remove("info");
      cookies.remove("token");
    }
  };

  const exportarCompleto = () => {
    if (fchFin === "X" || fchIni === "X") {
      const respuesta = confirm(
        "Se exportara la totalidad de los registros de la base de datos, esto es un archivo pesado por lo que tomara un poco mas de tiempo. ¿Desea Continuar?"
      );
    }
  };

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
    const res = await axios.get(URI);
    const report = res.data;

    setReportes(report);
    setDReportes(report);
  };

  const contador = async () => {
    console.log("estoy aqui");
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
    try {
      const response = await axios.request(reqOptions);
      console.log(response.data[0]);

      setTop(response.data[0]);

      setUserData((prevState) => ({
        ...prevState,
        labels: response.data[0]?.map((data) => data.elemt),
        datasets: [
          {
            ...prevState.datasets[0],
            data: response.data[0]?.map((data) => data.total),
          },
        ],
      }));

      //getTotalReportes();
      getReportes();
    } catch (error) {
      console.error(error);
    }
  };

  const getReportes = async () => {
    let bodyContent;
    let headersList = {
      Accept: "*/*",
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
  
    try {
      const res = await axios.request(reqOptions);
      const report = res.data[0];
  
      // Filter and count occurrences of the selected "Categoría" within the "Materia" column
      const selectedCategory = materiaOption;
      const totalCount = report
        .filter((item) => item.materia === selectedCategory)
        .reduce((total, item) => total + item.total, 0);
  
      // Create a new array with only the selected "Categoría" and its count
      const categoryReport = [
        {
          categoria: selectedCategory,
          total: totalCount,
        },
      ];
  
      setDReportes(categoryReport);
    } catch (error) {
      console.error(error);
    }
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
      setDato2("100000") | setDeshabTxtTop("d-none");
      setTxtTop("");
    }
    if (valor === 5) {
      setDato2("");
      setDeshabTxtTop("d-block col-md-4");
      setTxtTop("");
    }
    console.log(valor, oreg);
  };

  /*const selectElem = (e) => {
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
  */

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
      elment = "id_agente";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 4) {
      elment = "origen_r";
      setDato1(elment);
      elme = elment;
    }
    if (valor === 5) {
      elment = "status";
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
          "#5A64FE",
          "#FE5A8C",
          "#FE675A",
          "#80FE5A",
          "#B62323",
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

  const generarTabla = () => {
    const tabla = [
      ["Elemento", "Total"],
      ...userData.labels.map((elemt) => [
        elemt,
        userData.datasets[0].data[userData.labels.indexOf(elemt)],
      ]),
    ];

    setTabla(tabla);
  };

  const generarGrafico = () => {
    const grafico = new Chart("grafico", {
      type: graFic,
      data: userData,
    });

    setGrafico(grafico);
  };

  //Funciones para desaparecer opciones en elementos a evaluar
  const handleSelect1Change = (e) => {
    const selectedValue = e.target.value;
    setSelectedOption1(selectedValue);
  };

  const handleSelect2Change = (e) => {
    const selectedValue2 = e.target.value;
    setSelectedOption2(selectedValue2);
  };

  const handleSelect3Change = (e) => {
    const selectedValue3 = e.target.value;
    setSelectedOption3(selectedValue3);
  };

  const handleMateriaChange = (e) => {
    const selectedValue = e.target.value;
    setMateriaOption(selectedValue);
  };

  const handleMateria2Change = (e) => {
    const selectedValue = e.target.value;
    setMateriaOption2(selectedValue);
  };

  //#endregion

  /*const exportarDatosGrafico = () => {
    // Obtén los datos del gráfico y de la tabla.
    const datosGrafico = userData;
    const datosTabla = top; // Ajusta esto según tus necesidades.
  
    // Combina los datos en un solo conjunto de datos.
    const datosCombinados = datosTabla.map((dato, index) => ({
      Elemento: dato.elemt,
      Total: dato.total,
      Grafico: datosGrafico.datasets[0].data[index], // Ajusta esto según tu estructura de datos de gráfico.
    }));
  
    // Crea un libro de Excel.
    const wb = XLSX.utils.book_new();
  
    // Convierte los datos combinados a una hoja de Excel.
    const ws = XLSX.utils.json_to_sheet(datosCombinados);
  
    // Agrega la hoja al libro de Excel.
    XLSX.utils.book_append_sheet(wb, ws, 'Datos Combinados');
  
    // Guarda el archivo Excel.
    XLSX.writeFile(wb, 'datos_combinados.xlsx');
  };

  const exportToExcel = () => {
    // Toma una captura de pantalla del gráfico
    const chartElement = document.getElementById(graFic); // Cambia "graFic" al ID correcto de tu gráfico
    const chartImagePromise = toPng(chartElement);
  
    chartImagePromise.then((chartImage) => {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Reporte");
  
      // Agregar encabezados a la hoja de cálculo
      worksheet.addRow([dato1, "Total"]);
      worksheet.addRow([null, null]); // Agrega una fila en blanco para separar la tabla del gráfico
  
      // Agregar datos de la tabla a la hoja de cálculo
      top?.forEach((dato) => {
        worksheet.addRow([dato.elemt, dato.total]);
      });
  
      // Agrega el gráfico como una imagen a la hoja de cálculo
      const imageId = workbook.addImage({
        base64: chartImage,
        extension: "png",
      });
  
      worksheet.addImage(imageId, {
        tl: { col: 0, row: 2 },
        ext: { width: 500, height: 350 },
      });
  
      // Crear un archivo de Excel
      const filename = "reporte.xlsx";
  
      workbook.xlsx.writeBuffer().then((buffer) => {
        const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        const url = window.URL.createObjectURL(blob);
  
        // Crear un enlace de descarga y hacer clic en él
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
      });
    });
  };
  */

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
          <p className="fs-2 fw-bolder text-center clrTitle">ESTADISTICAS</p>
          <p className="mt-5 text-secondary d-flex flex-row-reverse">
            Agente: {agente}
          </p>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabindex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Opciones
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link
                    to={"/home"}
                    id="btnenviar"
                    type="buttom"
                    className="nav-link"
                    aria-current="page"
                  >
                    Inicio
                  </Link>
                </li>
                <li className="nav-item">
                  <a
                    href={"/formpres"}
                    id="btnenviar"
                    type="button"
                    className="nav-link"
                    aria-current="page"
                  >
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
                    aria-current="page"
                  >
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
        <h1></h1>
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
          <label htmlFor="input_TID1" className="form-label">
            Elemento a Evaluar (Opcion 1)
          </label>
          <select
            id="input_TID1"
            className="form-select"
            name="tid1"
            value={selectedOption1}
            onChange={(e) => {
              handleSelect1Change(e);
              selectElem(e);
            }}
          >
            <option value="0" selected="selected" disabled>
              Seleccione...
            </option>
            <option
              value="1"
              disabled={selectedOption2 === "1" /* || selectedOption3 === "1"*/}
            >
              Materias
            </option>
            <option
              value="2"
              disabled={selectedOption2 === "2" /* || selectedOption3 === "2"*/}
            >
              Asuntos Consultados
            </option>
            <option
              value="3"
              disabled={selectedOption2 === "3" /* || selectedOption3 === "3"*/}
            >
              Agente
            </option>
            <option
              value="4"
              disabled={selectedOption2 === "4" /* || selectedOption3 === "4"*/}
            >
              Origen
            </option>
            <option
              value="5"
              disabled={selectedOption2 === "5" /* || selectedOption3 === "5"*/}
            >
              Estado
            </option>
          </select>
        </div>
        {selectedOption1 === "1" && (
          <div className="col-md-4">
            <label htmlFor="input_Mat1" className="form-label">
              Categoria
            </label>
            <select
              id="input_Mat1"
              className="form-select"
              name="mat1"
              value={materiaOption}
              onChange={handleMateriaChange}
            >
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              <option value="1">
                Acciones orientadas a restringir la oferta, circulación de
                bienes y servicios
              </option>
              <option value="2">Acoso u hostigamiento para la cobranza</option>
              <option value="3">Contrato</option>
              <option value="4">Derecho de retracto</option>
              <option value="5">Discriminación de consumo</option>
              <option value="6">Entrega de información</option>
              <option value="7">Especulación</option>
              <option value="8">Factura</option>
              <option value="9">Falta de información</option>
              <option value="10">Garantía</option>
              <option value="11">No corresponde (Art. 149 Reglamento)</option>
              <option value="12">
                Normas de calidad y reglamentaciones técnicas
              </option>
              <option value="13">Pendiente Asignar</option>
              <option value="14">Promociones y Ofertas/Información</option>
              <option value="15">Publicidad/Información</option>
              <option value="16">Tarjetas de crédito</option>
              <option value="17">Ventas a plazo</option>
              <option value="18">INFORMACION GENERAL AL USUARIO</option>
              <option value="19">No aplica</option>
            </select>
          </div>
        )}
        {selectedOption1 === "2" && (
          <div className="col-md-4">
            <label htmlFor="input_Asu1" className="form-label">
              Categoria
            </label>
            <select id="input_Asu1" className="form-select" name="asu1">
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              {materiaOption2 === "0" && (
                <>
                  <option value="1">Acaparamiento</option>
                  <option value="2">Ventas atadas o condicionadas</option>
                  <option value="3">Prácticas abusivas en las cobranzas</option>
                  <option value="4">Cláusulas Abusivas</option>
                  <option value="5">Incumplimiento</option>
                  <option value="6">
                    Incumplimiento en Servicios de Reparación
                  </option>
                  <option value="7">
                    Incumplimiento devolución del dinero
                  </option>
                  <option value="8">
                    Incumplimiento rescisión de contrato
                  </option>
                  <option value="9">Discriminación de consumo</option>
                  <option value="10">
                    No entregó la información requerida por la UEE
                  </option>
                  <option value="11">Especulación</option>
                  <option value="12">
                    Ausencia de identificación de los bienes y servicios
                    adquiridos y el precio efectivamente cobrado en la factura
                  </option>
                  <option value="13">
                    No entregaron factura o recibo de compra
                  </option>
                  <option value="14">
                    Ausencia de características y elementos del producto o
                    artículo
                  </option>
                  <option value="15">Ausencia de Etiquetado</option>
                  <option value="16">
                    Ausencia de información de que el artículo es defectuoso
                  </option>
                  <option value="17">
                    Ausencia de información de que el artículo es reconstruido
                  </option>
                  <option value="18">
                    Ausencia de información de que el artículo es usado
                  </option>
                  <option value="19">
                    Ausencia de información de que no existen en el país
                    servicios técnicos de reparación y repuestos
                  </option>
                  <option value="20">
                    Ausencia de información en impuestos
                  </option>
                  <option value="21">Ausencia de información en precios</option>
                  <option value="22">
                    Ausencia de información en Ventas a Crédito
                  </option>
                  <option value="23">
                    Ausencia de Manuales de Instrucciones
                  </option>
                  <option value="24">Falta de información</option>
                  <option value="25">
                    Información con letra ilegible tanto en su tamaño como en su
                    forma
                  </option>
                  <option value="26">
                    Información en idioma diferente al español
                  </option>
                  <option value="27">
                    Información general sobre la Ley 7472 al usuario
                  </option>
                  <option value="28">
                    Negativa a entregar cotización o presupuesto
                  </option>
                  <option value="29">Anulación y perdida de garantia</option>
                  <option value="30">
                    Condiciones y limitaciones excesivas
                  </option>
                  <option value="31">Incumplimiento</option>
                  <option value="32">
                    Incumplimiento en el plazo de la reparación
                  </option>
                  <option value="33">
                    Le cobran la reparación dentro del plazo de garantía
                  </option>
                  <option value="34">No dan garantía</option>
                  <option value="35">No extienden plazo de garantía</option>
                  <option value="36">No hay repuestos en el país</option>
                  <option value="37">No se entregó por escrito</option>
                  <option value="38">
                    Quiere cambio del artículo o devolución del dinero
                  </option>
                  <option value="39">
                    Reparación imposible y no se cambia artículo
                  </option>
                  <option value="40">Reparación no satisfactoria</option>
                  <option value="41">
                    Anulación de contratos de adhesión o cláusulas abusivas en
                    los mismos
                  </option>
                  <option value="42">Atipicidad</option>
                  <option value="43">Caducidad de garantía</option>
                  <option value="44">Caducidad de la acción</option>
                  <option value="45">Exclusión de Vías</option>
                  <option value="46">Extraterritorialidad</option>
                  <option value="47">Falta de legitimación activa</option>
                  <option value="48">Falta de legitimación pasiva</option>
                  <option value="49">Falta de requisitos mínimos</option>
                  <option value="50">
                    Incompetencia en razón de la materia
                  </option>
                  <option value="51">
                    Incompetencia en razón de la materia al pretenderse el
                    resarcimiento de daños y perjuicio
                  </option>
                  <option value="52">Rechazo Adportas</option>
                  <option value="53">Servicios profesionales</option>
                  <option value="54">
                    Incumplimiento de Normas de calidad y Reglamentaciones
                    Técnicas
                  </option>
                  <option value="55">
                    Mal funcionamiento de Instrumentos de Medición y Pesaje
                  </option>
                  <option value="56">Producto contaminado</option>
                  <option value="57">Producto vencido</option>
                  <option value="58">Pendiente Asignar</option>
                  <option value="59">
                    Ausencia de información en la Oferta
                  </option>
                  <option value="60">
                    Ausencia de información en Promociones
                  </option>
                  <option value="61">Falta de claridad en Promoción</option>
                  <option value="62">
                    Falta información sobre limitaciones o restricciones de
                    promoción
                  </option>
                  <option value="63">Comparativa</option>
                  <option value="64">Engañosa</option>
                  <option value="65">Incumplimiento de lo publicitado</option>
                  <option value="66">Publicidad comparativa</option>
                  <option value="67">Publicidad Falsa</option>
                  <option value="68">
                    Ausencia de requisitos de información en el estado de cuenta
                  </option>
                  <option value="69">Cobro de más por pagar con tarjeta</option>
                  <option value="70">Cobro Indebido</option>
                  <option value="71">Doble cobro</option>
                  <option value="72">No envían estados de cuenta</option>
                  <option value="73">
                    No informaron acerca del mecanismo para determinar la tasa
                    de interés
                  </option>
                  <option value="74">
                    No informaron en el estado de cuenta inmediato posterior,
                    las modificaciones del contrato original, adendum o anexos
                  </option>
                  <option value="75">
                    No informaron la tasa de interés cobrada en el período
                  </option>
                  <option value="76">
                    Restricción al pago con tarjeta de crédito
                  </option>
                  <option value="77">Robo o extravío de tarjeta</option>
                  <option value="78">Ausencia de autorización del MEIC</option>
                  <option value="79">
                    EDUCACION AL USUARIO ESTADO DE EXPEDIENTES INGRESADOS A LA
                    COMISION NACIONAL DEL CONSUMIDOR
                  </option>
                  <option value="80">
                    EDUCACION AL USUARIO LEY DE PROMOCION DE LA COMPETENCIA Y
                    DEFENSA EFECTIVA DEL CONSUMIDOR
                  </option>
                  <option value="81">
                    EDUCACION AL USUARIO REGLAMENTO A LA LEY DE PROMOCION DE LA
                    COMPETENCIA Y DEFENSA EFECTIVA DEL CONSUMIDOR
                  </option>
                  <option value="82">
                    EDUCACION AL USUARIO REGLAMENTO DE TRAJETAS DE CREDITO Y
                    DEBITO
                  </option>
                  <option value="83">
                    INFORMACION GENERAL AL USUARIO SOBRE GENERALIDADES DE LA
                    OFICINA
                  </option>
                  <option value="84">test</option>
                  <option value="85">INFORMACION GENERAL</option>
                  <option value="86">No aplica</option>
                </>
              )}
              {materiaOption2 === "1" && (
                <>
                  <option value="1">Acaparamiento</option>
                  <option value="2">Ventas atadas o condicionadas</option>
                </>
              )}
              {materiaOption2 === "2" && (
                <>
                  <option value="1">Prácticas abusivas en las cobranzas</option>
                </>
              )}
              {materiaOption2 === "3" && (
                <>
                  <option value="1">Cláusulas Abusivas</option>
                  <option value="2">Incumplimiento</option>
                  <option value="3">
                    Incumplimiento en Servicios de Reparación
                  </option>
                </>
              )}
              {materiaOption2 === "4" && (
                <>
                  <option value="1">
                    Incumplimiento devolución del dinero
                  </option>
                  <option value="2">
                    Incumplimiento rescisión de contrato
                  </option>
                </>
              )}
              {materiaOption2 === "5" && (
                <>
                  <option value="1">Discriminación de consumo</option>
                </>
              )}
              {materiaOption2 === "6" && (
                <>
                  <option value="1">
                    No entregó la información requerida por la UEE
                  </option>
                </>
              )}
              {materiaOption2 === "7" && (
                <>
                  <option value="1">Especulación</option>
                </>
              )}
              {materiaOption2 === "8" && (
                <>
                  <option value="1">
                    Ausencia de identificación de los bienes y servicios
                    adquiridos y el precio efectivamente cobrado en la factura
                  </option>
                  <option value="2">
                    No entregaron factura o recibo de compra
                  </option>
                </>
              )}
              {materiaOption2 === "9" && (
                <>
                  <option value="1">
                    Ausencia de características y elementos del producto o
                    artículo
                  </option>
                  <option value="2">Ausencia de Etiquetado</option>
                  <option value="3">
                    Ausencia de información de que el artículo es defectuoso
                  </option>
                  <option value="4">
                    Ausencia de información de que el artículo es reconstruido
                  </option>
                  <option value="5">
                    Ausencia de información de que el artículo es usado
                  </option>
                  <option value="6">
                    Ausencia de información de que no existen en el país
                    servicios técnicos de reparación y repuestos
                  </option>
                  <option value="7">
                    Ausencia de información en impuestos
                  </option>
                  <option value="8">Ausencia de información en precios</option>
                  <option value="9">
                    Ausencia de información en Ventas a Crédito
                  </option>
                  <option value="10">
                    Ausencia de Manuales de Instrucciones
                  </option>
                  <option value="11">Falta de información</option>
                  <option value="12">
                    Información con letra ilegible tanto en su tamaño como en su
                    forma
                  </option>
                  <option value="13">
                    Información en idioma diferente al español
                  </option>
                  <option value="14">
                    Información general sobre la Ley 7472 al usuario
                  </option>
                  <option value="15">
                    Negativa a entregar cotización o presupuesto
                  </option>
                </>
              )}
              {materiaOption2 === "10" && (
                <>
                  <option value="1">Anulación y perdida de garantia</option>
                  <option value="2">
                    Condiciones y limitaciones excesivas
                  </option>
                  <option value="3">Incumplimiento</option>
                  <option value="4">
                    Incumplimiento en el plazo de la reparación
                  </option>
                  <option value="5">
                    Le cobran la reparación dentro del plazo de garantía
                  </option>
                  <option value="6">No dan garantía</option>
                  <option value="7">No extienden plazo de garantía</option>
                  <option value="8">No hay repuestos en el país</option>
                  <option value="9">No se entregó por escrito</option>
                  <option value="10">
                    Quiere cambio del artículo o devolución del dinero
                  </option>
                  <option value="11">
                    Reparación imposible y no se cambia artículo
                  </option>
                  <option value="12">Reparación no satisfactoria</option>
                </>
              )}
              {materiaOption2 === "11" && (
                <>
                  <option value="1">
                    Anulación de contratos de adhesión o cláusulas abusivas en
                    los mismos
                  </option>
                  <option value="2">Atipicidad</option>
                  <option value="3">Caducidad de garantía</option>
                  <option value="4">Caducidad de la acción</option>
                  <option value="5">Exclusión de Vías</option>
                  <option value="6">Extraterritorialidad</option>
                  <option value="7">Falta de legitimación activa</option>
                  <option value="8">Falta de legitimación pasiva</option>
                  <option value="9">Falta de requisitos mínimos</option>
                  <option value="10">
                    Incompetencia en razón de la materia
                  </option>
                  <option value="11">
                    Incompetencia en razón de la materia al pretenderse el
                    resarcimiento de daños y perjuicio
                  </option>
                  <option value="12">Rechazo Adportas</option>
                  <option value="13">Servicios profesionales</option>
                </>
              )}
              {materiaOption2 === "12" && (
                <>
                  <option value="1">
                    Incumplimiento de Normas de calidad y Reglamentaciones
                    Técnicas
                  </option>
                  <option value="2">
                    Mal funcionamiento de Instrumentos de Medición y Pesaje
                  </option>
                  <option value="3">Producto contaminado</option>
                  <option value="4">Producto vencido</option>
                </>
              )}
              {materiaOption2 === "13" && (
                <>
                  <option value="1">Pendiente Asignar</option>
                </>
              )}
              {materiaOption2 === "14" && (
                <>
                  <option value="1">
                    Ausencia de información en la Oferta
                  </option>
                  <option value="2">
                    Ausencia de información en Promociones
                  </option>
                  <option value="3">Falta de claridad en Promoción</option>
                  <option value="4">
                    Falta información sobre limitaciones o restricciones de
                    promoción
                  </option>
                </>
              )}
              {materiaOption2 === "15" && (
                <>
                  <option value="1">Comparativa</option>
                  <option value="2">Engañosa</option>
                  <option value="3">Incumplimiento de lo publicitado</option>
                  <option value="4">Publicidad comparativa</option>
                  <option value="5">Publicidad Falsa</option>
                </>
              )}
              {materiaOption2 === "16" && (
                <>
                  <option value="1">
                    Ausencia de requisitos de información en el estado de cuenta
                  </option>
                  <option value="2">Cobro de más por pagar con tarjeta</option>
                  <option value="3">Cobro Indebido</option>
                  <option value="4">Doble cobro</option>
                  <option value="5">No envían estados de cuenta</option>
                  <option value="6">
                    No informaron acerca del mecanismo para determinar la tasa
                    de interés
                  </option>
                  <option value="7">
                    No informaron en el estado de cuenta inmediato posterior,
                    las modificaciones del contrato original, adendum o anexos
                  </option>
                  <option value="8">
                    No informaron la tasa de interés cobrada en el período
                  </option>
                  <option value="9">
                    Restricción al pago con tarjeta de crédito
                  </option>
                  <option value="10">Robo o extravío de tarjeta</option>
                </>
              )}
              {materiaOption2 === "17" && (
                <>
                  <option value="1">Ausencia de autorización del MEIC</option>
                </>
              )}
              {materiaOption2 === "18" && (
                <>
                  <option value="1">
                    EDUCACION AL USUARIO ESTADO DE EXPEDIENTES INGRESADOS A LA
                    COMISION NACIONAL DEL CONSUMIDOR
                  </option>
                  <option value="2">
                    EDUCACION AL USUARIO LEY DE PROMOCION DE LA COMPETENCIA Y
                    DEFENSA EFECTIVA DEL CONSUMIDOR
                  </option>
                  <option value="3">
                    EDUCACION AL USUARIO REGLAMENTO A LA LEY DE PROMOCION DE LA
                    COMPETENCIA Y DEFENSA EFECTIVA DEL CONSUMIDOR
                  </option>
                  <option value="4">
                    EDUCACION AL USUARIO REGLAMENTO DE TRAJETAS DE CREDITO Y
                    DEBITO
                  </option>
                  <option value="5">
                    INFORMACION GENERAL AL USUARIO SOBRE GENERALIDADES DE LA
                    OFICINA
                  </option>
                  <option value="6">test</option>
                  <option value="7">INFORMACION GENERAL</option>
                </>
              )}
              {materiaOption2 === "19" && (
                <>
                  <option value="1">No aplica</option>
                </>
              )}
            </select>
          </div>
        )}
        {selectedOption1 === "3" && (
          <div className="col-md-4">
            <label htmlFor="input_Age1" className="form-label">
              Categoria
            </label>
            <select id="input_Age1" className="form-select" name="age1">
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              <option value="1">Ana Patricia Carranza Monge</option>
              <option value="2">Andrea Bejarano Alfaro</option>
              <option value="3">Andres Santana Martinez</option>
              <option value="4">Bryan Arias Mora</option>
              <option value="5">Catalina Leiton Araya</option>
              <option value="6">Cynthia Bernard Azofeifa</option>
              <option value="7">Elodia Sancho Sancho</option>
              <option value="8">Emilia Michell Mendez Castillo</option>
              <option value="9">Esteban Hidalgo Madrigal</option>
              <option value="10">Lizeth Jarquin Monge</option>
              <option value="11">Marianela Calderon Rivera</option>
              <option value="12">Sofia Emelda Siguenza Quintanilla</option>
              <option value="13">Stephannie Soto Masis</option>
            </select>
          </div>
        )}
        {selectedOption1 === "4" && (
          <div className="col-md-4">
            <label htmlFor="input_Org1" className="form-label">
              Categoria
            </label>
            <select id="input_Org1" className="form-select" name="org1">
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              <option value="1">presencial</option>
              <option value="2">llamada entrante (linea 800)</option>
              <option value="3">formulario web</option>
            </select>
          </div>
        )}
        {selectedOption1 === "5" && (
          <div className="col-md-4">
            <label htmlFor="input_Est1" className="form-label">
              Categoria
            </label>
            <select id="input_Est1" className="form-select" name="est1">
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              <option value="1">Activo</option>
              <option value="2">Completado</option>
              <option value="3">Cancelado</option>
            </select>
          </div>
        )}
      </div>
      <h3></h3>
      <div className="row">
        <div className="col-md-4">
          <label htmlFor="input_TID2" className="form-label">
            Elemento a Evaluar (Opcion 2)
          </label>
          <select
            id="input_TID2"
            className="form-select"
            name="tid2"
            value={selectedOption2}
            onChange={handleSelect2Change}
            //onChange={(e) => selectElem(e)}
          >
            <option value="0" selected="selected" disabled>
              Seleccione...
            </option>
            <option
              value="1"
              disabled={selectedOption1 === "1" /* || selectedOption3 === "1"*/}
            >
              Materias
            </option>
            <option
              value="2"
              disabled={selectedOption1 === "2" /* || selectedOption3 === "2"*/}
            >
              Asuntos Consultados
            </option>
            <option
              value="3"
              disabled={selectedOption1 === "3" /*|| selectedOption3 === "3"*/}
            >
              Agente
            </option>
            <option
              value="4"
              disabled={selectedOption1 === "4" /* || selectedOption3 === "4"*/}
            >
              Origen
            </option>
            <option
              value="5"
              disabled={selectedOption1 === "5" /* || selectedOption3 === "5"*/}
            >
              Estado
            </option>
          </select>
        </div>
        {selectedOption2 === "1" && (
          <div className="col-md-4">
            <label htmlFor="input_Mat2" className="form-label">
              Categoria
            </label>
            <select
              id="input_Mat2"
              className="form-select"
              name="mat2"
              value={materiaOption2}
              onChange={handleMateria2Change}
            >
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              <option value="1">
                Acciones orientadas a restringir la oferta, circulación de
                bienes y servicios
              </option>
              <option value="2">Acoso u hostigamiento para la cobranza</option>
              <option value="3">Contrato</option>
              <option value="4">Derecho de retracto</option>
              <option value="5">Discriminación de consumo</option>
              <option value="6">Entrega de información</option>
              <option value="7">Especulación</option>
              <option value="8">Factura</option>
              <option value="9">Falta de información</option>
              <option value="10">Garantía</option>
              <option value="11">No corresponde (Art. 149 Reglamento)</option>
              <option value="12">
                Normas de calidad y reglamentaciones técnicas
              </option>
              <option value="13">Pendiente Asignar</option>
              <option value="14">Promociones y Ofertas/Información</option>
              <option value="15">Publicidad/Información</option>
              <option value="16">Tarjetas de crédito</option>
              <option value="17">Ventas a plazo</option>
              <option value="18">INFORMACION GENERAL AL USUARIO</option>
              <option value="19">No aplica</option>
            </select>
          </div>
        )}
        {selectedOption2 === "2" && (
          <div className="col-md-4">
            <label htmlFor="input_Asu2" className="form-label">
              Categoria
            </label>
            <select id="input_Asu2" className="form-select" name="asu2">
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              {materiaOption === "0" && (
                <>
                  <option value="1">Acaparamiento</option>
                  <option value="2">Ventas atadas o condicionadas</option>
                  <option value="3">Prácticas abusivas en las cobranzas</option>
                  <option value="4">Cláusulas Abusivas</option>
                  <option value="5">Incumplimiento</option>
                  <option value="6">
                    Incumplimiento en Servicios de Reparación
                  </option>
                  <option value="7">
                    Incumplimiento devolución del dinero
                  </option>
                  <option value="8">
                    Incumplimiento rescisión de contrato
                  </option>
                  <option value="9">Discriminación de consumo</option>
                  <option value="10">
                    No entregó la información requerida por la UEE
                  </option>
                  <option value="11">Especulación</option>
                  <option value="12">
                    Ausencia de identificación de los bienes y servicios
                    adquiridos y el precio efectivamente cobrado en la factura
                  </option>
                  <option value="13">
                    No entregaron factura o recibo de compra
                  </option>
                  <option value="14">
                    Ausencia de características y elementos del producto o
                    artículo
                  </option>
                  <option value="15">Ausencia de Etiquetado</option>
                  <option value="16">
                    Ausencia de información de que el artículo es defectuoso
                  </option>
                  <option value="17">
                    Ausencia de información de que el artículo es reconstruido
                  </option>
                  <option value="18">
                    Ausencia de información de que el artículo es usado
                  </option>
                  <option value="19">
                    Ausencia de información de que no existen en el país
                    servicios técnicos de reparación y repuestos
                  </option>
                  <option value="20">
                    Ausencia de información en impuestos
                  </option>
                  <option value="21">Ausencia de información en precios</option>
                  <option value="22">
                    Ausencia de información en Ventas a Crédito
                  </option>
                  <option value="23">
                    Ausencia de Manuales de Instrucciones
                  </option>
                  <option value="24">Falta de información</option>
                  <option value="25">
                    Información con letra ilegible tanto en su tamaño como en su
                    forma
                  </option>
                  <option value="26">
                    Información en idioma diferente al español
                  </option>
                  <option value="27">
                    Información general sobre la Ley 7472 al usuario
                  </option>
                  <option value="28">
                    Negativa a entregar cotización o presupuesto
                  </option>
                  <option value="29">Anulación y perdida de garantia</option>
                  <option value="30">
                    Condiciones y limitaciones excesivas
                  </option>
                  <option value="31">Incumplimiento</option>
                  <option value="32">
                    Incumplimiento en el plazo de la reparación
                  </option>
                  <option value="33">
                    Le cobran la reparación dentro del plazo de garantía
                  </option>
                  <option value="34">No dan garantía</option>
                  <option value="35">No extienden plazo de garantía</option>
                  <option value="36">No hay repuestos en el país</option>
                  <option value="37">No se entregó por escrito</option>
                  <option value="38">
                    Quiere cambio del artículo o devolución del dinero
                  </option>
                  <option value="39">
                    Reparación imposible y no se cambia artículo
                  </option>
                  <option value="40">Reparación no satisfactoria</option>
                  <option value="41">
                    Anulación de contratos de adhesión o cláusulas abusivas en
                    los mismos
                  </option>
                  <option value="42">Atipicidad</option>
                  <option value="43">Caducidad de garantía</option>
                  <option value="44">Caducidad de la acción</option>
                  <option value="45">Exclusión de Vías</option>
                  <option value="46">Extraterritorialidad</option>
                  <option value="47">Falta de legitimación activa</option>
                  <option value="48">Falta de legitimación pasiva</option>
                  <option value="49">Falta de requisitos mínimos</option>
                  <option value="50">
                    Incompetencia en razón de la materia
                  </option>
                  <option value="51">
                    Incompetencia en razón de la materia al pretenderse el
                    resarcimiento de daños y perjuicio
                  </option>
                  <option value="52">Rechazo Adportas</option>
                  <option value="53">Servicios profesionales</option>
                  <option value="54">
                    Incumplimiento de Normas de calidad y Reglamentaciones
                    Técnicas
                  </option>
                  <option value="55">
                    Mal funcionamiento de Instrumentos de Medición y Pesaje
                  </option>
                  <option value="56">Producto contaminado</option>
                  <option value="57">Producto vencido</option>
                  <option value="58">Pendiente Asignar</option>
                  <option value="59">
                    Ausencia de información en la Oferta
                  </option>
                  <option value="60">
                    Ausencia de información en Promociones
                  </option>
                  <option value="61">Falta de claridad en Promoción</option>
                  <option value="62">
                    Falta información sobre limitaciones o restricciones de
                    promoción
                  </option>
                  <option value="63">Comparativa</option>
                  <option value="64">Engañosa</option>
                  <option value="65">Incumplimiento de lo publicitado</option>
                  <option value="66">Publicidad comparativa</option>
                  <option value="67">Publicidad Falsa</option>
                  <option value="68">
                    Ausencia de requisitos de información en el estado de cuenta
                  </option>
                  <option value="69">Cobro de más por pagar con tarjeta</option>
                  <option value="70">Cobro Indebido</option>
                  <option value="71">Doble cobro</option>
                  <option value="72">No envían estados de cuenta</option>
                  <option value="73">
                    No informaron acerca del mecanismo para determinar la tasa
                    de interés
                  </option>
                  <option value="74">
                    No informaron en el estado de cuenta inmediato posterior,
                    las modificaciones del contrato original, adendum o anexos
                  </option>
                  <option value="75">
                    No informaron la tasa de interés cobrada en el período
                  </option>
                  <option value="76">
                    Restricción al pago con tarjeta de crédito
                  </option>
                  <option value="77">Robo o extravío de tarjeta</option>
                  <option value="78">Ausencia de autorización del MEIC</option>
                  <option value="79">
                    EDUCACION AL USUARIO ESTADO DE EXPEDIENTES INGRESADOS A LA
                    COMISION NACIONAL DEL CONSUMIDOR
                  </option>
                  <option value="80">
                    EDUCACION AL USUARIO LEY DE PROMOCION DE LA COMPETENCIA Y
                    DEFENSA EFECTIVA DEL CONSUMIDOR
                  </option>
                  <option value="81">
                    EDUCACION AL USUARIO REGLAMENTO A LA LEY DE PROMOCION DE LA
                    COMPETENCIA Y DEFENSA EFECTIVA DEL CONSUMIDOR
                  </option>
                  <option value="82">
                    EDUCACION AL USUARIO REGLAMENTO DE TRAJETAS DE CREDITO Y
                    DEBITO
                  </option>
                  <option value="83">
                    INFORMACION GENERAL AL USUARIO SOBRE GENERALIDADES DE LA
                    OFICINA
                  </option>
                  <option value="84">test</option>
                  <option value="85">INFORMACION GENERAL</option>
                  <option value="86">No aplica</option>
                </>
              )}
              {materiaOption === "1" && (
                <>
                  <option value="1">Acaparamiento</option>
                  <option value="2">Ventas atadas o condicionadas</option>
                </>
              )}
              {materiaOption === "2" && (
                <>
                  <option value="1">Prácticas abusivas en las cobranzas</option>
                </>
              )}
              {materiaOption === "3" && (
                <>
                  <option value="1">Cláusulas Abusivas</option>
                  <option value="2">Incumplimiento</option>
                  <option value="3">
                    Incumplimiento en Servicios de Reparación
                  </option>
                </>
              )}
              {materiaOption === "4" && (
                <>
                  <option value="1">
                    Incumplimiento devolución del dinero
                  </option>
                  <option value="2">
                    Incumplimiento rescisión de contrato
                  </option>
                </>
              )}
              {materiaOption === "5" && (
                <>
                  <option value="1">Discriminación de consumo</option>
                </>
              )}
              {materiaOption === "6" && (
                <>
                  <option value="1">
                    No entregó la información requerida por la UEE
                  </option>
                </>
              )}
              {materiaOption === "7" && (
                <>
                  <option value="1">Especulación</option>
                </>
              )}
              {materiaOption === "8" && (
                <>
                  <option value="1">
                    Ausencia de identificación de los bienes y servicios
                    adquiridos y el precio efectivamente cobrado en la factura
                  </option>
                  <option value="2">
                    No entregaron factura o recibo de compra
                  </option>
                </>
              )}
              {materiaOption === "9" && (
                <>
                  <option value="1">
                    Ausencia de características y elementos del producto o
                    artículo
                  </option>
                  <option value="2">Ausencia de Etiquetado</option>
                  <option value="3">
                    Ausencia de información de que el artículo es defectuoso
                  </option>
                  <option value="4">
                    Ausencia de información de que el artículo es reconstruido
                  </option>
                  <option value="5">
                    Ausencia de información de que el artículo es usado
                  </option>
                  <option value="6">
                    Ausencia de información de que no existen en el país
                    servicios técnicos de reparación y repuestos
                  </option>
                  <option value="7">
                    Ausencia de información en impuestos
                  </option>
                  <option value="8">Ausencia de información en precios</option>
                  <option value="9">
                    Ausencia de información en Ventas a Crédito
                  </option>
                  <option value="10">
                    Ausencia de Manuales de Instrucciones
                  </option>
                  <option value="11">Falta de información</option>
                  <option value="12">
                    Información con letra ilegible tanto en su tamaño como en su
                    forma
                  </option>
                  <option value="13">
                    Información en idioma diferente al español
                  </option>
                  <option value="14">
                    Información general sobre la Ley 7472 al usuario
                  </option>
                  <option value="15">
                    Negativa a entregar cotización o presupuesto
                  </option>
                </>
              )}
              {materiaOption === "10" && (
                <>
                  <option value="1">Anulación y perdida de garantia</option>
                  <option value="2">
                    Condiciones y limitaciones excesivas
                  </option>
                  <option value="3">Incumplimiento</option>
                  <option value="4">
                    Incumplimiento en el plazo de la reparación
                  </option>
                  <option value="5">
                    Le cobran la reparación dentro del plazo de garantía
                  </option>
                  <option value="6">No dan garantía</option>
                  <option value="7">No extienden plazo de garantía</option>
                  <option value="8">No hay repuestos en el país</option>
                  <option value="9">No se entregó por escrito</option>
                  <option value="10">
                    Quiere cambio del artículo o devolución del dinero
                  </option>
                  <option value="11">
                    Reparación imposible y no se cambia artículo
                  </option>
                  <option value="12">Reparación no satisfactoria</option>
                </>
              )}
              {materiaOption === "11" && (
                <>
                  <option value="1">
                    Anulación de contratos de adhesión o cláusulas abusivas en
                    los mismos
                  </option>
                  <option value="2">Atipicidad</option>
                  <option value="3">Caducidad de garantía</option>
                  <option value="4">Caducidad de la acción</option>
                  <option value="5">Exclusión de Vías</option>
                  <option value="6">Extraterritorialidad</option>
                  <option value="7">Falta de legitimación activa</option>
                  <option value="8">Falta de legitimación pasiva</option>
                  <option value="9">Falta de requisitos mínimos</option>
                  <option value="10">
                    Incompetencia en razón de la materia
                  </option>
                  <option value="11">
                    Incompetencia en razón de la materia al pretenderse el
                    resarcimiento de daños y perjuicio
                  </option>
                  <option value="12">Rechazo Adportas</option>
                  <option value="13">Servicios profesionales</option>
                </>
              )}
              {materiaOption === "12" && (
                <>
                  <option value="1">
                    Incumplimiento de Normas de calidad y Reglamentaciones
                    Técnicas
                  </option>
                  <option value="2">
                    Mal funcionamiento de Instrumentos de Medición y Pesaje
                  </option>
                  <option value="3">Producto contaminado</option>
                  <option value="4">Producto vencido</option>
                </>
              )}
              {materiaOption === "13" && (
                <>
                  <option value="1">Pendiente Asignar</option>
                </>
              )}
              {materiaOption === "14" && (
                <>
                  <option value="1">
                    Ausencia de información en la Oferta
                  </option>
                  <option value="2">
                    Ausencia de información en Promociones
                  </option>
                  <option value="3">Falta de claridad en Promoción</option>
                  <option value="4">
                    Falta información sobre limitaciones o restricciones de
                    promoción
                  </option>
                </>
              )}
              {materiaOption === "15" && (
                <>
                  <option value="1">Comparativa</option>
                  <option value="2">Engañosa</option>
                  <option value="3">Incumplimiento de lo publicitado</option>
                  <option value="4">Publicidad comparativa</option>
                  <option value="5">Publicidad Falsa</option>
                </>
              )}
              {materiaOption === "16" && (
                <>
                  <option value="1">
                    Ausencia de requisitos de información en el estado de cuenta
                  </option>
                  <option value="2">Cobro de más por pagar con tarjeta</option>
                  <option value="3">Cobro Indebido</option>
                  <option value="4">Doble cobro</option>
                  <option value="5">No envían estados de cuenta</option>
                  <option value="6">
                    No informaron acerca del mecanismo para determinar la tasa
                    de interés
                  </option>
                  <option value="7">
                    No informaron en el estado de cuenta inmediato posterior,
                    las modificaciones del contrato original, adendum o anexos
                  </option>
                  <option value="8">
                    No informaron la tasa de interés cobrada en el período
                  </option>
                  <option value="9">
                    Restricción al pago con tarjeta de crédito
                  </option>
                  <option value="10">Robo o extravío de tarjeta</option>
                </>
              )}
              {materiaOption === "17" && (
                <>
                  <option value="1">Ausencia de autorización del MEIC</option>
                </>
              )}
              {materiaOption === "18" && (
                <>
                  <option value="1">
                    EDUCACION AL USUARIO ESTADO DE EXPEDIENTES INGRESADOS A LA
                    COMISION NACIONAL DEL CONSUMIDOR
                  </option>
                  <option value="2">
                    EDUCACION AL USUARIO LEY DE PROMOCION DE LA COMPETENCIA Y
                    DEFENSA EFECTIVA DEL CONSUMIDOR
                  </option>
                  <option value="3">
                    EDUCACION AL USUARIO REGLAMENTO A LA LEY DE PROMOCION DE LA
                    COMPETENCIA Y DEFENSA EFECTIVA DEL CONSUMIDOR
                  </option>
                  <option value="4">
                    EDUCACION AL USUARIO REGLAMENTO DE TRAJETAS DE CREDITO Y
                    DEBITO
                  </option>
                  <option value="5">
                    INFORMACION GENERAL AL USUARIO SOBRE GENERALIDADES DE LA
                    OFICINA
                  </option>
                  <option value="6">test</option>
                  <option value="7">INFORMACION GENERAL</option>
                </>
              )}
              {materiaOption === "19" && (
                <>
                  <option value="1">No aplica</option>
                </>
              )}
            </select>
          </div>
        )}
        {selectedOption2 === "3" && (
          <div className="col-md-4">
            <label htmlFor="input_Age2" className="form-label">
              Categoria
            </label>
            <select id="input_Age2" className="form-select" name="age2">
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              <option value="1">Ana Patricia Carranza Monge</option>
              <option value="2">Andrea Bejarano Alfaro</option>
              <option value="3">Andres Santana Martinez</option>
              <option value="4">Bryan Arias Mora</option>
              <option value="5">Catalina Leiton Araya</option>
              <option value="6">Cynthia Bernard Azofeifa</option>
              <option value="7">Elodia Sancho Sancho</option>
              <option value="8">Emilia Michell Mendez Castillo</option>
              <option value="9">Esteban Hidalgo Madrigal</option>
              <option value="10">Lizeth Jarquin Monge</option>
              <option value="11">Marianela Calderon Rivera</option>
              <option value="12">Sofia Emelda Siguenza Quintanilla</option>
              <option value="13">Stephannie Soto Masis</option>
            </select>
          </div>
        )}
        {selectedOption2 === "4" && (
          <div className="col-md-4">
            <label htmlFor="input_Org2" className="form-label">
              Categoria
            </label>
            <select id="input_Org2" className="form-select" name="org2">
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              <option value="1">presencial</option>
              <option value="2">llamada entrante (linea 800)</option>
              <option value="3">formulario web</option>
            </select>
          </div>
        )}
        {selectedOption2 === "5" && (
          <div className="col-md-4">
            <label htmlFor="input_Est2" className="form-label">
              Categoria
            </label>
            <select id="input_Est2" className="form-select" name="est2">
              <option value="0" selected="selected" disabled>
                Seleccione...
              </option>
              <option value="1">Activo</option>
              <option value="2">Completado</option>
              <option value="3">Cancelado</option>
            </select>
          </div>
        )}
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
            required
          >
            <option value="0" selected="selected" disabled>
              Seleccione...
            </option>
            <option defaultValue="1">De Barras</option>
            <option defaultValue="2">Lineal</option>
            <option defaultValue="3">Circular</option>
          </select>
        </div>
        <div className="col-md-4">
          <label htmlFor="input_Top" className="form-label">
            Filtros Top
          </label>

          <select
            id="input_TID"
            className="form-select"
            name="tid"
            onChange={(e) => selectTop(e)}
          >
            <option value="0" selected="selected" disabled>
              Seleccione...
            </option>
            <option defaultValue="1">Top 10</option>
            <option defaultValue="2">Top 20</option>
            <option defaultValue="3">Top 30</option>
            <option defaultValue="4">Todos</option>
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
            <div
              className="col-md-4 mt-2 text-wrap"
              onClick={(e) => exportarCompleto()}
            >
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
              <button className="btn btn-success me-1">Exportar a PDF</button>
              <button
                className="d-none btn btn-success"
                onClick={() => contador()}
              >
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
                <div style={{ width: 1000 }}>
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

        <div>
          <table
            id="RepoSoliPres"
            className="table table-light fs-5 table-striped caption-top badge text-nowrap border-primary overflow-auto"
          >
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
                  onClick={() => ResetTable()}
                >
                  Restrablecer Tabla
                </button>
                <table
                  id="RepoTotal"
                  className="table table-dark table-striped badge text-nowrap table-bordered border-primary overflow-auto"
                >
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
