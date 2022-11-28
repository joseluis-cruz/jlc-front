export {MUsuario}

class MUsuario {

    public id: number=0;
    public nombre: string="";
    public email: string="";
    public avatar: string="";

    public borra () : void
    {
        this.id = 0;
        this.nombre = "";
        this.email = "";
        this.avatar = "";
    }

}