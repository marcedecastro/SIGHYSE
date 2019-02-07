export function getColumnasSaltos(saltos): string[] {
    let titulos: string[];
    titulos = [];
    for (let i = 0; i < saltos.length; i++) {
      titulos.push(saltos[i].Lista);
    }
    return titulos;
  }

 export function getTitulos( objeto: any, titulos: string[], titulosSaltos: any): any {
    const xTitulos = [];
    const xCampos = [];
    const xxTitulos = Object.entries(titulos);
    const xxCampos = Object.entries(objeto);
    let indiceCampo: number;
    let campos = [];

    campos = Object.keys(objeto);

    for (let i = 0; i < xxTitulos.length; i++) {
      indiceCampo = campos.indexOf(xxTitulos[i][0]);
        if ( indiceCampo >= 0 && ! Array.isArray(xxCampos[indiceCampo][1]))  {
          xTitulos.push(xxTitulos[i][1]);
          xCampos.push({'nombre': campos[indiceCampo],
          'detalle': titulosSaltos.filter(x => x.Columna === campos[indiceCampo])});
        }
      }

    return  {'titulos': xTitulos, 'campos': xCampos};

  }
  