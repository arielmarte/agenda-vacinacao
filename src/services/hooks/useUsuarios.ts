import Alergias from "@/pages/alergias";
import { useQuery } from "react-query";
import { api } from "../api";

type Alergia = {
  id?: number;
  nome?: string;
}

type Usuario = {
  id?: number;
  nome: string;
  dataNascimento: string;
  sexo: string;
  logradouro: string;
  numeroLogradouro: number;
  setor: string;
  cidade: string;
  uf: string;
  idsAlergias?: number[];
  alergias?: Alergia[];
}

type GetUsuarioResponse = {
  usuarios: Usuario[];
}

type CreateUsuarioResponse = {
  usuario: Usuario;
}

export async function getUsuarios(): Promise<GetUsuarioResponse> {
  const { data } = await api.get('usuarios')
console.log(data)

  const usuarios = data.map((usuario: Usuario) => {
    return {
      id: usuario.id,
      nome: usuario.nome,
      dataNascimento: usuario.dataNascimento,
      sexo: usuario.sexo,
      logradouro: usuario.logradouro? usuario.logradouro : '',
      numeroLogradouro: usuario.numeroLogradouro? usuario.numeroLogradouro : '',
      setor: usuario.setor? usuario.setor : '',
      cidade: usuario.cidade? usuario.cidade : '',
      uf: usuario.uf? usuario.uf : '',
      alergias: usuario.alergias
    };
  });
  console.log(usuarios);
  return {
    usuarios
  }
}


export function useUsuarios() {
  return useQuery('usuarios', getUsuarios, {
  })
}

export async function useCreateUsuario(usuario: Usuario): Promise<CreateUsuarioResponse> {
  console.log(usuario)
  usuario.alergias = []
  usuario.idsAlergias?(
  usuario.idsAlergias!.forEach(a => {
    usuario.alergias!.push({"id": a})
  })) : (usuario.alergias = [])

console.log(usuario)

  const { data } = await api.post('/usuarios', usuario);

  return {
    usuario: data
  };
}

export async function deleteUsuario(id: number) {
  await api.delete(`usuarios/${id}`);
}