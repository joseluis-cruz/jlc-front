import { useState } from 'react';
import './App.css';
import { CHeader } from './components/common/CHeader';
import { CHomeContainer } from './components/common/CHomeContainer';

import { CLoginContainer, CLoginReset } from './components/inscripciones/CLoginContainer';
import { Entorno } from './utils/Entorno';

export const APP_STA_ANONYMOUS_HOME = 'ANONYMOUS_HOME';
export const APP_STA_LOGIN_IN_PROCESS = 'LOGIN_IN_PROCESS';
export const APP_STA_USER_HOME = 'USER_HOME';


function App()
{
    const [appStatusAsync,setAppStatusAsync] = useState(APP_STA_ANONYMOUS_HOME);
    var component:any;    

    function performAction (action:string): void {
        if (action==="doLogin") {
            setAppStatusAsync(APP_STA_LOGIN_IN_PROCESS);
        }
    }

    function doMenuOptionSelected (option:string) {
        if (option==="home") {
            if (Entorno.usuario.id>0)
                setAppStatusAsync(APP_STA_USER_HOME);
            else
                setAppStatusAsync(APP_STA_ANONYMOUS_HOME);
        }
        if (option==="login") {
            CLoginReset();
            setAppStatusAsync(APP_STA_LOGIN_IN_PROCESS);            
        }
    }

    switch (appStatusAsync) {
        case APP_STA_LOGIN_IN_PROCESS: { component = <CLoginContainer />; break; }
        //case APP_STA_USER_HOME: { component = <CUserHome />; break; }
        default: { component = <CHomeContainer onSelectAction={performAction}/> }
    }
    return (
        <div className="App flxcol">
            <CHeader onMenuOptionSelected={doMenuOptionSelected}/>
                {component}
            <footer>Pie</footer>
        </div>
    );
}

export default App;