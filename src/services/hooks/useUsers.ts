// import { useQuery } from "react-query";
// import { api } from "../api";

// type User = {
//   id: string;
//   name: string;
//   email: string;
//   createdAt: string;
// }

// // type GetUsersResponse = {
// //   totalCount: number;
// //   users: User[];
// // }

// export async function getUsers(): Promise<User[]> {
//   const { data, headers } = await api.get('users')

//   const totalCount = Number(headers['x-total-count'])

//   const users =  data.users.map((user: User) => {
//     return {
//       id: user.id,
//       name: user.name,
//       email: user.email,
//       createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
//         day: '2-digit',
//         month: 'long',
//         year: 'numeric'
//       })
//     };
//   });

//   return users;
// }

// export function useUsers() {
//   return useQuery('users', getUsers)
// }

import { useQuery } from "react-query";
import { api } from "../api";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type GetUsersResponse = {
  users: User[];
  tableColumns: string[];
}

export async function getUsers(): Promise<GetUsersResponse> {
  const { data } = await api.get('users')

  const users = data.users.map((user: User) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      })
    };
  });


  return {
    users,
    tableColumns: ['Check', 'Nome', 'Email', 'Criado em']
  }
}


export function useUsers() {
  return useQuery('users', getUsers, {
    staleTime: 1000 * 5, // 5 seconds
  })
}