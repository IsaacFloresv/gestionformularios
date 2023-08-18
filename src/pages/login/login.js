import React, { useState } from "react";
import axios from "axios";
import './signin.css';
import Cookies from "universal-cookie";


import { useNavigate } from "react-router-dom";

//URL del API
const URI = 'https://fwmback-production.up.railway.app/user'
const cookies = new Cookies()


function Login() {
  const [ user_id, setUser_id ] = useState('')
  const [ user_pass, setUser_pass ] = useState('')

  const navigate = useNavigate();

  const CargarDatos = (e) => {
    if (e.target != null) {
      if (e.target.id === 'user') {
        setUser_id(e.target.value)
      }
      if (e.target.id === 'pass') {
        setUser_pass(e.target.value)
      }
    }
  }

  const LoginCheck = async (e) => {
    e.preventDefault();
    if(user_id != '' || user_pass != ''){            
      
       let headersList = {
        "Accept": "*/*",
        "Content-Type": "application/json" 
       }
       
       let bodyContent = JSON.stringify({
         "user_id":user_id,
         "user_pass":user_pass
       });

       let reqOptions = {
         url: "https://fwmback-production.up.railway.app/user",
         method: "PUT",
         headers: headersList,
         data: bodyContent,
       }
       
       try{
        let response = await axios.request(reqOptions)
          if(response.statusText != "Forbidden" ){
            const {resp, Agente} = response.data
            cookies.set('token', resp)
            cookies.set('info', Agente)
            navigate('/home')
            //window.location = '/formpres'
          }else{
            alert('El usuario y/o la contraseña no son correctos')
          }
       }catch(error){
        console.log(error)
        alert('El usuario y/o la contraseña no son correctos')
       }
       
      
    }
  }

  return (
    <div className="text-center">
      
      <main className="form-signin">
        <div className="shadow-lg p-2 mb-5 mt-2 bg-body rounded background: transparent">
        <form>
          <img className="mb-4 mt-4 border border-5 rounded-circle" src="logo.png" alt="Reportes Listos" width="160" height="160" />

          <div className="form-floating">
            <input type="text" className="form-control" id="user" name='User_id' placeholder="Usuario" onChange={(e) => CargarDatos(e)} autoComplete="off" />
            <label htmlFor="user">Usuario</label>
          </div>
          <div className="form-floating">
            <input type="password" className="form-control" id="pass" name='User_pass' placeholder="Contraseña" onChange={(e) => CargarDatos(e)} autoComplete="off" />
            <label htmlFor="pass">Contraseña</label>
          </div>

          <button className="w-100 btn btn-lg btn-primary" type="submit" onClick={(e)=>LoginCheck(e)}>Ingresar</button>

        </form>
        </div>
      </main>
      
    </div>
  );
}

export default Login;
