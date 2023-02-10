import { useQuery } from "react-query";
import { api } from "../api";

type Usuario = {
  id?: number;
  nome: string;
  dataNascimento: string;
  sexo: string;
  logradouro: string;
  numero: number;
  setor: string;
  cidade: string;
  uf: string;
}

type GetUsuarioResponse = {
  usuarios: Usuario[];
}

type CreateUsuarioResponse = {
  usuario: Usuario;
}

export async function getUsuarios(): Promise<GetUsuarioResponse> {
  const { data } = await api.get('usuarios')

  const usuarios = data.map((usuario: Usuario) => {
    return {
      id: usuario.id,
      nome: usuario.nome,
      dataNascimento: usuario.dataNascimento,
      sexo: usuario.sexo,
      logradouro: usuario.logradouro,
      numero: usuario.numero,
      setor: usuario.setor,
      cidade: usuario.cidade,
      uf: usuario.uf
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
  const { data } = await api.post('/usuarios', usuario);

  return {
    usuario: data
  };
}

export async function deleteUsuario(id: number) {
  await api.delete(`usuarios/${id}`);
}