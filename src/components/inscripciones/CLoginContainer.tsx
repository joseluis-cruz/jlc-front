import { useState, useEffect } from "react";
import { Entorno } from "../../utils/Entorno";
import { Sistema } from "../../utils/Sistema";
import {
    CLogin,
    LOGIN_STA_NOT_LOGGED,
    LOGIN_STA_UNREGISTERING,
    LOGIN_STA_REGISTERING,
    LOGIN_STA_LOGGED_IN,
    LOGIN_STA_LOGIN_ERROR,
} from "../common/CLogin";
//import "../../css/inscripciones/CLoginContainer.css";

export {CLoginContainer, COMPONENT_ID, CLoginReset}

interface ImgArrayInterface { [status: string]: string; }

// Constantes del componente
// - común a todos los componentes
const COMPONENT_ID = "login-container";
    
const STATUS_SELECTING_METHOD = 'selecting-method';
const STATUS_IN_PROGRESS = 'in-progress';
const STATUS_WELCOME_USER = "welcome-user";
const STATUS_BYE_BYE_USER = "bye-bye-user";
const STATUS_LOGIN_ERROR = "login-error";

var media: ImgArrayInterface;

media = {
    STATUS_SELECTING_METHOD: new URL("../../media/img/inscripciones/bg-login-container-status-selecting-method.jpg",import.meta.url).href,
    STATUS_IN_PROGRESS: new URL("../../media/img/inscripciones/bg-login-container-status-in-progress.jpg",import.meta.url).href,
    STATUS_WELCOME_USER: new URL("../../media/img/inscripciones/bg-login-container-status-welcome-user.jpg",import.meta.url).href,
    STATUS_BYE_BYE_USER: new URL("../../media/img/inscripciones/bg-login-container-status-bye-bye-user.jpg",import.meta.url).href,
    STATUS_LOGIN_ERROR: new URL("../../media/img/inscripciones/bg-login-container-status-login-error.jpg",import.meta.url).href
}

// Restablecer estados
function CLoginReset () {
    // - común a todos los componentes
    Entorno.del(COMPONENT_ID + '-cmpStatus');
    // - personalizable para este componente
    Entorno.del(COMPONENT_ID + '-loginStatus');
}

function CLoginContainer ()
{
    const commonContainerClasses = "flxrow flxgr1 container-main";

    // Asignar background según estado
    // - común a todos los componentes
    function getCmpBGImg():string {
        return media[Sistema.validAttributeName(cmpStatus,"STATUS")];
    }

    // Inicialización de estados
    // - común a todos los componentes
    var cmpStatus = Entorno.get(COMPONENT_ID + '-cmpStatus', STATUS_SELECTING_METHOD);
    const [containerClassesAsync,setContainerClassesAsync] = useState(getContainerCurrentClasses());
    // - personalizable para este componente
    var loginStatus = Entorno.get(COMPONENT_ID + '-loginStatus', LOGIN_STA_NOT_LOGGED);


    // Guardar estado síncrono para futuros renders
    function saveCurrentStatus() {
        // - común a todos los componentes
        Entorno.set(COMPONENT_ID + '-cmpStatus', cmpStatus);
        // - personalizable para este componente
        Entorno.set(COMPONENT_ID + '-loginStatus', loginStatus);
    }
    
    // Inicializar Hook y gestionar cambio de estado
    // - común a todos los componentes
    const [cmpStatusAsync,setCmpStatusAsync] = useState(cmpStatus);
    function setCmpStatus (newStatus:string) {
        cmpStatus = newStatus;
        saveCurrentStatus();
        setCmpStatusAsync(cmpStatus);
        setContainerClassesAsync(getContainerCurrentClasses);
    }
    useEffect(()=>{ },[cmpStatusAsync]);

    // obtener las clases que deberían aplicarse a este contenedor
    // - personalizable para este componente
    function getContainerCurrentClasses():string {
        var classes = commonContainerClasses + " " + COMPONENT_ID + "-default " + COMPONENT_ID + "-status-" + cmpStatus;
        return classes;
    }

    // Gestionar cambio de estado del subcomponente SCcLogin
    function onLoginStatusChange(newStatus: string) : void {
        if (loginStatus!==newStatus)
        {
            switch (newStatus) {
                case LOGIN_STA_NOT_LOGGED: { 
                    if (loginStatus===LOGIN_STA_UNREGISTERING) {
                        setCmpStatus(STATUS_BYE_BYE_USER);
                        setTimeout(()=>{setCmpStatus(STATUS_SELECTING_METHOD)},3000);
                    }
                    else {
                        setCmpStatus(STATUS_SELECTING_METHOD);
                    }
                    break; 
                }
                case LOGIN_STA_REGISTERING: { setCmpStatus(STATUS_IN_PROGRESS); break; }
                case LOGIN_STA_UNREGISTERING: { setCmpStatus(STATUS_BYE_BYE_USER); break; }
                case LOGIN_STA_LOGGED_IN: { setCmpStatus(STATUS_WELCOME_USER); break; }
                case LOGIN_STA_LOGIN_ERROR: { setCmpStatus(STATUS_LOGIN_ERROR); break; }
            }
        }
        loginStatus = newStatus;
        saveCurrentStatus();        
    }    
    saveCurrentStatus();    
    return (
        <div id="loginContainer"
            className={containerClassesAsync}          
            style={{ backgroundImage: 'url("' + getCmpBGImg() + '")' }} 
            >
            <div id="loginControls" className="flxcol flxspa bkgtrl pd1e container-left">
                <CLogin onLoginStatusChange={onLoginStatusChange} />
            </div>
            <div className="flxgr1">
                &nbsp;
            </div>
        </div>
    );
}