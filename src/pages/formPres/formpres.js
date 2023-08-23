import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import Cookies from 'universal-cookie'
import { Link } from "react-router-dom";

const cookies = new Cookies()
var nReporte

const URI = "https://fwmback-production.up.railway.app/";
//const URIEMAIL = "https://sndmail-production-cdb6.up.railway.app/sendemail";

const CompFormpres = () => {
  //#region UseStates

  const CerrarSession = () => {
    const respuesta = confirm("¿Desea salir?")
    if (respuesta == true) {
      cookies.remove('info')
      cookies.remove('token')
    }
  }

  //Obtener el numero del ultimo
  const NextRegister = async () => {
    let headersList = {
      "Accept": "*/*",
      "User-Agent": "Thunder Client (https://www.thunderclient.com)"
    }

    let response = await fetch("https://fwmback-production.up.railway.app/amp", {
      method: "PUT",
      headers: headersList
    });


    setAgente(cookies.get('info'))
    let data = await response.text();
    nReporte = data
    const may = nReporte

    console.log(data)
    setidNR(data)

    setnRegistro(may)
    /*let may = await response.text();
    let rmay = (may++)
    nreport = rmay

    //setidNR(data)
    
    console.log(nreport, data)*/

    //setnRegistro(may)
  };

  const EnviarDatos = async (v) => {
    const fecha = new Date().toLocaleString();
    setFchareg(fecha)
    if (v === 1) {
      console.log("EnviarDatos se llama de forma reciproca")          
    }else{
      alert("Se procede a guardar los datos");
    }
    
    var nagente = cookies.get('info')
    let headersList = {
      Accept: "*/*",
      //"User-Agent": "Thunder Client (https://www.thunderclient.com)",
      "Content-Type": "application/json",
    };

    if (!nReporte) {
      console.log("nReporte esta null")
      console.log(nReporte)
      NextRegister()      
    } else {
      let bodyContent = JSON.stringify({
        id_report: nReporte,
        fchareg: fchareg,
        id_agente: nagente,
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

      console.log(bodyContent)
      let reqOptions = {
        url: "https://fwmback-production.up.railway.app/asepress",
        method: "POST",
        headers: headersList,
        data: bodyContent,
      }

      let response = await axios.request(reqOptions);
      if (response.data.status === 400 || response.data.message === 'Validation error') {
        nReporte = ++nReporte
        console.log(nReporte)  
        console.log("no se guardo el dato.")
        EnviarDatos(1)
      } else {
        console.log(response)
        alert("Registro Creado Correctamente....");
        NextRegister()
        //window.location.reload()
      }
    }
  };

  //Validacion de formulario antes de enviar correo
  const validarbtnSubmit = (e) => {
    e.preventDefault();
    NextRegister()
    const NR = 1;
    if (NR != null) {
      if (
        (telorigen != "" && telorigen != " ") &&
        (agente != "" && agente != " ") &&
        (usobser != "" && usobser != " ") &&
        (ndiA != "" && ndiA != " ") &&
        (nombA != "" && nombA != " ") &&
        (apell1A != "" && apell1A != " ") &&
        (apell2A != "" && apell2A != " ") &&
        (email2 != "" && email2 != " ") &&
        (email != "" && email != " ") &&
        (tel != "" && tel != " ") &&
        (tel2 != "" && tel2 != " ") &&
        (fchaHech != "" && fchaHech != " ") &&
        (fchaGar != "" && fchaGar != " ") &&
        (prov != false) &&
        (cant != false) &&
        (distr != false) &&
        (ubMat != '') &&
        (ubAsu != '') &&
        (ubBie != '') &&
        (tdiC != null && tdiC != " ") &&
        (ndiC != null && ndiC != " ") &&
        (nombC != "" && nombC != " ") &&
        (apell1C != "" && apell1C != " ") &&
        (apell2C != "" && apell2C != " ") &&
        (descH != "" && descH != " ") &&
        (resp != "" && resp != " ")
      ) {
        EnviarDatos();
      } else {
        alert("faltan datos");
      }
    } else {
      alert("Por favor, confirme que es humano...");
    }
  };

  //#region useStates de los select
  //useState de datos
  const [ prov, setProv ] = useState([]);
  const [ cant, setCant ] = useState([]);
  const [ dist, setDist ] = useState([]);
  useEffect(() => {
    getProvs()
    getMaterias()
    getBienes()
    NextRegister()
  }, [])

  //
  const [ materia, setMateria ] = useState([]);
  const [ asunto, setAsunto ] = useState([]);
  const [ bien, setBien ] = useState([]);

  //useState de datos del registro
  const [ idReporte, setIdReporte ] = useState();
  const [ nRegistro, setnRegistro ] = useState();
  const [ eRegistro, seteRegistro ] = useState("Activo");
  const [ oRegistro, setoRegistro ] = useState("Presencial");
  const [ toRegistro, settoRegistro ] = useState("NO INDICA");
  const [ fchareg, setFchareg ] = useState();
  const [ fchacomplet, setFchacomplet ] = useState("PENDIENTE");

  //#endregion useStates de los select

  //#region useState de carga de Datos Personas y Comerciante
  const [ agente, setAgente ] = useState(cookies.get('info'));
  const [ pers, setPers ] = useState([]);
  const [ comer, setComer ] = useState([]);
  const [ userspe, setUserspe ] = useState("NO APLICA");
  const [ usobser, setUsobser ] = useState("NO APLICA");
  const [ idprov, setidProv ] = useState();
  const [ idcant, setidCant ] = useState();
  const [ idDist, setidDist ] = useState();
  const [ rsocial, setRsocial ] = useState();
  const [ nfantasy, setNfantasy ] = useState();
  const [ idcorreo, setIdcorreo ] = useState("NO INDICA");
  const [ idaudio, setIdaudio ] = useState("NO INDICA");

  const [ idMat, setidMat ] = useState();
  const [ idAsu, setidAsu ] = useState();
  const [ idBie, setidBie ] = useState();
  const [ idNR, setidNR ] = useState();

  //#endregion useState Basicos

  //#region UseState de Imputs
  //useState del afectado
  const [ telorigen, settelorigen ] = useState("NO INDICA");
  const [ tdiA, settdiA ] = useState("");
  const [ ndiA, setndiA ] = useState("");
  const [ nombA, setnombA ] = useState("");
  const [ apell1A, setapell1A ] = useState("");
  const [ apell2A, setapell2A ] = useState("");
  const [ tel, setTel ] = useState('');
  const [ tel2, setTel2 ] = useState("0000-0000");
  const [ email, setEmail ] = useState('');
  const [ email2, setEmail2 ] = useState("NO INDICA");
  const [ fchaHech, setfchaHech ] = useState("NO INDICA");
  const [ fchaGar, setfchaGar ] = useState("NO INDICA");
  const [ descH, setdescH ] = useState('');
  const [ resp, setResp ] = useState('');
  const [ ubProv, setubProv ] = useState();
  const [ ubCant, setubCant ] = useState();
  const [ ubDist, setubDist ] = useState();
  const [ ubMat, setubMat ] = useState('');
  const [ ubAsu, setubAsu ] = useState('');
  const [ ubBie, setubBie ] = useState('');

  //inputs del comerciante
  const [ tdiC, settdiC ] = useState();
  const [ ndiC, setndiC ] = useState();
  const [ nombC, setnombC ] = useState('');
  const [ apell1C, setapell1C ] = useState('');
  const [ apell2C, setapell2C ] = useState('');
  //const [ lblPHNombFantacy, setlblPHNombFantacy ] = useState()
  const [ lblPHNombFantacyC, setlblPHNombFantacyC ] = useState();

  //useState para los Select
  const [ selectNidA, setselectNidA ] = useState(0);
  const [ selectNidC, setselectNidC ] = useState(0);

  //useState para los ckeckbox
  const [ naemail2, setnaemail2 ] = useState();

  //useState para modificar inputs
  const [ dehabil, setdehabil ] = useState(false);
  const [ dehabil2, setdehabil2 ] = useState(false);
  const [ dehabiltel1, setdehabiltel1 ] = useState(false);
  const [ dehabiltel2, setdehabiltel2 ] = useState(true);
  const [ dehabilem1, setdehabilem1 ] = useState(false);
  const [ dehabilem2, setdehabilem2 ] = useState(true);
  const [ deshabProv, setdeshabProv ] = useState(false);
  const [ deshabCant, setdeshabCant ] = useState(true);
  const [ deshabDist, setdeshabDist ] = useState(true);
  const [ dehabilndiC, setdehabilndiC ] = useState(false);
  const [ deshabIdAudio, setdehabIdAudio ] = useState("d-none col-md-3");
  const [ deshabIdCorreo, setdehabIdCorreo ] = useState("d-none col-md-3");
  const [ dehabilnombC, setdehabilnombC ] = useState(false);
  const [ dehabilapell1C, setdehabilapell1C ] = useState(false);
  const [ dehabilapell2C, setdehabilapell2C ] = useState(false);
  const [ deshabMateria, setdeshabMateria ] = useState(true);
  const [ deshabAConsultado, setdeshabAConsultado ] = useState(true);
  const [ deshabBien, setdeshabBien ] = useState(true);
  const [ checktel2, setCheckTel2 ] = useState(true);
  const [ checkem2, setCheckEm2 ] = useState(true);
  const [ checktel1, setCheckTel1 ] = useState(false);
  const [ checkem1, setCheckEm1 ] = useState(false);


  //useState para guardar datos de ubicacion
  const [ provi, setProvi ] = useState(false);
  const [ canto, setCanto ] = useState(false);
  const [ distr, setDistr ] = useState(false);

  const [ mate, setMate ] = useState(false);
  const [ asun, setAsun ] = useState(false);
  const [ biens, setBiens ] = useState(false);

  //useState para solo lectura
  const [ onlyRnombA, setonlyRnombA ] = useState(false);
  const [ onlyRapell1A, setonlyRapell1A ] = useState(false);
  const [ onlyRapell2A, setonlyRapell2A ] = useState(false);
  const [ onlyRnombC, setonlyRnombC ] = useState(false);
  const [ onlyRapell1C, setonlyRapell1C ] = useState(false);
  const [ onlyRapell2C, setonlyRapell2C ] = useState(false);

  //useStaret para ocultar campos

  const [ hiddentelObser, setHiddentelObser ] = useState("col-md-3 d-none");
  const [ hiddentelorig, setHiddentelorig ] = useState("col-md-3 d-none");
  const [ invisibleAp1, setinvisibleAp1 ] = useState("d-block col-md-4");
  const [ invisibleAp2, setinvisibleAp2 ] = useState("d-block col-md-4");
  const [ invisibleAp1C, setinvisibleAp1C ] = useState("d-block col-md-4");
  const [ invisibleAp2C, setinvisibleAp2C ] = useState("d-block col-md-4");
  const [ classdivnomb, setclassdivnomb ] = useState("col-md-4");
  const [ classdivnombC, setclassdivnombC ] = useState("col-md-4");
  const [ classdivDNI, setclassdivDNI ] = useState("col-md-4");
  const [ classdivDNIC, setclassdivDNIC ] = useState("col-md-4");

  //useState para validar campos
  const [ dehabilSubmit, setdehabilSubmit ] = useState(true);
  const [ lblinputName, setlblinputName ] = useState("Nombre");
  const [ fbNameA, setfbNameA ] = useState("Por favor, ingrese su nombre.");
  const [ fbNameC, setfbNameC ] = useState(
    "Por favor, ingrese el nombre del comerciante."
  );
  const [ lblinputNameC, setlblinputNameC ] = useState("Nombre");
  const [ lblapell1A, setlblapell1A ] = useState("Primer Apellido");
  const [ fbApell1A, setfbapell1A ] = useState(
    "Por favor, ingrese su primer apellido."
  );
  const [ fbApell1C, setfbapell1C ] = useState(
    "Por favor, ingrese el primer apellido del comerciante."
  );
  const [ lblapell1C, setlblapell1C ] = useState("Primer Apellido");
  const [ idclValid, setidClValid ] = useState("");
  const [ nclValid, setnClValid ] = useState("");
  const [ nclValidC, setnClValidC ] = useState("");
  const [ paclValid, setpaClValid ] = useState("");
  const [ saclValid, setsaClValid ] = useState("");
  const [ paclValidC, setpaClValidC ] = useState("");
  const [ saclValidC, setsaClValidC ] = useState("");
  const [ emclValid, setemClValid ] = useState("");
  const [ emclValid2, setemClValid2 ] = useState("");
  const [ tlclValid, settlClValid ] = useState("");  
  const [ tlclValid1, settlClValid1 ] = useState("");
  const [ tlclValid2, settlClValid2 ] = useState("");
  const [ idclValidC, setidClValidC ] = useState("");
  const [ fhHValidC, setfhHValidC ] = useState("");
  const [ fgValidC, setfgValidC ] = useState("");
  const [ dhClValid, setdhClValid ] = useState("");
  const [ respClValid, setRespClValid ] = useState("");
  //#endregion UseState de Imputs
  //#endregion

  //#region Validacion de inputs
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
    limpiardatosA()
    setEmail('')
    setEmail2('')
    setTel('')
    setTel2('')
    setubProv('')
    setubCant('')
    setdeshabCant(true)
    setubDist('')
    setdeshabDist(true)
    setubMat('')
    setubAsu('')
    setdeshabAConsultado(true)
    setubBie('')
    setdeshabBien(true)
    setRsocial('')
    setNfantasy('')
    limpiardatosC()
    setdescH('')
    setResp('')
  }

  const OrigenChange = (e) => {
    let valor = e.target.selectedIndex;
    let oreg = e.target.options[ valor ].text;
    setoRegistro(oreg);

    switch (valor) {
      case 0:
        setHiddentelorig("d-none");
        setdehabIdCorreo("d-none")
        setdehabIdAudio("d-none")
        setIdcorreo("NO INDICA")
        setIdaudio("NO INDICA")
        break;

      case 1:
        setHiddentelorig("d-block col-md-3");
        setdehabIdAudio("d-block col-md-3")
        settoRegistro('')
        setIdaudio('')
        setIdcorreo("NO INDICA")
        setdehabIdCorreo("d-none")
        break;

      case 2:
        setHiddentelorig("d-none");
        setdehabIdAudio("d-none")
        setdehabIdCorreo("d-block col-md-3")
        setIdcorreo("")
        setIdaudio("NO INDICA")
        break;
    }
  };

  const UsSpeChange = (e) => {
    let valor = e.target.selectedIndex;
    let estReg = e.target.options[ valor ].text;
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

  const input_TIDchange = (val, tID) => {
    setselectNidA(val);
    const valor = val;
    settdiA(tID);
    limpiardatosA();

    switch (valor) {
      case 1:
        setlblinputName("Nombre");
        setlblapell1A("Primer Apellido");
        setfbNameA("Por favor, ingrese su nombre.");
        setfbapell1A("Por favor, ingrese su primer apellido.");
        setclassdivnomb("col-md-4");
        setclassdivDNI("col-md-4");
        setinvisibleAp1("d-block col-md-4");
        setinvisibleAp2("d-block col-md-4");
        break;

      case 2:
        setlblinputName("Nombre");
        setlblapell1A("Primer Apellido");
        setfbNameA("Por favor, ingrese su nombre.");
        setfbapell1A("Por favor, ingrese su primer apellido.");
        setinvisibleAp1("d-block col-md-4");
        setinvisibleAp2("d-block col-md-4");
        setclassdivnomb("col-md-4");
        setclassdivDNI("col-md-4");
        break;

      case 3:
        setlblinputName("Nombre de Fantasía (Opcional)");
        setinvisibleAp1("d-none col-md-1");
        setinvisibleAp2("d-none col-md-1");
        setfbNameA("");
        setfbapell1A("");
        setapell1A("Desconocido");
        setapell2A("Desconocido");
        setclassdivnomb("col-md-5");
        setclassdivDNI("col-md-3");
        break;

      case 4:
        setlblinputName("Nombre");
        setlblapell1A("Primer Apellido");
        setfbNameA("Por favor, ingrese su nombre.");
        setfbapell1A("Por favor, ingrese su primer apellido.");
        setinvisibleAp1("d-block col-md-4");
        setinvisibleAp2("d-block col-md-4");
        setclassdivnomb("col-md-4");
        setclassdivDNI("col-md-4");
        break;
    }
  };

  const input_TIDCchange = (val, tID) => {
    setselectNidC(val);
    settdiC(tID);
    const valor = val;

    switch (valor) {
      case 1:
        setlblinputNameC("Nombre");
        setlblapell1C("Primer Apellido");
        setfbNameC("Por favor, ingrese su nombre.");
        setfbapell1C("Por favor, ingrese su primer apellido.");
        setclassdivnombC("col-md-4");
        setclassdivDNIC("col-md-4 d-block");
        setinvisibleAp1C("d-block col-md-4");
        setinvisibleAp2C("d-block col-md-4");
        setlblPHNombFantacyC("");
        limpiardatosC()
        break;

      case 2:
        setlblinputNameC("Nombre");
        setlblapell1C("Primer Apellido");
        setfbNameC("Por favor, ingrese su nombre.");
        setfbapell1C("Por favor, ingrese su primer apellido.");
        setinvisibleAp1C("d-block col-md-4");
        setinvisibleAp2C("d-block col-md-4");
        setclassdivnombC("col-md-4");
        setclassdivDNIC("col-md-4 d-block");
        setlblPHNombFantacyC("");
        limpiardatosC()
        break;

      case 3:
        setlblinputNameC("Nombre de Fantasía (Opcional)");
        setfbNameC("");
        setfbapell1C("");
        setinvisibleAp1C("d-none col-md-1");
        setinvisibleAp2C("d-none col-md-1");
        setapell1C("Desconocido");
        setapell2C("Desconocido");
        setnombC('')
        setndiC('')
        setclassdivnombC("col-md-5");
        setclassdivDNIC("col-md-3 d-block");
        setlblPHNombFantacyC(
          "Nota: digite solamente el nombre del comercio en el campo nombre de fantasía si no conoce la cédula juridica."
        );
        break;

      case 4:
        setlblinputNameC("Nombre");
        setlblapell1C("Primer Apellido");
        setfbNameC("Por favor, ingrese su nombre.");
        setfbapell1C("Por favor, ingrese su primer apellido.");
        setinvisibleAp1C("d-block col-md-4");
        setinvisibleAp2C("d-block col-md-4");
        setclassdivnombC("col-md-4");
        setclassdivDNIC("col-md-4 d-block");
        setlblPHNombFantacyC("");
        limpiardatosC()
        break;

      case 5:
        setlblinputNameC("Nombre de Fantasía (Opcional) Nota: si no se da el dato digitar 'No indica'.");
        setlblapell1C("");
        setfbNameC("");
        setfbapell1C("");
        setndiC("0000000000");
        setapell1C("Desconocido");
        setapell2C("Desconocido");
        setNfantasy("NO INDICA")
        setinvisibleAp1C("d-none col-md-2");
        setinvisibleAp2C("d-none col-md-2");
        setclassdivnombC("col-md-8");
        setclassdivDNIC("col-md-2 d-none");
        setlblPHNombFantacyC("");
        break;
    }
  };

  //#endregion


  //#region Validaciones de input

  //Cambio de valor del input email2 y tel2
  const changeTeloEmail = (val, ub) => {
    if (ub === 1) {
      if (val?.target.checked) {
        setEmail2("No indica");
        setdehabilem2(true);
        setemClValid2("");
        setCheckEm2(true)
      } else {
        setEmail2("");
        setdehabilem2(false);
        setemClValid2("");
        setCheckEm2(false)
      }
    } else if (ub === 2) {
      if (val?.target.checked) {
        setTel2("0000-0000");
        setdehabiltel2(true);
        settlClValid2("");
        setCheckTel2(true)
      } else {
        setTel2("");
        setdehabiltel2(false);
        settlClValid2("");
        setCheckTel2(false)
      }
    }else if (ub === 3) {
      if (val?.target.checked) {
        setEmail("No indica");
        setdehabilem1(true);
        setemClValid("");
        setCheckEm1(true)
      } else {
        setEmail("");
        setdehabilem1(false);
        setemClValid("");
        setCheckEm1(false)
      }
    } else if (ub === 4) {
      if (val?.target.checked) {
        setTel("0000-0000");
        setdehabiltel1(true);
        settlClValid1("");
        setCheckTel1(true)
      } else {
        setTel("");
        setdehabiltel1(false);
        settlClValid1("");
        setCheckTel1(false)
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
    let fcgar = val.target.options[ index ].text;
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
    try {
      const valor = val;
      setnombA(valor);
  
      if (lblinputName === "Nombre") {
        const Ced = ced === 1 ? ndiA : ced;
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
          } else if(valor?.toString().length >= 1){
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
          }else {
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
    } catch (error) {
      // Se muestra el error en consola
      console.error("Error en ValidarinputNomb:", error);
      setnClValid("is-invalid");
    }
  };

  const ValidarinputApp1 = (val) => {
    try {
      const valor = val;
      setapell1A(valor);
      if (lblapell1A !== "Nombre de Fantasía (Opcional)") {
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
    } catch (error) {
      // Se muestra el error en consola
      console.error("Error:", error);
    }
  };
  

  const ValidarinputApp2 = (val) => {
    try {
      const valor = val;
      setapell2A(valor);
      if (lblapell1A != "Nombre de Fantasía (Opcional)") {
        if (val?.toString().length >= 1) {
          const resp = validarText(valor.trimEnd());
          if (resp) {
            setsaClValid("is-valid");
          } else {
            setsaClValid("is-invalid");
          }
        } else {
          setsaClValid("is-invalid");
        }
      }
    } catch (error) {
      // Se muestra el error en consola
      console.error("Ha ocurrido un error:", error);
    }
  };
  

  const ValidarinputNombC = (val, ced) => {
    try {
      if (lblinputNameC === "Nombre") {
        const valor = val;
        const Ced = ced === 2 ? ndiA : ced;
        setnombC(valor);
        setRsocial(valor);
        if (valor?.toString().length >= 1) {
          if (ced === 2) {
            const resp = validarText(valor);
            if (resp) {
              setnClValidC("is-valid");
            } else {
              setnClValidC("is-invalid");
            }
          } else if (Ced.toString().length == 9) {
            const resp = validarText(valor);
            if (resp) {
              setnClValidC("is-valid");
            } else {
              setnClValidC("is-invalid");
            }
          } else if (Ced.toString().length == 10) {
            const resp = validarTextEsp(valor);
            if (resp) {
              setnClValidC("is-valid");
            } else {
              setnClValidC("is-invalid");
            }
          } else if (Ced.toString().length == 12 || selectNidC == 4) {
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
        lblinputNameC == "Nombre de Empresa o institucion" ||
        lblinputNameC == "Nombre de Fantasía (Opcional)" && tdiC != 'NO INDICA'
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
          }
          else if(valor.toString().length >= 1) {
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
      } else if (lblinputNameC == "Nombre de Fantasía (Opcional) Nota: si no se da el dato digitar 'No indica'." && tdiC === 'NO INDICA') {
        const valor = val;
        setnombC(valor);
        setRsocial(valor)
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
    } catch (error) {
      // // Se muestra el error en consola
      console.error("Error en ValidarinputNombC:", error);
    }
  };

  const ValidarinputApp1C = (val) => {
    try {
      console.log(val);
      const valor = val;
      setapell1C(valor);
      setNfantasy(valor);
      if (lblapell1C !== "Nombre de Fantasía (Opcional)") {
        if (val.toString().length >= 1) {
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
    } catch (error) {
      console.error("Se produjo un error:", error);
      // Se muestra el error en consola
    }
  };
  

  const ValidarinputApp2C = (val) => {
    try {
      console.log(val)
      const valor = val;
      setapell2C(valor);
      if (val.toString().length >= 1) {
        const resp = validarText(valor.trimEnd());
        if (resp) {
          setsaClValidC("is-valid");
        } else {
          setsaClValidC("is-invalid");
        }
      } else {
        setsaClValidC("is-invalid");
      }
    } catch (error) {
      // Se muestra el error en consola
      console.error("Ocurrió un error:", error);
    }
  };
  

  const ValidarinputHecho = (val) => {
    const valor = val.trimStart();
    setdescH(valor);

    setNfantasy(apell1C);
    if (val.toString().length >= 0 && val != ' ') {
      setdhClValid("is-valid");
    } else {
      setdhClValid("is-invalid");
    }
  };

  const ValidarinputResp = (val) => {
    const valor = val.trimStart();
    setResp(valor);

    setNfantasy(apell1C);

    if (val.toString().length >= 0 && val != ' ') {
      setRespClValid("is-valid");
      setdehabilSubmit(false);
    } else {
      setRespClValid("is-invalid");
    }
  };

  //Validacion del campo inputCed del afectado
  const validarInputCedA = (val, ub) => {
    const fecha = new Date().toLocaleString();
    setFchareg(fecha)
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
    console.log(val, ub, selectNidC)
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
          console.log(resp, val, ub)
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
    const res = await axios.get(URI + "prov/");
    setProv(res.data);

    //getCants();
  };

  //Mostrar los cantones por provincia
  const getCants = async (v) => {
    const val = v?.target.value;
    if (val != null) {
      setdeshabCant(false);


      let index = v.target.selectedIndex;
      let ubprov = v.target.options[ index ].text;
      setProvi(ubprov);
      setidProv(val);
      const res = await axios.get(URI + "cant/" + val);
      setCant(res.data);
    } else {
      setubCant("0");
      setubDist("0");
    }
  };

  //Mostrar los distritos por canton
  const getDists = async (v) => {
    const val = v?.target.value;
    if (val != null) {
      v === 0 ? setdeshabDist(true) : setdeshabDist(false);

      let index = v.target.selectedIndex;
      let ubcant = v.target.options[ index ].text;
      setCanto(ubcant);
      setidCant(val);
      const res = await axios.get(URI + "dist/" + val);
      setDist(res.data);
      setdeshabMateria(false)
    }
  };

  //Metodo para definir el distrito
  const defubdist = (v) => {
    if (v.target.value != null) {
      const val = v.target.value;
      let index = v.target.selectedIndex;
      let ubdist = v.target.options[ index ].text;
      setDistr(ubdist);
      setidDist(val);
      //getMaterias();
    }
  };

  const getMaterias = async () => {
    const res = await axios.get(URI + "mat/");
    setMateria(res.data);
  };

  //Mostrar los cantones por provincia
  const getAsuntConsultado = async (v) => {
    const val = v?.target.value;

    if (val != null) {
      setdeshabAConsultado(false);

      let index = v.target.selectedIndex;
      let Materia = v.target.options[ index ].text;
      setubMat(Materia);
      setidMat(val);

      const res = await axios.get(URI + "asu/" + val);
      setAsunto(res.data);
      //getBienes();
    } else {
      setubCant("0");
      setubDist("0");
    }
  };

  const defAsunto = async (v) => {
    const val = v?.target.value;
    if (val != null) {
      let index = v?.target.selectedIndex;
      let asun = v?.target.options[ index ].text;
      setubAsu(asun);
      setidAsu(asun);
    }
  };

  //Mostrar los distritos por canton
  const getBienes = async (v) => {
    const res = await axios.get(URI + "bie/");
    setBien(res.data);
    setdeshabBien(false);
  };

  const defbien = (v) => {
    if (v.label != null) {
      const val = v.label;
      console.log(val)
      setubBie(val);
      setidBie(v.value);
    }
  };
  //#endregion

  //Solicitud a DB
  const cargarDatosP = async (val, ub) => {
    const Ub = ub;
    await fetch(URI + "pers/" + val)
      .then((resp) => resp.json())
      .then((data) => {
        const Perso = data[ 0 ];
        setPers(Perso);
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
  };

  const cargarDatosC = async (val, ub) => {
    console.log(val, ub)
    await fetch(URI + "comer/" + val)
      .then((resp) => resp.json())
      .then((data) => {
        const Comer = data[ 0 ];
        setComer(Comer);
        console.log(Comer)
        if (ub == 1 && selectNidA == 3) {
          if (
            Comer?.fantasy_name == "NULL" ||
            Comer?.fantasy_name == null ||
            Comer?.fantasy_name == "NA" ||
            Comer?.fantasy_name == "N/A"
          ) {
            const nombreA = Comer?.business_name;
            setnombA(nombreA);
            ValidarinputNomb(nombreA, val);
            setlblinputName("Nombre de Empresa o institucion");
          } else if (
            Comer?.fantasy_name != "NULL" ||
            Comer?.fantasy_name != null ||
            Comer?.fantasy_name != "NA" ||
            Comer?.fantasy_name != "N/A"
          ) {
            const nombreE = Comer?.business_name;
            const nombreF = Comer?.fantasy_name;
            setinvisibleAp1("d-block col-md-4");
            setlblinputName("Nombre de Empresa o institucion");
            setlblapell1A("Nombre de Fantasía (Opcional)");
            setapell2A("NO INDICA");
            setnombA(nombreE);
            setapell1A(nombreF);
          } else if (
            (Comer?.fantasy_name == "NULL" ||
              Comer?.fantasy_name == null ||
              Comer?.fantasy_name == "NA" ||
              Comer?.fantasy_name == "N/A") &&
            Comer?.business_name == null
          ) {
            const nombreE = Comer?.business_name;
            const nombreF = Comer?.fantasy_name;
            setinvisibleAp1("d-block col-md-4");
            setlblinputName("Nombre de Empresa o institucion");
            setlblapell1A("Nombre de Fantasía (Opcional)");
            setapell2A("NO INDICA");
            setnombA(nombreE);
            setapell1A(nombreF);
          }
        } else if (ub == 2 && selectNidC == 3) {
          console.log(Comer, 2, 3)
          if (
            Comer?.fantasy_name == "NULL" ||
            Comer?.fantasy_name == null ||
            Comer?.fantasy_name == "NA" ||
            Comer?.fantasy_name == "N/A"
          ) {
            console.log("no hay NF")
            const nombreC = Comer?.business_name;
            setnombC(nombreC);
            ValidarinputNombC(nombreC, val);
            setlblinputNameC("Nombre de Empresa o institucion");
            setinvisibleAp1C("d-block col-md-4");
            setlblinputNameC("Nombre de Empresa o institucion");
            setlblapell1C("Nombre de Fantasía (Opcional)");
            setapell2C("NO INDICA");
            setapell1C("");
            setRsocial(nombreC);
          } else if (
            Comer?.fantasy_name != "NULL" ||
            Comer?.fantasy_name != null ||
            Comer?.fantasy_name != "NA" ||
            Comer?.fantasy_name != "N/A"
          ) {
            console.log("Si hay NF y NC")
            const nombreE = Comer?.business_name;
            const nombreF = Comer?.fantasy_name;
            setinvisibleAp1C("d-block col-md-4");
            setlblinputNameC("Nombre de Empresa o institucion");
            setlblapell1C("Nombre de Fantasía (Opcional)");
            setapell2C("NO INDICA");
            setnombC(nombreE);
            ValidarinputNombC(nombreE, val);
            setapell1C(nombreF);
            setRsocial(nombreE);
            setNfantasy(apell1C);
          } else if (
            (Comer?.fantasy_name == "NULL" ||
              Comer?.fantasy_name == null ||
              Comer?.fantasy_name == "NA" ||
              Comer?.fantasy_name == "N/A") &&
              Comer?.business_name == null
          ) {
            console.log("no hay NF ni NC")
            const nombreE = Comer?.business_name;
            const nombreF = Comer?.fantasy_name;
            setinvisibleAp1C("d-block col-md-4");
            setlblapell1C("Nombre de Fantasía (Opcional)");
            setapell2C("NO INDICA");
            setnombC(nombreE);
            setapell1C(nombreF);
            setRsocial(nombreE);
            setNfantasy(apell1C);
          }

          console.log("nada")
        } else if (ub == 2 && selectNidC == 1) {
          cargarDatosP(val, ub);
        }
      });
  };

  //#endregion

  return (
    <div className="container bg-white mx-2 my-4 fw-semibold mx-auto max-w-6x1 px-1 sm:px-5 lg:px-7">
      <form
        id="formulario"
        className="g-3 me-3 needs-validation"
        noValidate
        action="#"
        required>
        <div className="container">
          <div className="row">
            <div className="col-md-6">
            <div class="d-none"><button type="submit" disabled class="none" aria-hidden="true"></button></div>
              <h3 className="clrTitle">Datos del registro </h3>
            </div>
            <div className="col-md-6">
              <p className="fs-6 float-end">Ultimo Caso Antendido: {idNR}</p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="input_TID" className="form-label">
                Estado del registro:
              </label>
              <select
                id="seRegistro"
                defaultValue={eRegistro}
                className="form-select"
                name="eRegistro"
                onChange={(e) => {
                  let index = e.target.selectedIndex;
                  let estReg = e.target.options[ index ].text;
                  seteRegistro(estReg);
                }}
                required>
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
                id="seRegistro"
                defaultValue={oRegistro}
                className="form-select"
                name="eRegistro"
                onChange={(e) => OrigenChange(e)}
                required>
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
                defaultValue={userspe}
                className="form-select"
                name="userEspe"
                onChange={(e) => UsSpeChange(e)}
                required>
                <option defaultValue="DEFAULT" value="0">
                  No Aplica
                </option>
                <option defaultValue="1">Escalar</option>
                <option defaultValue="2">Atender con prontitud</option>
              </select>
            </div>
            <div id="divinputtoRegistro" className={hiddentelObser}>
              <label htmlFor="usobserv" className="form-label">
                Observasión:
              </label>
              <input
                name="usobserv"
                type="text"
                className={`form-control`}
                id="inputtoRegistro"
                defaultValue={usobser}
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
              defaultValue={selectNidA}
              className="form-select"
              name="tid"
              onChange={(e) =>
                input_TIDchange(e.target.selectedIndex, e.target.value)
              }
              onClick={limpiardatosA}
              required>
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
              defaultValue={ndiA}
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
          <div id="divinputName" className={classdivnomb}>
            <label htmlFor="inputName" className="form-label" id="lblinputName">
              {lblinputName}
            </label>
            <input
              name="nombre"
              type="text"
              className={`form-control ${nclValid}`}
              readOnly={onlyRnombA}
              id="inputName"
              defaultValue={nombA}
              onChange={(e) => ValidarinputNomb(e.target.value, "1")}
              disabled={dehabil}
              required
            />
            <div className="invalid-feedback">{fbNameA}</div>
          </div>
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
              defaultValue={apell1A}
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
              defaultValue={apell2A}
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
              defaultValue={email}
              required
              disabled={dehabilem1}
              onChange={(e) => validarInputEmail(e.target.value, 1)}
            />
            <div className="invalid-feedback">
              Por favor, ingrese un correo electronico valido.
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
              onChange={(e) => getCants(e)}
              defaultValue={ubProv}
              required>
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled>
                Seleccione...
              </option>
              {prov?.map((prov) => (
                <option key={prov.id_provincia} value={prov.id_provincia}>
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
              onChange={(e) => getDists(e)}
              defaultValue={ubCant}
              required>
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled>
                Seleccione...
              </option>
              {idprov > 0 &&
                cant?.map((cant) => (
                  <option key={cant.ident} value={cant.ident}>
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
              onChange={(e) => defubdist(e)}
              defaultValue={ubDist}
              required>
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled>
                Seleccione...
              </option>
              {idcant > 0 &&
                dist?.map((dist) => (
                  <option key={dist.ident} value={dist.ident}>
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
              onChange={(e) => getAsuntConsultado(e)}
              defaultValue={idMat}
              required>
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled>
                Seleccione...
              </option>
              {materia?.map((materia) => (
                <option key={materia.id} value={materia.id_materia}>
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
              onChange={(e) => defAsunto(e)}
              defaultValue={idAsu}
              required>
              <option
                defaultValue="DEFAULT"
                value="0"
                selected="selected"
                disabled>
                Seleccione...
              </option>
              {idprov > 0 &&
                asunto?.map((asunto) => (
                  <option key={asunto.id} value={asunto.id_asunto}>
                    {" "}
                    {asunto.desc_asunto}{" "}
                  </option>
                ))}
            </select>
            <div className="invalid-feedback">
              Por favor, selecione un asunto.
            </div>
          </div>
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
          </div>
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
              defaultValue={selectNidC}
              className="form-select"
              disabled={dehabil}
              onChange={(e) =>
                input_TIDCchange(e.target.selectedIndex, e.target.value)
              }
              required>
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
          <div id="divinputNameC" className={classdivnombC}>
            <label
              htmlFor="inputNameC"
              className="form-label"
              id="lblinputNameC">
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
              required></textarea>
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
              required></textarea>
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
          <div className="col-md-auto">
            <button
              id="btnenviar"
              type="submit"
              className="p-3 m-3 btn btn-primary fw-bolder"
              onClick={(e) => validarbtnSubmit(e)}
              disabled={dehabilSubmit}>
              Guardar Registro
            </button>
          </div>
          <div className="col-md-auto">
            <Link
              to={"/"}
              id="btnenviar"
              type="buttom"
              className="p-3 m-3 btn btn-danger fw-bolder float-start"
              onClick={() => CerrarSession()}>
              Salir
            </Link>
          </div>
          <div className="col-md-auto">
            <button
              id="btnNewForm"
              type="buttom"
              onClick={() => window.location.reload()}
              className="p-3 m-3 btn btn-danger fw-bolder float-start">
              Formulario Nuevo
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompFormpres;
