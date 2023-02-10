import { useQuery } from "react-query";
import { api } from "../api";

type Alergia = {
  id?: number;
  nome: string;
}

type GetAlergiaResponse = {
  alergias: Alergia[];
}

type CreateAlergiaResponse = {
  alergia: Alergia;
}

export async function getAlergias(): Promise<GetAlergiaResponse> {
  const { data } = await api.get('alergias')

  const alergias = data.map((alergia: Alergia) => {
    return {
      id: alergia.id,
      nome: alergia.nome,
    };
  });
  console.log(alergias);
  return {
    alergias
  }
}


export function useAlergias() {
  return useQuery('alergias', getAlergias, {
  })
}

export async function useCreateAlergia(alergia: Alergia) {
  await api.post('/alergias', alergia);
}

export async function deleteAlergia(id: number) {
  await api.delete(`alergias/${id}`);

}
