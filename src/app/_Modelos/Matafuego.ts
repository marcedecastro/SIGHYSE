export class Matafuego {
    LegajoId: number;
    RubroId: number;
    Tipodoc: number;
    Tipo: TipoMatafuego;
    Carga: CargaMatafuego;
    NroSerie: string;
    InventarioMTEySS: string;
    InventarioSeguridad: string;
    InventarioOtro: string;
    Piso: string;
    Puesto: string;
    MatafuegoEstado: number;
    Presion: PresionMatafuego;
    FechaFabricacion;
    FechaPruebaHidraulica;
    FechaRecarga;
    FechaVencimiento;
    FechaRelevamiento;
    IntervinoNombre: string;
    IntervinoDNI: number;
    IntervinoCUIL: number;
    Notas: string;


}

export class TipoMatafuego {
    Tipo: number;
    Descripcion: string;
    Nota: string;
}

export class CargaMatafuego {
    Carga: number;
    Descripcion: string;
    Nota: string;
}

export class PresionMatafuego {
    Presion: number;
    Ddescripcion: string;
    Nota: string;
}
