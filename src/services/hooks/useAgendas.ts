import { useQuery } from "react-query";
import { api } from "../api";

type Agenda = {
  id?: number;
  data: string;
  hora: string;
  
  // {
  //   hour: number;
  //   minute: number;
  //   second: number;
  //   nano: number;
  // };
  situacao: string;
  dataSituacao: string;
  numeroDose: number;
  observacoes?: string;
  usuario: {
    id: number;
    nome: string;
    dataNascimento: string;
    sexo: string;
    logradouro: string;
    numeroLogradouro: number;
    setor: string;
    cidade: string;
    uf: string;
    alergia: {
      id: number;
      nome: string;
    };
  };
  vacina: {
    id: number;
    titulo: string;
    descricao: string;
    doses: number;
    periodicidade: string;
    intervalo: number;
  };
}

type GetAgendaResponse = {
  agendas: Agenda[];
};

type CreateAgendaResponse = {
  agenda: Agenda;
};

export async function getAgendas(): Promise<GetAgendaResponse> {
  const { data } = await api.get("agendas");

  return {
    agendas: data,
  };
}

export function useAgendas() {
  return useQuery("agendas", getAgendas);
}

export async function useCreateAgenda(agenda: Agenda): Promise<CreateAgendaResponse> {
  const { data } = await api.post("/agendas", agenda);

  return {
    agenda: data,
  };
}

export async function deleteAgenda(id: number) {
  await api.delete(`agendas/${id}`);
}
