import { useQuery } from "react-query";
import { api } from "../api";

type Alergia = {
  id?: number;
  titulo: string;
  descricao?: string;
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
      titulo: alergia.titulo,
      descricao: alergia.descricao,
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

export async function useCreateAlergia(alergia: Alergia): Promise<CreateAlergiaResponse> {
  const { data } = await api.post('/alergias', alergia);

  return {
    alergia: data
  };
}

export async function deleteAlergia(id: number) {
  await api.delete(`alergias/${id}`);
}