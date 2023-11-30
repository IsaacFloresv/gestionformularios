import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Cookies from "universal-cookie";
import { Link } from "react-router-dom";

const cookies = new Cookies();
var nReporte;
const meicimg = "logo_meic.jpg";

const URI = "https://fwmback-production.up.railway.app/";
//const URIEMAIL = "https://sndmail-production-cdb6.up.railway.app/sendemail";

const CompFormpres = () => {
  //#region UseStates

  const CerrarSession = () => {
    const respuesta = confirm("¿Desea salir?");
    if (respuesta == true) {
      cookies.remove("info");
      cookies.remove("token");
    }
  };

  //#region useStates de los select
  //useState de datos
  const [prov, setProv] = useState([]);
  const [cant, setCant] = useState([]);
  const [dist, setDist] = useState([]);

  useEffect(() => {
    getProvs();
    getCantsEdit();
    getDistsEdit();
    getMaterias();
    getAsuntConsultadoEdit();
    getBienes();
    EditReport();
  }, []);

  //
  const [materia, setMateria] = useState([]);
  const [asunto, setAsunto] = useState([]);
  const [bien, setBien] = useState([]);

  //useState de datos del registro
  const [idReporte, setIdReporte] = useState();
  const [nRegistro, setnRegistro] = useState();
  const [eRegistro, seteRegistro] = useState();
  const [oRegistro, setoRegistro] = useState();
  const [toRegistro, settoRegistro] = useState();
  const [fchareg, setFchareg] = useState();
  const [fchacomplet, setFchacomplet] = useState("PENDIENTE");

  //#endregion useStates de los select

  //#region useState de carga de Datos Personas y Comerciante
  const [agente, setAgente] = useState();
  const [pers, setPers] = useState([]);
  const [comer, setComer] = useState([]);
  const [userspe, setUserspe] = useState();
  const [usobser, setUsobser] = useState();
  const [idprov, setidProv] = useState();
  const [idcant, setidCant] = useState();
  const [idDist, setidDist] = useState();
  const [rsocial, setRsocial] = useState();
  const [nfantasy, setNfantasy] = useState();
  const [idcorreo, setIdcorreo] = useState();
  const [idaudio, setIdaudio] = useState();

  const [idMat, setidMat] = useState();
  const [idAsu, setidAsu] = useState();
  const [idBie, setidBie] = useState();
  const [idNR, setidNR] = useState();

  //#endregion useState Basicos

  //#region UseState de Imputs
  //useState del afectado
  const [telorigen, settelorigen] = useState("NO INDICA");
  const [tdiA, settdiA] = useState("");
  const [ndiA, setndiA] = useState("");
  const [nombA, setnombA] = useState("");
  const [apell1A, setapell1A] = useState("");
  const [apell2A, setapell2A] = useState("");
  const [tel, setTel] = useState("");
  const [tel2, setTel2] = useState("");
  const [email, setEmail] = useState("");
  const [email2, setEmail2] = useState("");
  const [fchaHech, setfchaHech] = useState("NO INDICA");
  const [fchaGar, setfchaGar] = useState("NO INDICA");
  const [descH, setdescH] = useState("");
  const [resp, setResp] = useState("");
  const [ubProv, setubProv] = useState();
  const [ubCant, setubCant] = useState();
  const [ubDist, setubDist] = useState();
  const [ubMat, setubMat] = useState("");
  const [ubAsu, setubAsu] = useState("");
  const [ubBie, setubBie] = useState("");

  //inputs del comerciante
  const [tdiC, settdiC] = useState();
  const [ndiC, setndiC] = useState();
  const [nombC, setnombC] = useState();
  const [apell1C, setapell1C] = useState()
  const [apell2C, setapell2C] = useState();
  //const [ lblPHNombFantacy, setlblPHNombFantacy ] = useState()
  const [lblPHNombFantacyC, setlblPHNombFantacyC] = useState();

  //useState para los Select
  const [selectNidA, setselectNidA] = useState(0);
  const [selectNidC, setselectNidC] = useState(0);

  //useState para los ckeckbox
  const [naemail2, setnaemail2] = useState();

  //useState para modificar inputs
  const [dehabil, setdehabil] = useState(false);
  const [dehabil2, setdehabil2] = useState(false);
  const [dehabiltel1, setdehabiltel1] = useState(false);
  const [dehabiltel2, setdehabiltel2] = useState(false);
  const [dehabilem1, setdehabilem1] = useState(false);
  const [dehabilem2, setdehabilem2] = useState(false);
  const [deshabProv, setdeshabProv] = useState(false);
  const [deshabCant, setdeshabCant] = useState(true);
  const [deshabDist, setdeshabDist] = useState(true);
  const [dehabilndiC, setdehabilndiC] = useState(false);
  const [deshabIdAudio, setdehabIdAudio] = useState("d-none col-md-3");
  const [deshabIdCorreo, setdehabIdCorreo] = useState("d-none col-md-3");
  const [dehabilnombC, setdehabilnombC] = useState(false);
  const [dehabilapell1C, setdehabilapell1C] = useState(false);
  const [dehabilapell2C, setdehabilapell2C] = useState(false);
  const [deshabMateria, setdeshabMateria] = useState(false);
  const [deshabAConsultado, setdeshabAConsultado] = useState(true);
  const [deshabBien, setdeshabBien] = useState(true);
  const [checktel2, setCheckTel2] = useState(false);
  const [checkem2, setCheckEm2] = useState(false);
  const [checktel1, setCheckTel1] = useState(false);
  const [checkem1, setCheckEm1] = useState(false);
  const [showCompanyNameC, setShowCompanyNameC] = useState(true);
  const [showCompanyNameA, setShowCompanyNameA] = useState(true);

  //useState para guardar datos de ubicacion
  const [provi, setProvi] = useState(false);
  const [canto, setCanto] = useState(false);
  const [distr, setDistr] = useState(false);

  const [mate, setMate] = useState(false);
  const [asun, setAsun] = useState(false);
  const [biens, setBiens] = useState(false);

  //useState para solo lectura
  const [onlyRnombA, setonlyRnombA] = useState(false);
  const [onlyRapell1A, setonlyRapell1A] = useState(false);
  const [onlyRapell2A, setonlyRapell2A] = useState(false);
  const [onlyRnombC, setonlyRnombC] = useState(false);
  const [onlyRapell1C, setonlyRapell1C] = useState(false);
  const [onlyRapell2C, setonlyRapell2C] = useState(false);

  //useStaret para ocultar campos

  const [hiddentelObser, setHiddentelObser] = useState("col-md-3 d-none");
  const [hiddentelorig, setHiddentelorig] = useState("col-md-3 d-none");
  const [invisibleAp1, setinvisibleAp1] = useState("d-block col-md-4");
  const [invisibleAp2, setinvisibleAp2] = useState("d-block col-md-4");
  const [invisibleAp1C, setinvisibleAp1C] = useState("d-block col-md-4");
  const [invisibleAp2C, setinvisibleAp2C] = useState("d-block col-md-4");
  const [classdivnomb, setclassdivnomb] = useState("col-md-4");
  const [classdivnombC, setclassdivnombC] = useState("col-md-4");
  const [classdivDNI, setclassdivDNI] = useState("col-md-4");
  const [classdivDNIC, setclassdivDNIC] = useState("col-md-4");

  //useState para validar campos
  const [dehabilSubmit, setdehabilSubmit] = useState(true);
  const [camposDeshabilitados, setCamposDeshabilitados] = useState(false);
  const [lblinputName, setlblinputName] = useState("Nombre");
  const [fbNameA, setfbNameA] = useState("Por favor, ingrese su nombre.");
  const [fbNameC, setfbNameC] = useState(
    "Por favor, ingrese el nombre del comerciante."
  );
  const [lblinputNameC, setlblinputNameC] = useState("Nombre");
  const [lblapell1A, setlblapell1A] = useState("Primer Apellido");
  const [fbApell1A, setfbapell1A] = useState(
    "Por favor, ingrese su primer apellido."
  );
  const [fbApell1C, setfbapell1C] = useState(
    "Por favor, ingrese el primer apellido del comerciante."
  );
  const [lblapell1C, setlblapell1C] = useState("Primer Apellido");
  const [idclValid, setidClValid] = useState("");
  const [nclValid, setnClValid] = useState("");
  const [nclValidC, setnClValidC] = useState("");
  const [paclValid, setpaClValid] = useState("");
  const [saclValid, setsaClValid] = useState("");
  const [paclValidC, setpaClValidC] = useState("");
  const [saclValidC, setsaClValidC] = useState("");
  const [emclValid, setemClValid] = useState("");
  const [emclValid2, setemClValid2] = useState("");
  const [tlclValid, settlClValid] = useState("");
  const [tlclValid1, settlClValid1] = useState("");
  const [tlclValid2, settlClValid2] = useState("");
  const [idclValidC, setidClValidC] = useState("");
  const [fhHValidC, setfhHValidC] = useState("");
  const [fgValidC, setfgValidC] = useState("");
  const [dhClValid, setdhClValid] = useState("");
  const [respClValid, setRespClValid] = useState("");
  
  //#endregion UseState de Imputs
  //#endregion

  //#region Validacion de inputs

    const EnviarDatos = async (v) => {
          // Obtener la URL actual
          const urlParams = new URLSearchParams(window.location.search);
      
          // Obtener el valor del parámetro 'id'
          const id = urlParams.get('id');

      if (v === 1) {
        console.log("EnviarDatos se llama de forma reciproca");
      } else {
        console.log("Se procede a guardar los datos");
      }

      //var nagente = cookies.get("info");
      let headersList = {
        Accept: "*/*",
        //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
        "Content-Type": "application/json",
      };
        let bodyContent = JSON.stringify({
          id_report: idReporte,
          fchareg: fchareg,
          id_agente: agente,
          fchacomplet: fchacomplet,
          status: eRegistro,
          origen_r: oRegistro,
          tel_origen: toRegistro,
          usuario_s: userspe,
          us_obser: usobser,
          tdia: tdiA,
          ndia: ndiA,
          nomba: nombA,
          apell1a: apell1A,
          apell2a: apell2A,
          email: email,
          email2: email2,
          tel: tel,
          tel2: tel2,
          provi: provi,
          canto: canto,
          distr: distr,
          materia: ubMat,
          asunto: ubAsu,
          bien: ubBie,
          razon_social: rsocial,
          nombre_fantasia: nfantasy,
          tdic: tdiC,
          ndic: ndiC,
          fchahech: fchaHech,
          fchagar: fchaGar,
          desch: descH,
          respe: resp,
          id_audio: idaudio,
          id_correo: idcorreo,
        });

        console.log(bodyContent);

          let reqOptions = {
            url: "https://fwmback-production.up.railway.app/asepress/" + id,
            method: "PUT",
            headers: headersList,
            data: bodyContent,
          };
          // Crear una Promesa que se resuelve después de 5 segundos
const timeoutPromise = new Promise((resolve) => {
  setTimeout(() => {
    resolve('Tiempo de espera agotado');
  }, 10000);
});

// Hacer la solicitud con axios y la Promesa de tiempo de espera
Promise.race([axios.request(reqOptions), timeoutPromise])
  .then((response) => {
    // Aquí maneja la respuesta de la solicitud axios
    console.log('Respuesta recibida:', response);
  })
  .catch((error) => {
    // Aquí maneja los errores, como tiempo de espera agotado o errores de la solicitud
    console.error('Error:', error);
  });
          alert("Registro Editado Correctamente....");
          console.log("Registro editado correctamente.");
          window.location.reload()
        
  };

  //Validacion de formulario antes de enviar correo
  const validarbtnSubmit = (e) => {
    e.preventDefault();
    const NR = 1;
    if (NR != null) {
      if (
        telorigen != "" &&
        telorigen != " " &&
        agente != "" &&
        agente != " " &&
        usobser != "" &&
        usobser != " " &&
        ndiA != "" &&
        ndiA != " " &&
        nombA != "" &&
        nombA != " " &&
        apell1A != "" &&
        apell1A != " " &&
        apell2A != "" &&
        apell2A != " " &&
        email2 != "" &&
        email2 != " " &&
        email != "" &&
        email != " " &&
        tel != "" &&
        tel != " " &&
        tel2 != "" &&
        tel2 != " " &&
        fchaHech != "" &&
        fchaHech != " " &&
        fchaGar != "" &&
        fchaGar != " " &&
        prov != false &&
        cant != false &&
        distr != false &&
        ubMat != "" &&
        ubAsu != "" &&
        ubBie != "" &&
        tdiC != null &&
        tdiC != " " &&
        ndiC != null &&
        ndiC != " " &&
        nombC != "" &&
        nombC != " " &&
        apell1C != "" &&
        apell1C != " " &&
        apell2C != "" &&
        apell2C != " " &&
        descH != "" &&
        descH != " " && 
        resp != "" &&
        resp != " "
      ) {
        EnviarDatos();
      } else {
        alert("Faltan datos");
      }
    } else {
      alert("Por favor, confirme que es humano...");
    }
  };
  
  function limpiardatosA() {
    setndiA("");
    setnombA("");
    setapell1A("");
    setapell2A("");
    setidClValid("");
    setnClValid("");
    setpaClValid("");
    setsaClValid("");
  }

  function limpiardatosC() {
    setndiC("");
    setnombC("");
    setapell1C("");
    setapell2C("");
    setidClValidC("");
    setnClValidC("");
    setpaClValidC("");
    setsaClValidC("");
  }

  function cleanForm() {
    limpiardatosA();
    setEmail("");
    setEmail2("");
    setTel("");
    setTel2("");
    setubProv("");
    setubCant("");
    setdeshabCant(true);
    setubDist("");
    setdeshabDist(true);
    setubMat("");
    setubAsu("");
    setdeshabAConsultado(true);
    setubBie("");
    setdeshabBien(true);
    setRsocial("");
    setNfantasy("");
    limpiardatosC();
    setdescH("");
    setResp("");
  }

  const OrigenChange = (e) => {
    let valor = e.target.selectedIndex;
    let oreg = e.target.options[valor].text;
    setoRegistro(oreg);

    switch (valor) {
      case 0:
        setHiddentelorig("d-none");
        setdehabIdCorreo("d-none");
        setdehabIdAudio("d-none");
        setIdcorreo("NO INDICA");
        setIdaudio("NO INDICA");
        break;

      case 1:
        setHiddentelorig("d-block col-md-3");
        setdehabIdAudio("d-block col-md-3");
        settoRegistro("");
        setIdaudio("");
        setIdcorreo("NO INDICA");
        setdehabIdCorreo("d-none");
        break;

      case 2:
        setHiddentelorig("d-none");
        setdehabIdAudio("d-none");
        setdehabIdCorreo("d-block col-md-3");
        setIdcorreo("");
        setIdaudio("NO INDICA");
        break;
    }
  };

  const OrigenChangeEdit = (e) => {
    let valor = e;
    if (valor == "presencial"){
      setHiddentelorig("d-none");
      setdehabIdCorreo("d-none");
      setdehabIdAudio("d-none");
      setIdcorreo("NO INDICA");
      setIdaudio("NO INDICA");
    }else if (valor == "llamada entrante (linea 800)"){
      setHiddentelorig("d-block col-md-3");
      setdehabIdAudio("d-block col-md-3");
      settoRegistro("");
      setIdaudio("");
      setIdcorreo("NO INDICA");
      setdehabIdCorreo("d-none");
    }else if(valor == "formulario web"){
      setHiddentelorig("d-none");
      setdehabIdAudio("d-none");
      setdehabIdCorreo("d-block col-md-3");
      setIdcorreo("");
      setIdaudio("NO INDICA");
    }
  };

  const UsSpeChange = (e) => {
    let valor = e.target.selectedIndex;
    let estReg = e.target.options[valor].text;
    setUserspe(estReg);

    switch (valor) {
      case 0:
        setHiddentelObser("d-none");
        break;

      case 1:
        setHiddentelObser("d-block col-md-6");
        break;

      case 2:
        setHiddentelObser("d-block col-md-6");
        break;
    }
  };

  const UsSpeChangeEdit = (e) => {
    let valor = e

    if(valor=="No Aplica"){
      setHiddentelObser("d-none");
    }else if (valor=="Escalar"){
      setHiddentelObser("d-block col-md-6");
    }else if(valor=="Atender con prontitud"){
      setHiddentelObser("d-block col-md-6");
    }
  };

  const input_TIDchange = (val, tID) => {
    setselectNidA(val);
    const valor = val;
    settdiA(tID);
    limpiardatosA();

    switch (valor) {
      case 1:
        setShowCompanyNameA(true);
        limpiardatosA();
        setlblinputName("Nombre");
        setlblapell1A("Primer Apellido");
        setfbNameA("Por favor, ingrese su nombre.");
        setfbapell1A("Por favor, ingrese su primer apellido.");
        setclassdivnomb("col-md-4");
        setclassdivDNI("col-md-4");
        setinvisibleAp1("d-block col-md-4");
        setinvisibleAp2("d-block col-md-4");
        limpiardatosA();
        break;

      case 2:
        limpiardatosA();
        setlblinputName("Nombre");
        setlblapell1A("Primer Apellido");
        setfbNameA("Por favor, ingrese su nombre.");
        setfbapell1A("Por favor, ingrese su primer apellido.");
        setinvisibleAp1("d-block col-md-4");
        setinvisibleAp2("d-block col-md-4");
        setclassdivnomb("col-md-4");
        setclassdivDNI("col-md-4");
        limpiardatosA();
        break;

      case 3:
        limpiardatosA();
        setlblinputName("Nombre de Fantasía (Opcional)");
        setinvisibleAp1("d-none col-md-1");
        setinvisibleAp2("d-none col-md-1");
        setfbNameA("");
        setfbapell1A("");
        setapell1A("NO INDICA");
        setapell2A("NO INDICA");
        setclassdivnomb("col-md-5");
        setclassdivDNI("col-md-3");
        limpiardatosA();
        break;

      case 4:
        limpiardatosA();
        setlblinputName("Nombre");
        setlblapell1A("Primer Apellido");
        setfbNameA("Por favor, ingrese su nombre.");
        setfbapell1A("Por favor, ingrese su primer apellido.");
        setinvisibleAp1("d-block col-md-4");
        setinvisibleAp2("d-block col-md-4");
        setclassdivnomb("col-md-4");
        setclassdivDNI("col-md-4");
        limpiardatosA();
        break;
    }
  };

  const input_TIDchangeEdit = (e) => {
    const valor = e;
    //limpiardatosA();
    if (valor=="Cédula Nacional"){
      setShowCompanyNameA(true);
      limpiardatosA();
      setlblinputName("Nombre");
      setlblapell1A("Primer Apellido");
      setfbNameA("Por favor, ingrese su nombre.");
      setfbapell1A("Por favor, ingrese su primer apellido.");
      setclassdivnomb("col-md-4");
      setclassdivDNI("col-md-4");
      setinvisibleAp1("d-block col-md-4");
      setinvisibleAp2("d-block col-md-4");
      setselectNidA(1);
      limpiardatosA();
    }else if(valor=="Pasaporte"){
      limpiardatosA();
      setlblinputName("Nombre");
      setlblapell1A("Primer Apellido");
      setfbNameA("Por favor, ingrese su nombre.");
      setfbapell1A("Por favor, ingrese su primer apellido.");
      setinvisibleAp1("d-block col-md-4");
      setinvisibleAp2("d-block col-md-4");
      setclassdivnomb("col-md-4");
      setclassdivDNI("col-md-4");
      setselectNidA(2);
      limpiardatosA();
    }else if(valor=="Cédula Jurídica"){
      limpiardatosA();
      setlblinputName("Nombre de Empresa o institucion");
      setinvisibleAp1("col-md-4");
      setlblinputName("Nombre de Empresa o institucion");
      setlblapell1A("Nombre de Fantasía (Opcional)");
      setinvisibleAp2("d-none col-md-1");
      setfbNameA("");
      setfbapell1A("");
      //setapell1A("NO INDICA");
      setapell2A("NO INDICA");
      setclassdivnomb("col-md-5");
      setclassdivDNI("col-md-3");
      setselectNidA(3);
      limpiardatosA();
    }else if(valor=="DIMEX"){
      limpiardatosA();
      setlblinputName("Nombre");
      setlblapell1A("Primer Apellido");
      setfbNameA("Por favor, ingrese su nombre.");
      setfbapell1A("Por favor, ingrese su primer apellido.");
      setinvisibleAp1("d-block col-md-4");
      setinvisibleAp2("d-block col-md-4");
      setclassdivnomb("col-md-4");
      setclassdivDNI("col-md-4");
      setselectNidA(4);
      limpiardatosA();
    }
  };

  const input_TIDCchange = (val, tID) => {
    setselectNidC(val);
    settdiC(tID);
    const valor = val;

    switch (valor) {
      case 1:
        setShowCompanyNameC(true);
        limpiardatosC();
        setlblinputNameC("Nombre");
        setlblapell1C("Primer Apellido");
        setfbNameC("Por favor, ingrese su nombre.");
        setfbapell1C("Por favor, ingrese su primer apellido.");
        setclassdivnombC("d-block col-md-4");
        setclassdivDNIC("col-md-4 d-block");
        setinvisibleAp1C("d-block col-md-4");
        setinvisibleAp2C("d-block col-md-4");
        setlblPHNombFantacyC("");
        limpiardatosC();
        break;

      case 2:
        limpiardatosC();
        setlblinputNameC("Nombre");
        setlblapell1C("Primer Apellido");
        setfbNameC("Por favor, ingrese su nombre.");
        setfbapell1C("Por favor, ingrese su primer apellido.");
        setinvisibleAp1C("d-block col-md-4");
        setinvisibleAp2C("d-block col-md-4");
        setclassdivnombC("col-md-4");
        setclassdivDNIC("col-md-4 d-block");
        setlblPHNombFantacyC("");
        limpiardatosC();
        break;

      case 3:
        limpiardatosC();
        setlblinputNameC("Nombre de Fantasía (Opcional)");
        setfbNameC("");
        setfbapell1C("");
        setinvisibleAp1C("d-none col-md-1");
        setinvisibleAp2C("d-none col-md-1");
        setapell1C("NO INDICA");
        setapell2C("NO INDICA");
        setnombC("");
        setndiC("");
        setclassdivnombC("col-md-5");
        setclassdivDNIC("col-md-3 d-block");
        setlblPHNombFantacyC(
          "Nota: digite solamente el nombre del comercio en el campo nombre de fantasía si no conoce la cédula juridica."
        );
        break;

      case 4:
        limpiardatosC();
        setlblinputNameC("Nombre");
        setlblapell1C("Primer Apellido");
        setfbNameC("Por favor, ingrese su nombre.");
        setfbapell1C("Por favor, ingrese su primer apellido.");
        setinvisibleAp1C("d-block col-md-4");
        setinvisibleAp2C("d-block col-md-4");
        setclassdivnombC("col-md-4");
        setclassdivDNIC("col-md-4 d-block");
        setlblPHNombFantacyC("");
        limpiardatosC();
        break;

      case 5:
        setShowCompanyNameC(true);
        limpiardatosC();
        setlblinputNameC(
          "Nombre de Fantasía (Opcional) Nota: si no se da el dato digitar 'No indica'."
        );
        setlblapell1C("");
        setfbNameC("");
        setfbapell1C("");
        setndiC("0000000000");
        setapell1C("NO INDICA");
        setapell2C("NO INDICA");
        setNfantasy("NO INDICA");
        setinvisibleAp1C("d-none col-md-2");
        setinvisibleAp2C("d-none col-md-2");
        setclassdivnombC("col-md-8");
        setclassdivDNIC("col-md-2 d-none");
        setlblPHNombFantacyC("");
        break;
    }
  };

  const input_TIDCchangeEdit = (e) => {
    const valor = e;

    if(valor=="Cédula Nacional"){
      setShowCompanyNameC(true);
      limpiardatosC();
      setlblinputNameC("Nombre");
      setlblapell1C("Primer Apellido");
      setfbNameC("Por favor, ingrese su nombre.");
      setfbapell1C("Por favor, ingrese su primer apellido.");
      setclassdivnombC("col-md-4");
      setclassdivDNIC("col-md-4 d-block");
      setinvisibleAp1C("d-block col-md-4");
      setinvisibleAp2C("d-block col-md-4");
      setlblPHNombFantacyC("");
      setselectNidC(1);
      limpiardatosC();
    }else if(valor=="Pasaporte"){
      limpiardatosC();
      setlblinputNameC("Nombre");
      setlblapell1C("Primer Apellido");
      setfbNameC("Por favor, ingrese su nombre.");
      setfbapell1C("Por favor, ingrese su primer apellido.");
      setinvisibleAp1C("d-block col-md-4");
      setinvisibleAp2C("d-block col-md-4");
      setclassdivnombC("col-md-4");
      setclassdivDNIC("col-md-4 d-block");
      setlblPHNombFantacyC("");
      setselectNidC(2);
      limpiardatosC();
    }else if(valor=="Cédula Jurídica"){
      limpiardatosC();
      setlblinputNameC("Nombre de Empresa o institucion");
      setinvisibleAp1C("d-block col-md-4");
      setlblinputNameC("Nombre de Empresa o institucion");
      setlblapell1C("Nombre de Fantasía (Opcional)");
      setfbNameC("");
      setfbapell1C("");
      setinvisibleAp2C("d-none col-md-1");
      setapell1C("NO INDICA");
      setapell2C("NO INDICA");
      setnombC("");
      setndiC("");
      setclassdivnombC("col-md-5");
      setclassdivDNIC("col-md-3 d-block");
      setlblPHNombFantacyC(
        "Nota: digite solamente el nombre del comercio en el campo nombre de fantasía si no conoce la cédula juridica."
      );
      setselectNidC(3);
    }else if(valor=="DIMEX"){
      limpiardatosC();
      setlblinputNameC("Nombre");
      setlblapell1C("Primer Apellido");
      setfbNameC("Por favor, ingrese su nombre.");
      setfbapell1C("Por favor, ingrese su primer apellido.");
      setinvisibleAp1C("d-block col-md-4");
      setinvisibleAp2C("d-block col-md-4");
      setclassdivnombC("col-md-4");
      setclassdivDNIC("col-md-4 d-block");
      setlblPHNombFantacyC("");
      setselectNidC(4);
      limpiardatosC();
    }else if(valor=="NO INDICA"){
      setShowCompanyNameC(true);
      limpiardatosC();
      setlblinputNameC(
        "Nombre de Fantasía (Opcional) Nota: si no se da el dato digitar 'No indica'."
      );
      setlblapell1C("");
      setfbNameC("");
      setfbapell1C("");
      setndiC("0000000000");
      setapell1C("NO INDICA");
      setapell2C("NO INDICA");
      setNfantasy("NO INDICA");
      setinvisibleAp1C("d-none col-md-2");
      setinvisibleAp2C("d-none col-md-2");
      setclassdivnombC("col-md-8");
      setclassdivDNIC("col-md-2 d-none");
      setlblPHNombFantacyC("");
      setselectNidC(5);
    }
  };
  //#endregion

  //#region Validaciones de input

  //Cambio de valor del input email2 y tel2
  const changeTeloEmail = (val, ub) => {
    if (ub === 1) {
      if (val?.target.checked) {
        setEmail2("NO INDICA");
        setdehabilem2(true);
        setemClValid2("");
        setCheckEm2(true);
      } else {
        setEmail2("");
        setdehabilem2(false);
        setemClValid2("");
        setCheckEm2(false);
      }
    } else if (ub === 2) {
      if (val?.target.checked) {
        setTel2("0000-0000");
        setdehabiltel2(true);
        settlClValid2("");
        setCheckTel2(true);
      } else {
        setTel2("");
        setdehabiltel2(false);
        settlClValid2("");
        setCheckTel2(false);
      }
    } else if (ub === 3) {
      if (val?.target.checked) {
        setEmail("NO INDICA");
        setdehabilem1(true);
        setemClValid("");
        setCheckEm1(true);
      } else {
        setEmail("");
        setdehabilem1(false);
        setemClValid("");
        setCheckEm1(false);
      }
    } else if (ub === 4) {
      if (val?.target.checked) {
        setTel("0000-0000");
        setdehabiltel1(true);
        settlClValid1("");
        setCheckTel1(true);
      } else {
        setTel("");
        setdehabiltel1(false);
        settlClValid1("");
        setCheckTel1(false);
      }
    }
  };

  //Validacion del campo inputEmail
  const validarInputEmail = (val, ub) => {
    const valor = val;
    const Ub = ub;

    if (Ub === 1) {
      setEmail(valor);
    } else if (Ub === 2) {
      setEmail2(valor);
    }

    if (val.toString().length >= 1) {
      const resp =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          valor
        );
      if (resp) {
        if (Ub === 1) {
          setemClValid("is-valid");
        } else if (Ub === 2) {
          setemClValid2("is-valid");
        }
      } else {
        if (Ub === 1) {
          setemClValid("is-invalid");
        } else if (Ub === 2) {
          setemClValid2("is-invalid");
        }
      }
    } else {
      if (Ub === 1) {
        setemClValid("is-invalid");
      } else if (Ub === 2) {
        setemClValid2("is-invalid");
      }
    }
  };

  //Validacion del campo inputTel
  const ValidarinputTel = (val, ub) => {
    const valor = val;
    const Ub = ub;
    let resp = "";
    if (Ub === 1) {
      setTel(val);
    } else if (Ub === 2) {
      setTel2(val);
    }

    resp =
      val.indexOf("-") === 4
        ? /^[0-9]{4}-[0-9]{4}$/.test(valor)
        : /^[0-9]{8}$/.test(valor);

    if (resp) {
      if (Ub === 1) {
        //setdeshabProv(false);
        //getProvs();
        //getBienes();
        settlClValid("is-valid");
        let tele = val;
        tele =
          val.indexOf("-") === -1
            ? tele.toString().slice(0, 4) + "-" + tele.toString().slice(4)
            : val;
        setTel(tele);
      } else if (Ub === 2) {
        settlClValid2("is-valid");
        let tele = val;
        tele =
          val.indexOf("-") === -1
            ? tele.toString().slice(0, 4) + "-" + tele.toString().slice(4)
            : val;
        setTel2(tele);
      }
    } else {
      if (Ub === 1) {
        setTel(val);
        settlClValid("is-invalid");
      } else if (Ub === 2) {
        setTel2(val);
        settlClValid2("is-invalid");
      }
    }
  };

  const validarFch = (val) => {
    setfchaHech(val);
    if (val != null) {
      setfhHValidC("is-valid");
    } else {
      setfhHValidC("is-invalid");
    }
  };

  const validarFchHyGar = (val) => {
    let index = val.target.selectedIndex;
    let fcgar = val.target.options[index].text;
    setfchaGar(fcgar);

    if (fchaGar.length != 0) {
      setfgValidC("is-valid");
    } else {
      setfgValidC("is-invalid");
    }

    if (fchaHech != "") {
      setfhHValidC("is-valid");
    } else {
      setfhHValidC("is-invalid");
    }
  };

  const validarText = (val) => {
    return /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(val);
  };

  const validarTextEsp = (val) => {
    return /^[\w\W ]+$/.test(val);
  };

  //Validacion campo nombre
  const ValidarinputNomb = (val, ced) => {
    const valor = val;
    setnombA(valor);
    if (lblinputName == "Nombre") {
      const Ced = ced == 1 ? ndiA : ced;
      setnombA(valor);
      if (valor?.toString().length >= 1) {
        let resp;
        if (ced === 1) {
          resp = validarText(valor);
        } else if (Ced.toString().length === 9) {
          resp = validarText(valor);
        } else if (Ced.toString().length === 10) {
          resp = validarTextEsp(valor);
        } else if (Ced.toString().length === 12 || selectNidA === 4) {
          resp = validarText(valor);
        }

        if (resp) {
          setnClValid("is-valid");
        } else if (valor?.toString().length >= 1) {
          const resp = validarText(valor);
          if (ced === 1) {
            resp = validarText(valor);
          } else if (Ced.toString().length === 9) {
            resp = validarText(valor);
          } else if (Ced.toString().length === 10) {
            resp = validarTextEsp(valor);
          } else if (Ced.toString().length === 12 || selectNidA === 4) {
            resp = validarText(valor);
          }
          if (resp) {
            setnClValid("is-valid");
          } else {
            setnClValid("is-invalid");
          }
        } else {
          setnClValid("is-invalid");
        }
      } else {
        setnClValid("is-invalid");
      }
    } else if (
      lblinputName === "Nombre de Empresa o institucion" ||
      lblinputName === "Nombre de Fantasía (Opcional)"
    ) {
      const Ced = ced === 1 ? ndiA : ced;

      if (valor?.toString().length >= 1) {
        let resp;
        if (Ced.toString().length === 10) {
          resp = validarTextEsp(valor);
        }

        if (resp) {
          setnClValid("is-valid");
        } else {
          setnClValid("is-invalid");
        }
      } else {
        setnClValid("is-invalid");
      }
    }
  };

  const ValidarinputcedAEdit = (val) => {
    setidClValid("is-valid");
};

