import { useQuery } from "react-query";
import { api } from "../api";

type Usuario = {
  usuario: string;
  senha: string;
}

type UsuarioLoginResponse = {
  auth: AuthResponse;
  
}

type AuthResponse = {
  token: string;
  funcionalidade: string;
}

export async function useLogin(usuario: Usuario): Promise<UsuarioLoginResponse> {
  console.log(usuario)
  const { data } = await api.post('/login', usuario);

  return { auth: data} ;
}


export async function getSessao(auth: AuthResponse | null): Promise<UsuarioLoginResponse> {
  console.log(auth);
  const url = '/login/sessao'

  const { data } = await api.get(encodeURI(url), { 

    headers: {
        token: auth!.token,
      },
  });
  console.log(data);
  return {auth: data};
}

export function useSessao(auth: AuthResponse | null) {
  return useQuery("sessao", () => getSessao(auth) );
}