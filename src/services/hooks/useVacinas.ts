import { useQuery } from "react-query";
import { api } from "../api";

type Vacina = {
    id?: number;
    titulo: string;
    descricao?: string;
    doses: number;
    periodicidade?: string;
    intervalo?: number;
}

type GetVacinaResponse = {
  vacinas: Vacina[];
}

type CreateVacinaResponse = {
  vacina: Vacina;
  }

export async function getVacinas(): Promise<GetVacinaResponse> {
  const { data } = await api.get('vacinas')

  const vacinas = data.map((vacina: Vacina) => {
    return {
      id: vacina.id,
      titulo: vacina.titulo,
      descricao: vacina.descricao,
      doses: vacina.doses,
      periodicidade: (vacina.doses ==1? 'Unica' : vacina.periodicidade?.toLowerCase),
      intervalo: (vacina.doses == 1?  '' : vacina.intervalo),
    };
  });
  console.log(vacinas);
  return {
    vacinas
  }
}


export function useVacinas() {
  return useQuery('vacinas', getVacinas, {
  })
}

export async function useCreateVacina(vacina: Vacina): Promise<CreateVacinaResponse> {
  const { data } = await api.post('/vacinas', vacina);
  
  return {
  vacina: data
  };
  }