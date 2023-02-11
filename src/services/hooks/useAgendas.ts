import { useQuery } from "react-query";
import { api } from "../api";

type Agenda = {
  id?: number;
  data: string;
  hora: string;
  situacao?: string;
  dataSituacao?: string;
  numeroDose?: number;
  observacoes?: string;
  idUsuario?: number;
  idVacina?: number;
  usuario?: {
    id: number;
    nome?: string;
    dataNascimento?: string;
    sexo?: string;
    logradouro?: string;
    numeroLogradouro?: number;
    setor?: string;
    cidade?: string;
    uf?: string;
    alergia?: {
      id?: number;
      nome?: string;
    };
  };
  vacina?: {
    id?: number;
    titulo?: string;
    descricao?: string;
    doses?: number;
    periodicidade?: string;
    intervalo?: number;
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

export async function getAgendasHoje(): Promise<GetAgendaResponse> {
  const { data } = await api.get("agendas/atual");

  return {
    agendas: data,
  };
}

export function useAgendasHoje() {
  return useQuery("agendasHoje", getAgendasHoje);
}

export async function getAgendasSituacao(situacao: string): Promise<GetAgendaResponse> {
  const { data } = await api.get(`agendas/${situacao}`);

  return {
    agendas: data,
  };
}

export function useAgendasSituacao(situacao: string) {
  return useQuery("agendas", () => getAgendasSituacao(situacao));
}

export async function getAgendasUsuario(id: number): Promise<GetAgendaResponse> {
  const { data } = await api.get(`agendas/usuarios/${id}`);

  return {
    agendas: data,
  };
}

export function useAgendasUsuario(id: number) {
  return useQuery("agendasUsuario", () => getAgendasUsuario(id));
}


export async function useCreateAgenda(agenda: Agenda): Promise<CreateAgendaResponse> {
  agenda.usuario = {"id": agenda.idUsuario!}
  agenda.vacina = {"id": agenda.idVacina!}
  const { data } = await api.post("/agendas", agenda);

  return {
    agenda: data,
  };
}

export async function deleteAgenda(id: number) {
  await api.delete(`agendas/${id}`);
}

export async function atualizarSituacaoAgenda(id: number, situacao: string) {
  await api.put(`agendas/${id}/${situacao}`);
}

