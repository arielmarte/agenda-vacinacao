export function converterTemperatura(temp?: string): string {
    if (temp === undefined) {
      return "Temperatura não informada";
    }

    const temp2 = temp + ''
    const tempComVirgula = temp2.replace(".", ",");
    return `${tempComVirgula} ºC`;
  }
  
 export function converterUmidade(umidade?: string): string {
    if (umidade === undefined) {
      return "Umidade não informada";
    }
    const umidade2 = umidade + ''
    const umidadeComVirgula = umidade2.replace(".", ",");
    return `${umidadeComVirgula} %`;
  }