const ValidarinputcedCEdit = (val) => {
   setidClValidC("is-valid");
};

  const ValidarinputNombEdit = (val) => {
      setnClValid("is-valid");
  };

  const ValidarinputNombCEdit = (val) => {
      setnClValidC("is-valid");
  };

  const ValidarinputEmailEdit = (val) => {
      setemClValid("is-valid");
  };

  const ValidarinputEmailEdit2 = (val) => {
    setemClValid2("is-valid");
};

  const ValidarinputTelEdit = (val) => {
    const telefonoRegex = /^\d{4}-\d{4}$/; // Patrón que acepta cualquier combinación de 4 números, guion y otros 4 números
  
    if (telefonoRegex.test(val?.toString())) {
      settlClValid("is-valid");
    } else {
      settlClValid("is-invalid");
    }
  };
  
  const ValidarinputTelEdit2 = (val) => {
    const telefonoRegex = /^\d{4}-\d{4}$/; // Patrón que acepta cualquier combinación de 4 números, guion y otros 4 números
  
    if (telefonoRegex.test(val?.toString())) {
      settlClValid2("is-valid");
    } else {
      settlClValid2("is-invalid");
    }
  };

  const ValidarinputApp1 = (val) => {
    const valor = val;
    setapell1A(valor);
    if (lblapell1A != "Nombre de Fantasía (Opcional)") {
      if (val?.toString().length >= 1) {
        const resp = validarText(valor);
        if (resp) {
          setpaClValid("is-valid");
        } else {
          setpaClValid("is-invalid");
        }
      } else {
        setpaClValid("is-invalid");
      }
    }
  };

  const ValidarinputApp2 = (val) => {
    const valor = val;
    console.log(val);
    setapell2A(valor);
    if (lblapell1A != "Nombre de Fantasía (Opcional)") {
      if (val?.toString().length >= 1) {
        const resp = validarText(valor.trimEnd());
        console.log(valor, resp);
        if (resp) {
          setsaClValid("is-valid");
        } else {
          setsaClValid("is-invalid");
        }
      } else {
        setsaClValid("is-invalid");
      }
    }
  };

  const ValidarinputNombC = (val, ced) => {
    const valor = val;
    setnombC(valor);
    setRsocial(valor);
    if (lblinputNameC === "Nombre") {
      const Ced = ced === 2 ? ndiC : ced;
      setnombC(valor);
      setRsocial(valor);
      if (valor?.toString().length >= 1) {
        let resp;
        if (ced === 2) {
          resp = validarText(valor);
        } else if (Ced.toString().length === 9) {
          resp = validarText(valor);
        } else if (Ced.toString().length === 10) {
          resp = validarTextEsp(valor);
        } else if (Ced.toString().length === 12 || selectNidC === 4) {
          resp = validarText(valor);
        }

        if (resp) {
          setnClValidC("is-valid");
        } else if (valor?.toString().length >= 1) {
          const resp = validarText(valor);
          if (ced === 2) {
            resp = validarText(valor);
          } else if (Ced.toString().length === 9) {
            resp = validarText(valor);
          } else if (Ced.toString().length === 10) {
            resp = validarTextEsp(valor);
          } else if (Ced.toString().length === 12 || selectNidC === 4) {
            resp = validarText(valor);
          }
          if (resp) {
            setnClValidC("is-valid");
          } else {
            setnClValidC("is-invalid");
          }
        } else {
          setnClValidC("is-invalid");
        }
      } else {
        setnClValidC("is-invalid");
      }
    } else if (
      lblinputNameC == "Nombre de Empresa o institucion" ||
      (lblinputNameC == "Nombre de Fantasía (Opcional)" && tdiC != "NO INDICA")
    ) {
      const valor = val;
      const Ced = ced === 2 ? ndiC : ced;
      setnombC(valor);
      if (valor?.toString().length >= 0) {
        if (Ced.toString().length == 10) {
          const resp = validarTextEsp(valor);
          if (resp) {
            setnClValidC("is-valid");
          } else {
            setnClValidC("is-invalid");
          }
        } else if (valor.toString().length >= 1) {
          const resp = validarTextEsp(valor);
          if (resp) {
            setnClValidC("is-valid");
          } else {
            setnClValidC("is-invalid");
          }
        }
      } else {
        setnClValidC("is-invalid");
      }
    } else if (
      lblinputNameC ==
        "Nombre de Fantasía (Opcional) Nota: si no se da el dato digitar 'No indica'." &&
      tdiC === "NO INDICA"
    ) {
      const valor = val;
      setnombC(valor);
      setRsocial(valor);
      if (valor.toString().length >= 1) {
        const resp = validarTextEsp(valor);
        if (resp) {
          setnClValidC("is-valid");
        } else {
          setnClValidC("is-invalid");
        }
      } else {
        setnClValidC("is-invalid");
      }
    }
  };

  const ValidarinputApp1C = (val) => {
    const valor = val;
    setapell1C(valor);
    console.log(valor);
    if (lblapell1C != "Nombre de Fantasía (Opcional)") {
      if (val?.toString().length >= 1) {
        const resp = validarText(val);
        if (resp) {
          setpaClValidC("is-valid");
        } else {
          setpaClValidC("is-invalid");
        }
      } else {
        setpaClValidC("is-invalid");
      }
    }
  };

  const ValidarinputApp1CEdit = (val) => {
      setpaClValidC("is-valid");
  };

  const ValidarinputApp2C = (val) => {
    const valor = val;
    setapell2C(valor);
    if (val?.toString().length >= 1) {
      const resp = validarText(valor.trimEnd());
      if (resp) {
        setsaClValidC("is-valid");
      } else {
        setsaClValidC("is-invalid");
      }
    } else {
      setsaClValidC("is-invalid");
    }
  };

  const ValidarinputHecho = (val) => {
    const valor = val;
    setdescH(valor);
    console.log(valor);

    if (val.toString().length >= 0) {
      setdhClValid("is-valid");
      setdehabilSubmit(false);
    } else {
      setdhClValid("is-invalid");
    }
  };

  const ValidarinputResp = (val) => {
    const valor = val.trimStart();
    setResp(valor);

    setNfantasy(apell1C);

    if (val.toString().length >= 0 && val != " ") {
      setRespClValid("is-valid");
      setdehabilSubmit(false);
    } else {
      setRespClValid("is-invalid");
    }
  };

  //Validacion del campo inputCed del afectado
  const validarInputCedA = (val, ub) => {
    const valor = val;
    setndiA(valor);
    if (ub == 1) {
      if (selectNidA === 1) {
        const resp = /^[0-9]{9}$/.test(valor);
        if (resp && valor.toString().length === 9) {
          setidClValid("is-valid");
          cargarDatosP(val, ub);
        } else {
          setidClValid("is-invalid");
          setnClValid("");
          setpaClValid("");
          setsaClValid("");
          setnombA("");
          setapell1A("");
          setapell2A("");
          document.getElementById("errorCed").innerHTML = "";
        }
      } else if (selectNidA === 2) {
        const resp = /^[a-zA-Z0-9]{9}$/.test(val);
        if (resp && valor.toString().length === 9) {
          setidClValid("is-valid");
        } else {
          setnombA("");
          setapell1A("");
          setapell2A("");
          document.getElementById("errorCed").innerHTML = "";
        }
      } else if (selectNidA === 3) {
        const resp = /^[a-zA-Z0-9]{10}$/.test(val);
        if (resp && valor.toString().length === 10) {
          setidClValid("is-valid");
          cargarDatosC(valor, 1);
        } else {
          setidClValid("is-invalid");
          setnClValid("is-invalid");
          setsaClValid("is-invalid");
          setnombA("");
          setapell1A("");
          setapell2A("");
          document.getElementById("errorCed").innerHTML = "";
        }
      } else if (selectNidA === 4) {
        const resp = /^[0-9]{12}$/.test(valor);
        if (resp && valor.toString().length === 12) {
          setidClValid("is-valid");
        } else {
          setidClValid("is-invalid");
          setnombA("");
          setapell1A("");
          setapell2A("");
          document.getElementById("errorCed").innerHTML = "";
        }
      }
    } else if (ub == 2) {
      cargarDatosC(val, ub);
    }
  };

  //Validacion del campo inputCed del comerciante
  const validarInputCedC = (val, ub) => {
    const valor = val;
    setndiC(valor);
    console.log(val, ub, selectNidC);
    if (ub == 2) {
      if (selectNidC === 1) {
        const resp = /^[0-9]{9}$/.test(valor);
        if (resp && valor.toString().length === 9) {
          setidClValidC("is-valid");
          cargarDatosP(val, ub);
        } else {
          setidClValidC("is-invalid");
          setnClValidC("");
          setpaClValidC("");
          setsaClValidC("");
          setnombC("");
          setapell1C("");
          setapell2C("");
          document.getElementById("errorCedC").innerHTML = "";
        }
      } else if (selectNidC === 2) {
        const resp = /^[a-zA-Z0-9]{9}$/.test(val);
        if (resp && valor.toString().length === 9) {
          setidClValidC("is-valid");
        } else {
          setnombC("");
          setapell1C("");
          setapell2C("");
          document.getElementById("errorCedC").innerHTML = "";
        }
      } else if (selectNidC === 3) {
        const resp = /^[a-zA-Z0-9]{10}$/.test(val);
        if (resp && valor.toString().length === 10) {
          setidClValidC("is-valid");
          console.log(resp, val, ub);
          cargarDatosC(val, ub);
        } else {
          setidClValidC("is-invalid");
          setnClValidC("is-invalid");
          setsaClValidC("is-invalid");
          setnombC("");
          setapell1C("");
          setapell2C("");
          document.getElementById("errorCedC").innerHTML = "";
        }
      } else if (selectNidC === 4) {
        const resp = /^[0-9]{12}$/.test(valor);
        if (resp && valor.toString().length === 12) {
          setidClValidC("is-valid");
        } else {
          setidClValidC("is-invalid");
          setnombC("");
          setapell1C("");
          setapell2C("");
          document.getElementById("errorCedC").innerHTML = "";
        }
      }
    } else if (ub == 1) {
      validarInputCedA(val, ub);
    }
  };
  //#endregion

  //#region Funciones para carga de Datos
  const obtNRegistro = async () => {
    const res = await axios.get(URI + "asepres/");
  };

  //#region Carga de datos Ubicacion Geografica

  //Mostrar todas las provincias
  const getProvs = async () => {
    try {
      const res = await axios.get(URI + "prov/");
      setProv(res.data);
    } catch (error) {
      console.error("Error al obtener los datos de provincia:", error);
      getProvs();
    }
  };

  const getCantsEdit = async () => {
    try {
      const res = await axios.get(URI + "cant/");
      setCant(res.data);
    } catch (error) {
      console.error("Error al obtener los datos de canton:", error);
      getCantsEdit();
    }
  };

  const getDistsEdit = async () => {
    try {
      const res = await axios.get(URI + "dist/");
      setDist(res.data);
    } catch (error) {
      console.error("Error al obtener los datos de distrito:", error);
      getDistsEdit();
    }
  };

  //Mostrar los cantones por provincia
  const getCants = async (e) => {
    try {
      const val = e.target.options[e.target.selectedIndex].getAttribute('den');
      if (val != null) {
        setdeshabCant(false);
        let index = e.target.selectedIndex;
        let ubprov = e.target.options[index].text;
        setProvi(ubprov);
        setidProv(val);
        const res = await axios.get(URI + "cant/" + val);
        setCant(res.data);
        console.log(cant);
      } else {
        setubCant("0");
        setubDist("0");
      }
    } catch (error) {
      console.error("Error al obtener los datos del cantón:", error);
      getCants(e);
    }
  };

  //Mostrar los distritos por canton
  const getDists = async (v) => {
    try {
      const val = v.target.options[v.target.selectedIndex].getAttribute('den');
      if (val != null) {
        v === 0 ? setdeshabDist(true) : setdeshabDist(false);

        let index = v.target.selectedIndex;
        let ubcant = v.target.options[index].text;
        setCanto(ubcant);
        setidCant(val);
        const res = await axios.get(URI + "dist/" + val);
        setDist(res.data);
        setdeshabMateria(false);
      }
    } catch (error) {
      console.error("Error al obtener los datos del distrito:", error);
      getDists(v);
    }
  };

  //Metodo para definir el distrito
  const defubdist = (v) => {
    if (v.target.value != null) {
      const val = v.target.options[v.target.selectedIndex].getAttribute('den');
      let index = v.target.selectedIndex;
      let ubdist = v.target.options[index].text;
      setDistr(ubdist);
      setidDist(val);
      //getMaterias();
    }
  };

  const getMaterias = async () => {
    try {
      const res = await axios.get(URI + "mat/");
      setMateria(res.data);
    } catch (error) {
      console.error("Se ha producido un error al obtener las materias:", error);
      getMaterias();
    }
  };

  const getAsuntConsultadoEdit = async () => {
    try {
      const res = await axios.get(URI + "asu/");
      setAsunto(res.data);
    } catch (error) {
      console.error("Se ha producido un error al obtener los asuntos:", error);
      getAsuntConsultado();
    }
  };

  //Mostrar los asuntos por materia
  const getAsuntConsultado = async (v) => {
    try {
      const val = v.target.options[v.target.selectedIndex].getAttribute('den');

      if (val != null) {
        setdeshabAConsultado(false);

        let index = v.target.selectedIndex;
        let Materia = v.target.options[index].text;
        setubMat(Materia);

        const res = await axios.get(URI + "asu/" + val);
        setAsunto(res.data);
        //getBienes();
      } else {
        setubCant("0");
        setubDist("0");
      }
    } catch (error) {
      getAsuntConsultado(v);
    }
  };

  const defAsunto = async (v) => {
    const val = v?.target.value;
    if (val != null) {
      let index = v?.target.selectedIndex;
      let asun = v?.target.options[index].text;
      setubAsu(asun);
      setidAsu(asun);
    }
  };

  //Mostrar los bienes
  const getBienes = async (v) => {
    try {
      const res = await axios.get(URI + "bie/");
      setBien(res.data);
      setdeshabBien(false);
    } catch (error) {
      console.error("Se ha producido un error al obtener los bienes:", error);
      getBienes(v);
    }
  };

  const defbien = (v) => {
    if (v.label != null) {
      const val = v.label;
      console.log(val);
      setubBie(val);
      setidBie(v.value);
    }
  };
  
  //#endregion

  //Solicitud a DB
  const cargarDatosP = async (val, ub) => {
    try {
      const Ub = ub;
      console.log(val, Ub);
      await fetch(URI + "pers/" + val)
        .then((resp) => resp.json())
        .then((data) => {
          const Perso = data[0];
          setPers(Perso);
          console.log(Perso);
          if (ub == 1 && selectNidA == 1) {
            const nombre = Perso?.nombre;
            setnombA(nombre);
            setapell1A(Perso?.first_last_name);
            setapell2A(Perso?.second_last_name);
            ValidarinputNomb(nombre, val);
            ValidarinputApp1(Perso?.first_last_name);
            ValidarinputApp2(Perso?.second_last_name.trimEnd());
          } else if (ub == 2 && selectNidC == 1) {
            const nombre = Perso?.nombre;
            setnombC(nombre);
            setapell1C(Perso?.first_last_name);
            setapell2C(Perso?.second_last_name);
            ValidarinputNombC(nombre, val);
            ValidarinputApp1C(Perso?.first_last_name);
            ValidarinputApp2C(Perso?.second_last_name.trimEnd());
          } else if (ub == 1 && selectNidA == 3) {
            cargarDatosC(val, Ub);
          }
        });
    } catch (error) {
      // Manejo de la excepción
      console.error("Error en cargarDatosP:", error);
      // Llama a la función nuevamente
      cargarDatosP(val, ub);
    }
  };

  const cargarDatosC = async (val, ub) => {
    try {
      console.log("En cargardatosC");
      await fetch(URI + "comer/" + val)
        .then((resp) => resp.json())
        .then((data) => {
          const Comer = data[0];
          setComer(Comer);
          console.log(ub);
          if (ub == 1 && selectNidA == 3) {
            console.log("Primer if de comer");
            if (
              (Comer?.fantasy_name === null ||
                Comer?.fantasy_name === "NULL" ||
                Comer?.fantasy_name === "NA" ||
                Comer?.fantasy_name === "N/A") &&
              Comer?.business_name !== null
            ) {
              setShowCompanyNameA(true);
              const nombreA = Comer?.business_name;
              setnombA(nombreA);
              ValidarinputNomb(nombreA, val);
              setlblinputName("Nombre de Empresa o institucion");
              setinvisibleAp1("d-block col-md-4");
              setlblinputName("Nombre de Empresa o institucion");
              setlblapell1A("Nombre de Fantasía (Opcional)");
              setapell1A("NO INDICA");
              setapell2A("NO INDICA");
              console.log("si no hay nombre de fantasia");
            } else if (
              Comer?.fantasy_name == "NULL" ||
              Comer?.fantasy_name == null ||
              Comer?.fantasy_name == "NA" ||
              (Comer?.fantasy_name == "N/A" && Comer?.business_name == null)
            ) {
              setShowCompanyNameA(false);
              const nombreB = "NO INDICA";
              setinvisibleAp1("d-block col-md-4");
              setlblinputName("Nombre de Empresa o institucion");
              setlblapell1A("Nombre de Fantasía (Opcional)");
              setnombA(nombreB);
              setapell1A("NO INDICA");
              setapell2A("NO INDICA");
              ValidarinputNomb(nombreB, val);
              console.log("No hay nombre fantasia ni institucion");
            } else if (
              Comer?.fantasy_name != "NULL" ||
              Comer?.fantasy_name != null ||
              Comer?.fantasy_name != "NA" ||
              Comer?.fantasy_name != "N/A"
            ) {
              setShowCompanyNameA(true);
              const nombreM = Comer?.business_name;
              const nombreN = Comer?.fantasy_name;
              setinvisibleAp1("d-block col-md-4");
              setlblinputName("Nombre de Empresa o institucion");
              setlblapell1A("Nombre de Fantasía (Opcional)");
              setnombA(nombreM);
              setapell1A(nombreN);
              setapell2A("NO INDICA");
              ValidarinputNomb(nombreM, val);
              console.log("Existen ambos");
            }
          } else if (ub == 2 && selectNidC == 3) {
            console.log("segundo if de comer");
            if (
              (Comer?.fantasy_name === null ||
                Comer?.fantasy_name === "NULL" ||
                Comer?.fantasy_name === "NA" ||
                Comer?.fantasy_name === "N/A") &&
              Comer?.business_name !== null
            ) {
              setShowCompanyNameC(true);
              const nombreC = Comer?.business_name;
              let nombreD = Comer?.fantasy_name;
              if(nombreD=="NULL"){
                nombreD="NO INDICA"
              }
              setnombC(nombreC);
              ValidarinputNombC(nombreC, val);
              setlblinputNameC("Nombre de Empresa o institucion");
              setinvisibleAp1C("d-block col-md-4");
              setlblinputNameC("Nombre de Empresa o institucion");
              setlblapell1C("Nombre de Fantasía (Opcional)");
              setapell1C("NO INDICA");
              setapell2C("NO INDICA");
              setNfantasy(nombreD);
              setRsocial(nombreC);
              console.log("si no hay nombre de fantasia");
            } else if (
              (Comer?.fantasy_name == "NULL" ||
                Comer?.fantasy_name == null ||
                Comer?.fantasy_name == "NA" ||
                Comer?.fantasy_name == "N/A") &&
              Comer?.business_name == null
            ) {
              setShowCompanyNameC(false);
              const nombreE = "NO INDICA";
              setinvisibleAp1C("d-block col-md-5");
              setlblinputNameC("Nombre de Empresa o institucion");
              setlblapell1C("Nombre de Fantasía (Opcional)");
              setnombC(nombreE);
              setRsocial(nombreE);
              setapell1C("NO INDICA");
              setapell2C("NO INDICA");
              ValidarinputNombC(nombreE, val);
              console.log("No hay nombre fantasia ni institucion");
            } else if (
              Comer?.fantasy_name != "NULL" ||
              Comer?.fantasy_name != null ||
              Comer?.fantasy_name != "NA" ||
              Comer?.fantasy_name != "N/A"
            ) {
              setShowCompanyNameC(true);
              const nombreH = Comer?.business_name;
              const nombreJ = Comer?.fantasy_name;
              setinvisibleAp1C("d-block col-md-4");
              setlblinputNameC("Nombre de Empresa o institucion");
              setlblapell1C("Nombre de Fantasía (Opcional)");
              setnombC(nombreH);
              setapell1C(nombreJ);
              setRsocial(nombreH);
              setNfantasy(nombreJ);
              setapell2C("NO INDICA");
              ValidarinputNombC(nombreH, val);
              console.log("Existen ambos");
            }
          } else if (ub == 2 && selectNidC == 1) {
            cargarDatosP(val, ub);
          }
        });
    } catch (error) {
      // Manejo de la excepción
      console.error("Error en cargarDatosC:", error);
      // Llama a la función nuevamente
      cargarDatosC(val, ub);
    }
  };

  const EditReport = async () => {
    // Obtener la URL actual
    const urlParams = new URLSearchParams(window.location.search);
    
    // Obtener el valor del parámetro 'id'
    const id = urlParams.get('id');
    
    // Hacer lo que necesites con el ID
    console.log('El ID obtenido es:', id);
  
    const res = await axios.get(URI + "asepress/" + id);
    const Perso = res.data
      setPers(Perso);
      console.log("Datos extraidos: ", Perso);
      OrigenChangeEdit(Perso?.origen_r);
      input_TIDchangeEdit(Perso?.tdia);
      input_TIDCchangeEdit(Perso?.tdic);
      UsSpeChangeEdit(Perso?.usuario_s)
      setFchareg(Perso?.fchareg);
      setIdReporte(Perso?.id_report);
      seteRegistro(Perso?.status);
      setoRegistro(Perso?.origen_r);
      setUserspe(Perso?.usuario_s);
      setUsobser(Perso?.us_obser);
      setAgente(Perso?.id_agente);
      settoRegistro(Perso?.tel_origen);
      setIdaudio(Perso?.id_audio);
      setIdcorreo(Perso?.id_correo);
      settdiA(Perso?.tdia);
      setndiA(Perso?.ndia);
      setnombA(Perso?.nomba);
      setapell1A(Perso?.apell1a);
      setapell2A(Perso?.apell2a);
      setEmail(Perso?.email);
      setEmail2(Perso?.email2);
      setTel(Perso?.tel);
      setTel2(Perso?.tel2);
      setubProv(Perso?.provi);
      setProvi(Perso?.provi)
      setubCant(Perso?.canto);
      setCanto(Perso?.canto);
      setubDist(Perso?.distr);
      setDistr(Perso?.distr);
      setidMat(Perso?.materia);
      setubMat(Perso?.materia);
      setidAsu(Perso?.asunto);
      setubAsu(Perso?.asunto);
      setidBie(Perso?.bien);
      setubBie(Perso?.bien);
      settdiC(Perso?.tdic);
      setndiC(Perso?.ndic);
      setnombC(Perso?.razon_social);
      setapell1C(Perso?.nombre_fantasia);
      setdescH(Perso?.desch);
      setResp(Perso?.respe);
      ValidarinputcedAEdit(Perso?.ndia);
      ValidarinputcedCEdit(Perso?.ndia);
      ValidarinputNombEdit(Perso?.nomba);
      ValidarinputEmailEdit(Perso?.email);
      ValidarinputEmailEdit2(Perso?.email2);
      ValidarinputTelEdit(Perso?.tel);
      ValidarinputTelEdit2(Perso?.tel2);
      ValidarinputApp1(Perso?.apell1a);
      ValidarinputApp2(Perso?.apell2a.trimEnd());
      ValidarinputNombCEdit(Perso?.razon_social);
      ValidarinputApp1CEdit(Perso?.nombre_fantasia);
      ValidarinputHecho(Perso?.desch);
      ValidarinputResp(Perso?.respe);
  }

  function desactivarCampos() {
    // Obtén todos los elementos de entrada, textarea y select
    var elementos = document.querySelectorAll("input, textarea, select");

    // Recorre todos los elementos y desactívalos
    elementos.forEach(function (elemento) {
      elemento.disabled = true;
    });
  }

  window.addEventListener("load", function () {
    // Desplazar la página hacia arriba
    window.scrollTo(0, 0);
});

  //#endregion

  return (
    <div className="container bg-white mx-2 my-4 fw-semibold mx-auto max-w-6x1 px-1 sm:px-5 lg:px-7">
      <nav className="navbar bg-body-white fixed-top position-relative shadow">
        <div className="container" style={{ maxWidth: "1200px" }}>
          <img
            src={meicimg}
            alt="MEIC"
            width="140"
            height="55"
            className="d-flex justify-content-start"
          />
          <p className="fs-2 fw-bolder text-center clrTitle">
            EDICION DE FORMULARIOS MEIC
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
                    className="nav-link"
                    aria-current="page"
                  >
                    Formularios de Asesoria
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href={"/dashboard"}
                    id="btnenviar"
                    type="button"
                    className="nav-link"
                    aria-current="page"
                  >
                    Listado de Formularios
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href={"/stadistic"}
                    id="btnenviar"
                    type="button"
                    className="nav-link"
                    aria-current="page"
                  >
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
      <form
        id="formulario"
        className="g-3 me-3 needs-validation mt-5"
        noValidate
        action="#"
        required
      >
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <div class="d-none">
                <button
                  type="submit"
                  disabled
                  class="none"
                  aria-hidden="true"
                ></button>
              </div>
              <h3 className="clrTitle">Datos del registro </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="input_TID" className="form-label">
                Estado del registro:
              </label>
              <select
                id="seRegistro"
                value={eRegistro}
                className="form-select"
                name="eRegistro"
                onChange={(e) => {
                  let index = e.target.selectedIndex;
                  let estReg = e.target.options[index].text;
                  seteRegistro(estReg);
                }}
                required
              >
                <option defaultValue="DEFAULT" value="0">
                  Activo
                </option>
                <option defaultValue="2">Completado</option>
                <option defaultValue="3">Cancelado</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="input_TID" className="form-label">
                Origen del registro:
              </label>
              <select
                id="soRegistro"
                value={oRegistro}
                className="form-select"
                name="oRegistro"
                onChange={(e) => OrigenChange(e)}
                required
              >
                <option defaultValue="DEFAULT" value="0">
                  presencial
                </option>
                <option defaultValue="1">llamada entrante (linea 800)</option>
                <option defaultValue="2">formulario web</option>
              </select>
            </div>
            <div id="divinputtoRegistro" className={hiddentelorig}>
              <label htmlFor="toRegistro" className="form-label">
                Telefono de Origen
              </label>
              <input
                name="toRegistro"
                type="text"
                className={`form-control`}
                id="inputtoRegistro"
                value={toRegistro}
                onChange={(e) => {
                  settoRegistro(e.target.value);
                }}
                required
              />
              <span id="errorCed" className="fs-6"></span>
            </div>
            <div id="divinputtIdAudio" className={deshabIdAudio}>
              <label htmlFor="idAudio" className="form-label">
                Audio Origen
              </label>
              <input
                name="idAudio"
                type="text"
                className={`form-control`}
                id="inputidaudio"
                value={idaudio}
                onChange={(e) => {
                  setIdaudio(e.target.value);
                }}
                required
              />
            </div>
            <div id="divinputtIdCorreo" className={deshabIdCorreo}>
              <label htmlFor="idcorreo" className="form-label">
                Correo Origen
              </label>
              <input
                name="idcorreo"
                type="text"
                className={`form-control`}
                id="inputidcorreo"
                value={idcorreo}
                onChange={(e) => {
                  setIdcorreo(e.target.value);
                }}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="userEspe" className="form-label">
                Usuario especial:
              </label>
              <select
                id="userEspe"
                value={userspe}
                className="form-select"
                name="userEspe"
                onChange={(e) => UsSpeChange(e)}
                required
              >
                <option defaultValue="DEFAULT" value="0">
                  No Aplica
                </option>
                <option defaultValue="1">Escalar</option>
                <option defaultValue="2">Atender con prontitud</option>
              </select>
            </div>
            <div id="divinputtoRegistro" className={hiddentelObser}>
              <label htmlFor="usobserv" className="form-label">
                Observación:
              </label>
              <input
                name="usobserv"
                type="text"
                className={`form-control`}
                id="inputtoRegistro"
                value={usobser}
                onChange={(e) => {
                  setUsobser(e.target.value);
                }}
                required
              />
            </div>
          </div>
        </div>
        <div className="row my-3 ms-1">
          <div className="my-3">
            <h3 className="clrTitle">Datos del Usuario</h3>
          </div>
          <div className="col-md-4">
            <label htmlFor="input_TID" className="form-label">
              Tipo de identificación
            </label>
            <select
              id="input_TID"
              value={tdiA}
              className="form-select"
              name="tid"
              onChange={(e) =>
                input_TIDchange(e.target.selectedIndex, e.target.value)
              }
              required
            >
              <option defaultValue="DEFAULT" value="0" disabled>
                Seleccione...
              </option>
              <option defaultValue="1">Cédula Nacional</option>
              <option defaultValue="2">Pasaporte</option>
              <option defaultValue="3">Cédula Jurídica</option>
              <option defaultValue="4">DIMEX</option>
            </select>
          </div>
          <div id="divinputCed" className={classdivDNI}>
            <label htmlFor="inputCed" className="form-label">
              Identificación
            </label>
            <input
              name="nid"
              type="text"
              className={`form-control ${idclValid}`}
              id="inputCed"
              value={ndiA}
              onChange={(e) => {
                validarInputCedA(e.target.value, "1");
              }}
              required
              disabled={dehabil}
            />
            <div className="invalid-feedback">
              Por favor, ingrese su numero de indentificación.
            </div>
            <span id="errorCed" className="fs-6"></span>
          </div>
        </div>
        <div className="row row my-3 ms-1">
          {showCompanyNameA && (
            <div id="divinputName" className={classdivnomb}>
              <label
                htmlFor="inputName"
                className="form-label"
                id="lblinputName"
              >
                {lblinputName}
              </label>
              <input
                name="nombre"
                type="text"
                className={`form-control ${nclValid}`}
                readOnly={onlyRnombA}
                id="inputName"
                value={nombA}
                onChange={(e) => ValidarinputNomb(e.target.value, "1")}
                disabled={dehabil}
                required
              />
              <div className="invalid-feedback">{fbNameA}</div>
            </div>
          )}
          <div id="divinput1erAp" className={invisibleAp1}>
            <label htmlFor="input1erAp" className="form-label">
              {lblapell1A}
            </label>
            <input
              name="apell1"
              type="text"
              className={`form-control ${paclValid}`}
              readOnly={onlyRapell1A}
              id="input1erAp"
              value={apell1A}
              onChange={(e) => ValidarinputApp1(e.target.value)}
              disabled={dehabil}
              required
            />
            <div className="invalid-feedback">{fbApell1A}</div>
          </div>
          <div id="divinput2doAp" className={invisibleAp2}>
            <label htmlFor="input2doAp" className="form-label">
              Segundo Apellido
            </label>
            <input
              name="apell2"
              type="text"
              className={`form-control ${saclValid}`}
              readOnly={onlyRapell2A}
              id="input2doAp"
              value={apell2A}
              onChange={(e) => ValidarinputApp2(e.target.value)}
              disabled={dehabil}
              required
            />
            <div className="invalid-feedback">
              Por favor, ingrese su segundo apellido.
            </div>
          </div>
        </div>
        <div className="row my-3 ms-1">
          <div className="col-md-3">
            <label htmlFor="inputEmail" className="form-label me-3">
              Correo electronico
            </label>
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="naemail1"
              checked={checkem1}
              disabled={dehabil}
              onChange={(e) => changeTeloEmail(e, 3)}
            />
            <label className="form-check-label fs-6" htmlFor="naemail2">
              N/I
            </label>
            <input
              name="email"
              type="email"
              className={`form-control ${emclValid}`}
              id="inputEmail"
              value={email}
              required
              disabled={dehabilem1}
              onChange={(e) => validarInputEmail(e.target.value, 1)}
            />
            <div className="invalid-feedback">
              Por favor, ingrese un correo electronico válido.
            </div>
            <span id="erroremail2" className="fs-6"></span>
          </div>
          <div className="col-md-3">
            <label htmlFor="inputEmail2" className="form-label me-3">
              Correo electronico 2
            </label>
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="naemail2"
              checked={checkem2}
              disabled={dehabil}
              onChange={(e) => changeTeloEmail(e, 1)}
            />
            <label className="form-check-label fs-6" htmlFor="naemail2">
              N/I
            </label>
            <input
              name="email2"
              type="email"
              className={`form-control ${emclValid2}`}
              id="inputEmail2"
              value={email2}
              required
              disabled={dehabilem2}
              onChange={(e) => validarInputEmail(e.target.value, 2)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputTel" className="form-label me-3">
              Telefono (1234 - 5678)
            </label>
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="flexCheckDefault"
              checked={checktel1}
              disabled={dehabil}
              onChange={(e) => changeTeloEmail(e, 4)}
            />
            <label className="form-check-label fs-6" htmlFor="flexCheckDefault">
              N/I
            </label>
            <input
              name="tel"
              type="text"
              className={`form-control ${tlclValid}`}
              id="inputTel"
              value={tel}
              required
              disabled={dehabiltel1}
              onChange={(e) => ValidarinputTel(e.target.value, 1)}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="inputTel2" className="form-label me-3">
              Telefono 2 (1234 - 5678)
            </label>
            <input
              className="form-check-input me-2"
              type="checkbox"
              id="flexCheckDefault"
              checked={checktel2}
              disabled={dehabil}
              onChange={(e) => changeTeloEmail(e, 2)}
            />
            <label className="form-check-label fs-6" htmlFor="flexCheckDefault">
              N/I
            </label>
            <input
              name="tel2"
              type="text"
              className={`form-control ${tlclValid2}`}
              id="inputTel2"
              value={tel2}
              required
              disabled={dehabiltel2}
              onChange={(e) => ValidarinputTel(e.target.value, 2)}
            />
          </div>
        </div>
        <div className="row my-3 ms-1">
          <div className="my-3">
          <h3 className="clrTitle">Ubicación Geográfica</h3>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputprov" className="form-label">
              Provincia
            </label>
            <select
              name="prov"
              id="inputprov"
              className="form-select"
              disabled={deshabProv}
              onFocus={() => {
                document.getElementById('inputprov').selectedIndex = -1;
              }}
              onChange={(e) => {setubProv(e.target.value); getCants(e, e.target.options[e.target.selectedIndex].getAttribute('den'))}}
              value={ubProv}
              required
            >
              <option
                defaultValue={"DEFAULT"}
                value="0"
                selected="selected"
                disabled
              >
                Seleccione...
              </option>
              {prov?.map((prov) => (
                <option key={prov.id_provincia} value={prov.ubProv} den={prov.id_provincia}>
                  {" "}
                  {prov.name_provincia}{" "}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">
              Por favor, selecione una provincia.
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputcant" className="form-label">
              Cantón
            </label>
            <select
              name="cant"
              id="inputcant"
              className="form-select"
              disabled={deshabCant}
              onFocus={() => {
                document.getElementById('inputcant').selectedIndex = -1;
              }}
              onChange={(e) => {setubCant(e.target.value); getDists(e, e.target.options[e.target.selectedIndex].getAttribute('den'))}}
              value={ubCant}
              required
            >
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled
              >
                Seleccione...
              </option>
              {
                cant?.map((cant) => (
                  <option key={cant.ident} value={cant.ubcant} den={cant.ident}>
                    {" "}
                    {cant.name_canton}{" "}
                  </option>
                ))}
            </select>
            <div className="invalid-feedback">
              Por favor, selecione un canton.
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="inputdist" className="form-label">
              Distrito
            </label>
            <select
              name="dist"
              id="inputdist"
              className="form-select"
              disabled={deshabDist}
              onChange={(e) => {setubDist(e.target.value); defubdist(e, e.target.options[e.target.selectedIndex].getAttribute('den'))}}
              value={ubDist}
              required
            >
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled
              >
                Seleccione...
              </option>
              {
                dist?.map((dist) => (
                  <option key={dist.ident} value={dist.ubDist} den={dist.ident}>
                    {" "}
                    {dist.name_distrito}{" "}
                  </option>
                ))}
            </select>
            <div className="invalid-feedback">
              Por favor, selecione un distrito.
            </div>
          </div>
        </div>
        <div className="row my-3 ms-1">
          <div className="my-3">
            <h3 className="clrTitle">Clasificacion de Caso</h3>
          </div>
          <div className="col-md-4">
            <label htmlFor="selectMateria" className="form-label">
              Materia
            </label>
            <select
              name="materia"
              id="selectMateria"
              className="form-select"
              disabled={deshabMateria}
              onFocus={() => {
                document.getElementById('selectMateria').selectedIndex = -1;
              }}
              onChange={(e) => {setidMat(e.target.value); getAsuntConsultado(e, e.target.options[e.target.selectedIndex].getAttribute('den'))}}
              value={idMat}
              required
            >
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled
              >
                Seleccione...
              </option>
              {materia?.map((materia) => (
                <option key={materia.id} value={materia.idMat} den={materia.id_materia}>
                  {" "}
                  {materia.nomb_materia}{" "}
                </option>
              ))}
            </select>
            <div className="invalid-feedback">
              Por favor, selecione una materia.
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="selectAsuntoConsultado" className="form-label">
              Asunto Consultado
            </label>
            <select
              name="asuntConsultado"
              id="selectAsuntoConsultado"
              className="form-select"
              disabled={deshabAConsultado}
              onChange={(e) => {setidAsu(e.target.value), setubAsu(e.target.value);}}
              value={idAsu}
              required
            >
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled
              >
                Seleccione...
              </option>
              {//idprov > 0 &&
                asunto?.map((asunto) => (
                  <option key={asunto.id} value={asunto.idAsu}>
                    {" "}
                    {asunto.desc_asunto}{" "}
                  </option>
                ))}
            </select>
            <div className="invalid-feedback">
              Por favor, selecione un asunto.
            </div>
          </div>
          <div className="col-md-4">
            <label htmlFor="selectBien" className="form-label">
              Bien
            </label>
            <select
              name="bien"
              id="selectBien"
              className="form-select"
              disabled={deshabBien}
              onChange={(e) => {setidBie(e.target.value), setubBie(e.target.value);}}
              value={idBie}
              required
            >
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled
              >
                Seleccione...
              </option>
              {//idprov > 0 &&
                bien?.map((bien) => (
                  <option key={bien.id} value={bien.idBie}>
                    {" "}
                    {bien.desc_bien}{" "}
                  </option>
                ))}
            </select>
            <div className="invalid-feedback">
              Por favor, selecione un bien.
            </div>
          </div>
{/*
          <div className="col-md-4" disabled={deshabBien}>
            <label htmlFor="selectBien" className="form-label">
              Bien
            </label>
            <Select
              name="bien"
              id="selectBien"
              required
              onChange={(e) => defbien(e)}
              defaultValue={idBie}
              options={bien.map((bien) => ({
                label: bien.desc_bien,
                value: bien.id,
              }))}
            />
          </div>*/}
        </div>
        <div className="row my-3 ms-1">
          <div className="my-3">
            <h3 className="clrTitle">Datos de Comerciante</h3>
          </div>
          <div className="col-md-4">
            <label htmlFor="input_TIDC" className="form-label">
              Tipo de identificación
            </label>
            <select
              name="vtidc"
              id="input_TIDC"
              value={tdiC}
              className="form-select"
              disabled={dehabil}
              onChange={(e) =>
                input_TIDCchange(e.target.selectedIndex, e.target.value)
              }
              required
            >
              <option defaultValue="DEFAULT" value="0" disabled>
                Seleccione...
              </option>
              <option defaultValue="1">Cédula Nacional</option>
              <option defaultValue="2">Pasaporte</option>
              <option defaultValue="3">Cédula Jurídica</option>
              <option defaultValue="4">DIMEX</option>
              <option defaultValue="5">NO INDICA</option>
            </select>
            <div className="invalid-feedback">
              Por favor, selecione una opcion.
            </div>
          </div>
          <div id="divinputCedC" className={classdivDNIC}>
            <label htmlFor="inputCedC" className="form-label">
              Identificación
            </label>
            <input
              name="nidc"
              type="text"
              className={`form-control ${idclValidC}`}
              id="inputCedC"
              value={ndiC}
              onChange={(e) => validarInputCedC(e.target.value, "2")}
              disabled={dehabilndiC}
              required
            />
            <div className="invalid-feedback">
              Por favor, ingrese el numero de identificación del comerciante.
            </div>
            <span id="errorCedC" className="fs-6"></span>
          </div>
        </div>
        <div className="row my-3 ms-1">
          {showCompanyNameC && (
            <div id="divinputNameC" className={classdivnombC}>
              <label
                htmlFor="inputNameC"
                className="form-label"
                id="lblinputNameC"
              >
                {lblinputNameC}
              </label>
              <input
                name="nombrec"
                type="text"
                className={`form-control ${nclValidC}`}
                id="inputNameC"
                value={nombC}
                onChange={(e) => ValidarinputNombC(e.target.value, "2")}
                required
              />
              <div className="invalid-feedback">{fbNameC}</div>
              <div className="fs-6 fw-bold lh-1 text-danger"></div>
            </div>
          )}
          <div id="divinput1erApC" className={invisibleAp1C}>
            <label htmlFor="input1erApC" className="form-label">
              {lblapell1C}
            </label>
            <input
              name="apell1c"
              type="text"
              className={`form-control ${paclValidC}`}
              id="input1erApC"
              value={apell1C}
              onChange={(e) => ValidarinputApp1C(e.target.value)}
              required
            />
            <div className="invalid-feedback">{fbApell1C}</div>
          </div>
          <div id="divinput2doApC" className={invisibleAp2C}>
            <label htmlFor="input2doApC" className="form-label">
              Segundo Apellido
            </label>
            <input
              name="apell2c"
              type="text"
              className={`form-control ${saclValidC}`}
              id="input2doApC"
              value={apell2C}
              onChange={(e) => ValidarinputApp2C(e.target.value)}
              required
            />
            <div className="invalid-feedback">
              Por favor, ingrese el segundo apellido del comerciante.
            </div>
          </div>
        </div>
        <div className="row my-3 ms-1">
          <div className="my-3">
            <h3 className="clrTitle">Datos del Evento</h3>
          </div>
          <div className="mx-1 my-1">
            <label htmlFor="inputHecho" className="form-label">
              Descripción De Los Hechos
            </label>
            <textarea
              name="descrip"
              className={`form-control ${dhClValid}`}
              id="inputHecho"
              value={descH}
              rows="10"
              onChange={(e) => ValidarinputHecho(e.target.value)}
              disabled={dehabil}
              required
            ></textarea>
            <div className="invalid-feedback">
              Por favor, describa lo sucedido.
            </div>
          </div>
          <div className="mx-1 my-3">
            <label htmlFor="inputHecho" className="form-label">
              Respuesta Brindada
            </label>
            <textarea
              name="respuesta"
              className={`form-control ${respClValid}`}
              id="inputResp"
              value={resp}
              rows="10"
              onChange={(e) => ValidarinputResp(e.target.value)}
              disabled={dehabil}
              required
            ></textarea>
            <div className="invalid-feedback">
              Por favor, describa la respuesta a la consulta.
            </div>
          </div>
        </div>
        <div className="row justify-content-md-center">
          <div className="col col-lg-3 ">
            <button
              id="btnenviar"
              type="submit"
              className="d-none p-3 m-3 btn btn-success fw-bolder float-end"
              onClick={() => cleanForm()}
            >
              Escalar
            </button>
          </div>
          <div className="row justify-content-center">
            <div className="col-md-auto">
              <button
               id="btnenviar"
               type="submit"
               className="p-3 m-3 btn btn-primary fw-bolder"
               onClick={(e) => validarbtnSubmit(e)}
               disabled={dehabilSubmit}
              >
               Guardar Registro
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompFormpres;
