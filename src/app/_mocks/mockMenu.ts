import { Menu } from '../_Modelos/Menu';

export const MENUS: Menu[] = [
    {"MenuItem":"Inicio","Nivel":1,"Datos":[{"Nombre":"Inicio","Descripcion":"Menú de inicio del sistema","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]}
     
,
    {"MenuItem":"Legajo","Nivel":1,"Datos":[{"Nombre":"Legajo Técnico","Descripcion":"Legajo Técnico de Edificios","Tipo":1,"TipoDescripcion":"Titulo","Accion":"","AccionOpcion":""}],"Hijos":[
        {"MenuItem":"LegajoConsulta","Nivel":2,"Datos":[{"Nombre":"Consulta de Legajos","Descripcion":"Consulta del Legajo Técnico de edificios","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]},
        {"MenuItem":"LegajoActualizacion","Nivel":2,"Datos":[{"Nombre":"Act. de Legajos","Descripcion":"Actualización de Legajos Técnicos. Incorporación de documentos","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":"legajo"}],"Hijos":[]}]},
    {"MenuItem":"Informes","Nivel":1,"Datos":[{"Nombre":"Informes","Descripcion":"Informes y Alertas","Tipo":1,"TipoDescripcion":"Titulo","Accion":"","AccionOpcion":""}],"Hijos":[
        {"MenuItem":"InfoLegajo","Nivel":2,"Datos":[{"Nombre":"Legajo técnico","Descripcion":"Informes de Legajo Técnico de Edificios","Tipo":1,"TipoDescripcion":"Titulo","Accion":"","AccionOpcion":""}],"Hijos":[
            {"MenuItem":"InfoLegajoVence","Nivel":3,"Datos":[{"Nombre":"Elementos a vencer","Descripcion":"Elementos a vencer de Legajos Técnicos","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]},
            {"MenuItem":"InfoLegajoVencio","Nivel":3,"Datos":[{"Nombre":"Elementos vencidos","Descripcion":"Elementos vencidos de Legajos Técnicos","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]},
            {"MenuItem":"InfoLegajoFaltante","Nivel":3,"Datos":[{"Nombre":"Elementos faltantes","Descripcion":"Elementos faltantes en ítems de Legajos Técnicos","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]}]},
        {"MenuItem":"Matafuegos","Nivel":2,"Datos":[{"Nombre":"Matafuegos","Descripcion":"Estado de Matafuegos","Tipo":1,"TipoDescripcion":"Titulo","Accion":"","AccionOpcion":""}],"Hijos":[
            {"MenuItem":"MatafuegosVence","Nivel":3,"Datos":[{"Nombre":"Matafuegos a vencer","Descripcion":"Matafuegos a Vencer","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]},
            {"MenuItem":"MatafuegosVencio","Nivel":3,"Datos":[{"Nombre":"Matafuegos vencidos","Descripcion":"Matafuegos Vencidos","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]}]}]},
    {"MenuItem":"Administracion","Nivel":1,"Datos":[{"Nombre":"Administración","Descripcion":"Administración del sistema","Tipo":1,"TipoDescripcion":"Titulo","Accion":"","AccionOpcion":""}],"Hijos":[
        {"MenuItem":"Edificios","Nivel":2,"Datos":[{"Nombre":"Edificios","Descripcion":"Actualización de datos de Edificios. Alta de Legajo Técnico","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":"edificios"}],"Hijos":[]},
        {"MenuItem":"AdminLegajo","Nivel":2,"Datos":[{"Nombre":"Legajos Técnicos","Descripcion":"Definiciones del Legajo Técnico","Tipo":1,"TipoDescripcion":"Titulo","Accion":"","AccionOpcion":""}],"Hijos":[
            {"MenuItem":"Rubros","Nivel":3,"Datos":[{"Nombre":"Rubros","Descripcion":"Definición de capítulos del Legajo Técnico","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]},
            {"MenuItem":"TipoDocs","Nivel":3,"Datos":[{"Nombre":"Tipos de Documentos","Descripcion":"Tipos de Documentos admitidos por capitulo","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]}]},
        {"MenuItem":"AdminUsuarios","Nivel":2,"Datos":[{"Nombre":"Usuarios","Descripcion":"Administración de Usuarios","Tipo":1,"TipoDescripcion":"Titulo","Accion":"","AccionOpcion":""}],"Hijos":[
            {"MenuItem":"Usuarios","Nivel":3,"Datos":[{"Nombre":"Datos de Usuarios","Descripcion":"Datos de contacto del usuario. Horarios. Ubicación. Estado.Edificio por defecto","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]},
            {"MenuItem":"UsuariosAmbitos","Nivel":3,"Datos":[{"Nombre":"Ámbito de Usuarios","Descripcion":"Que edificios ven y actualizan los usuarios","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]},
            {"MenuItem":"UsuariosRoles","Nivel":3,"Datos":[{"Nombre":"Roles de Acceso","Descripcion":"Asignación de los roles de accesos por usuario","Tipo":2,"TipoDescripcion":"Opcion","Accion":"","AccionOpcion":""}],"Hijos":[]}]}]}

        ]