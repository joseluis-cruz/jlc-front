import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';
import { Entorno } from "../../utils/Entorno";
import { useState, useEffect } from "react";
import { CLogout } from "./CLogout";
import { Button } from "react-bootstrap";
//import { refreshTokenSetup } from '../utils/refreshToken';

export { CLogin }

export const LOGIN_STA_NOT_LOGGED = 'not-logged';
export const LOGIN_STA_REGISTERING = 'registering';
export const LOGIN_STA_LOGGED_IN = 'logged-in';
export const LOGIN_STA_UNREGISTERING = 'unregistering';
export const LOGIN_STA_LOGIN_ERROR = 'login-error';
export const LOGIN_API_TIMEOUT = 3000;

const google_img = new URL("../../media/img/common/logo-google.png",import.meta.url);

interface LoginProps {
    readonly onLoginStatusChange?: (status: string) => void;
}

function CLogin (props: LoginProps)
{
    var loginStatusSync = LOGIN_STA_NOT_LOGGED;
    const [loginStatus,setLoginStatus] = useState(loginStatusSync);

    function setLoginStatusSync(newStatus: string) {
        loginStatusSync = newStatus;
        setLoginStatus(newStatus);
    }

    useEffect (() => {
        function start()
        {
          gapi.auth2.init ({clientId: Entorno.GOOGLE_CLIENT_ID, scope: ""}) //client
        }
        gapi.load('client:auth2',start);
    });

    useEffect (() => {
        if (props.onLoginStatusChange) { props.onLoginStatusChange(loginStatus); }
    },[props,loginStatus]);    
    
    const onLoginSuccess = (res: any) => {
        //      refreshTokenSetup(res);        
        setTimeout(onTimeOutApiLogin,LOGIN_API_TIMEOUT);
        var accessToken = gapi.auth.getToken().access_token;
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({token: accessToken})
        };
        fetch (Entorno.API_URL+'login_google_token', requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.status==="ok")
                {
                    Entorno.usuario.id = response.data.user.id;
                    Entorno.usuario.nombre = response.data.user.name;
                    Entorno.usuario.email = response.data.user.email;
                    Entorno.usuario.avatar = response.data.picture;
                    Entorno.api_key = response.data.api_key;
                    setLoginStatusSync(LOGIN_STA_LOGGED_IN);
                }
            })
            .catch(() => {
                onTimeOutApiLogin();
            });
    }

    const onLoginFailure = (res: any) => {
        Entorno.usuario.borra();
        setLoginStatusSync(LOGIN_STA_LOGIN_ERROR);
    }

    const onTimeOutApiLogin = () => {
        if ((loginStatusSync===LOGIN_STA_REGISTERING)||
            (loginStatusSync===LOGIN_STA_UNREGISTERING))
        {
            if (loginStatusSync===LOGIN_STA_REGISTERING)
            {
                gapi.auth2.getAuthInstance().signOut();
            }
            setLoginStatusSync(LOGIN_STA_NOT_LOGGED);
        }
    }

    const onLogoutSuccess = () => {
        Entorno.usuario.borra();
        setLoginStatusSync(LOGIN_STA_UNREGISTERING);
        setTimeout(onTimeOutApiLogin,LOGIN_API_TIMEOUT);
        const requestOptions = {
            method: "POST",
            headers: { 'Content-Type' : 'application/json' },
            body: JSON.stringify({api_key: Entorno.api_key})
        };
        fetch (Entorno.API_URL+'logout', requestOptions)
            .then(response => response.json())
            .then(response => {
                if (response.status==="ok")
                {
                    setLoginStatusSync(LOGIN_STA_NOT_LOGGED);
                }
            })
            .catch(() => {
                onTimeOutApiLogin();
            });    }
    
    switch (loginStatus)
    {
        case LOGIN_STA_REGISTERING: {
            return (
                <div id="loginArea" className="flxcol flxalc">
                    <p className="msg">Esperando autenticación...</p>
                </div>
            );            
        }
        case LOGIN_STA_LOGGED_IN: {
            return (
                <div id="loginArea" className="flxcol flxalc">
                    <img className="imgrnd" src={Entorno.usuario.avatar} alt={Entorno.usuario.nombre} crossOrigin="anonymous" />
                    <p className="msg">Hola {Entorno.usuario.nombre}</p>
                    <CLogout onLogoutSuccess={onLogoutSuccess} />
                </div>
            );
        }
        case LOGIN_STA_UNREGISTERING: {
            return (
                <div id="loginArea" className="flxcol flxalc">
                    <p className="msg">Esperando cierre...</p>
                </div>
            );
        }
        default: {
            return (
                <div id="loginArea" className="flxcol flxalc">                    
                    <GoogleLogin
                    clientId={Entorno.GOOGLE_CLIENT_ID}
                    render = { renderProps => (
                        <Button
                            className="flxrow flxalc"
                            variant="outline-primary"
                            onClick={() => {
                                setLoginStatusSync(LOGIN_STA_REGISTERING);
                                renderProps.onClick();
                            }}
                            disabled={renderProps.disabled} size="lg">
                            <img src={google_img.toString()} alt="Google logo" className="imgbtn"/>
                            <strong>Identif&iacute;cate con Google</strong>
                        </Button>
                    )}
                    onSuccess={onLoginSuccess}
                    onFailure={onLoginFailure}
                    cookiePolicy={'single_host_origin'} 
                    isSignedIn={true}
                    />            
                </div>
            );            
        }
    }
}