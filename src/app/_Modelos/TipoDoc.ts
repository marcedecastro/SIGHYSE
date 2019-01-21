
import {Documento} from './Documento';

export class TipoDoc {
    LegajoId: number|undefined;
    RubroId: number|undefined;
    TipoDoc: number|undefined;
    TipoDocDefinicion: TipoDocDefinicion[];
    Documentos: Documento[];
}

export class TipoDocDefinicion {
    RubroId: number|undefined;
    Rubro: number|undefined;
    RubroDescripcion: string;
    TipoDoc: number|undefined;
    TipoDocDescripcion: String|undefined;
    TipoDocDescripcionLarga: String|undefined;
    Form: number;
    FormDescripcion: string;
    Periodicidad: number;
    PeriodicidadDescripcion: string;
    FormCampos: number|undefined;
    FormCamposDescripcion: string;
    CantVigente: number|undefined;
    Nota: string;
    Descripcion: String;
    DescripcionLarga: String;
}






