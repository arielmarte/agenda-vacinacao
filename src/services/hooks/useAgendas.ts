import { useQuery } from "react-query";
import { api } from "../api";

type Agenda = {
  id?: number;
  data: Date;
  hora: string;
  situacao: string;
  data_situacao?: string;
  observacoes?: string;
}

type GetAgendaResponse = {
  agendas: Agenda[];
}

type CreateAgendaResponse = {
  agenda: Agenda;
}

export async function getAgendas(): Promise<GetAgendaResponse> {
  const { data } = await api.get('agendas')

  const agendas = data.map((agenda: Agenda) => {
    return {
      id: agenda.id,
      data: agenda.data,
      hora: agenda.hora,
      situacao: agenda.situacao,
      data_situacao: agenda.data_situacao,
      observacoes: agenda.observacoes
    };
  });
  console.log(agendas);
  return {
    agendas
  }
}


export function useAgendas() {
  return useQuery('agendas', getAgendas, {
  })
}

export async function useCreateAgenda(agenda: Agenda): Promise<CreateAgendaResponse> {
  const { data } = await api.post('/agendas', agenda);

  return {
    agenda: data
  };
}

export async function deleteAgenda(id: number) {
  await api.delete(`agendas/${id}`);
}