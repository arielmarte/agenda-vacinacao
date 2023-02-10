import { useQuery } from "react-query";
import { api } from "../api";

type UF = {
  sigla: string;
  nome: string;
}

type GetUFResponse = {
  ufs: UF[];
}

export async function getUfs(): Promise<GetUFResponse> {
  const { data } = await api.get('estados')

  const ufs = data.map((uf: UF) => {
    return {
      sigla: uf.sigla,
      nome: uf.nome,

    };
  });
  console.log(ufs);
  return {
    ufs
  }
}


export function useUfs() {
  return useQuery('ufs', getUfs, {
  })
}


