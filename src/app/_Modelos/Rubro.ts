import {TipoDoc} from './TipoDoc';

export class Rubro {
    rubroDefinicion: RubroDefinicion[];
    tipoDoc: TipoDoc[];
}
export class  RubroDefinicion {
    RubroId: number;
    Rubro: number;
    DescripcionCorta: String;
    DescripcionLarga: String;
    Imagen: String;
    Orden: number;
}


