import { MUsuario } from "../model/common/MUsuario";

export {Entorno} 

declare global {
    interface Window {
        FRONT_BASE_URL: string;
        API_BASE_URL: string;
    }
}

class Entorno
{
    public static readonly FRONT_URL = window.FRONT_BASE_URL;
    public static readonly API_URL = window.API_BASE_URL;
    public static readonly GOOGLE_CLIENT_ID = "968846766717-1vo4re7l1ke5r4192ddk6isac57njk0i.apps.googleusercontent.com";
    public static readonly usuario: MUsuario = new MUsuario();
    public static api_key: string = "";

    public static get(varName: string, defaultValue:string): string {
        let res = localStorage.getItem('_ENV_'+varName);
        if ((res===null)||(res==="")) {
            res = defaultValue;
        }
        return res;
    }

    public static set(varName: string, varValue: string): void {
        localStorage.setItem('_ENV_'+varName, varValue);
    }

    public static del(varName: string): void {
        localStorage.removeItem('_ENV_'+varName);
    }

}