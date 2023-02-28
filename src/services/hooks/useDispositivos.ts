import { useQuery } from "react-query";
import { api } from "../api";
import { convertDateToStr } from "../../util/Date"

type Dispositivo = {
  nomeDispositivo: string;
  tipoDispositivo: number;
  localizacao?: string;
  estado?: boolean;
  valor?: string;
  dataHoraLeitura?: string;
};

type Localizacao = {
  localizacao: string;
  dispositivos: Dispositivo[];
};

type Dado = {
  valor: string;
  dataHoraLeitura: string;
}

type AuthResponse = {
    token: string;
    funcionalidade: string;
  }

export type GetDispositivosResponse = Localizacao[];

export type GetDadosSensor = Dado[];
export type GetDadoSensor = Dispositivo;

export async function getDispositivos(auth: AuthResponse | null): Promise<GetDispositivosResponse> {
    console.log(auth);
  const { data } = await api.get("dispositivos", { 
    headers: {
        token: auth!.token,
        funcionalidade: 'home'
      },
   });
console.log(data);
  return data;
}

export async function getDados(localizacao : string, nomeDispositivo: string, dataParam: string | null, tipoDispositivo: number, auth: AuthResponse | null): Promise<GetDadosSensor> {
  console.log(auth);
  const url = `dispositivos/${localizacao}/${nomeDispositivo}/leituras` + (dataParam ? `?data=${dataParam}` : '')

  const { data } = await api.get(encodeURI(url), { 

    headers: {
        token: auth!.token,
        funcionalidade: `sensor|${localizacao}|${nomeDispositivo}|${tipoDispositivo}`
      },
  });
  console.log(data);
  return data;
}

export async function getDado(localizacao : string, nomeDispositivo: string, tipoDispositivo: number, auth: AuthResponse | null): Promise<GetDadoSensor> {
  console.log(auth);
  const url = `dispositivos/${localizacao}/${nomeDispositivo}/${tipoDispositivo}`

  const { data } = await api.get(encodeURI(url), { 

    headers: {
        token: auth!.token,
        funcionalidade: `${tipoDispositivo === 1 ? 'atuador' : 'sensor'}|${localizacao}|${nomeDispositivo}|${tipoDispositivo}`
      },
  });
  console.log(data);
  return data;
}

export function useDados(localizacao : string, nomeDispositivo: string, dataParam: Date | null, tipoDispositivo: number, auth: AuthResponse | null) {
  return useQuery("dados", () => getDados(localizacao, nomeDispositivo, dataParam ? convertDateToStr(dataParam) : null, tipoDispositivo, auth));
}

export function useDado(localizacao : string, nomeDispositivo: string, tipoDispositivo: number, auth: AuthResponse | null) {
  return useQuery("dado", () => getDado(localizacao, nomeDispositivo, tipoDispositivo, auth));
}

export function useDispositivos(auth: AuthResponse | null) {
  return useQuery("dispositivos", () => getDispositivos(auth) );
}


export async function useLed(dispositivo: Dispositivo, auth: AuthResponse | null): Promise<GetDadoSensor> {
  const { data } = await api.post('/dispositivos', dispositivo, { 

    headers: {
        token: auth!.token,
        funcionalidade: `atuador|${dispositivo.localizacao}|${dispositivo.nomeDispositivo}|${dispositivo.tipoDispositivo}`
      },
  });

  return data ;
}