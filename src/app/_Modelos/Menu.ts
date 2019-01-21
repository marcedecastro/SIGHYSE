export class Menu {
    MenuItem: String ;
    Nivel: number;
    Datos: MenuDatos[];
    Hijos: Menu[];
  }

  export class MenuDatos {
    Nombre: String;
    Descripcion: String;
    Tipo: number;
    TipoDescripcion: String;
    Accion: String;
    AccionOpcion: String;
  }
