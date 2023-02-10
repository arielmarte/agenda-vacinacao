# Projeto Web - Agenda de Vacinação

Projeto desenvolvido como trabalho final da disciplina de Software para Persistência de Dados, no semestre 2022/2 do curso de Engenharia de Software da Universidade Federal de Goiás, por

* Ariel Marte Araújo Silva (201900264)
* Marco Feitosa Araújo (201905542)

## Descrição do Projeto

Aplicação para agendamento de vacinas, com back-end em Java Spring Boot e front-end em React.

A aplicação permite cadastro, consulta e remoção de usuários, alergias, vacinas e agendamentos. Há opções de listagem completa para todas as tabelas, agendas com opção de listagem por *Canceladas* ou *Realizadas*, listagem de agendas por dia, agendamentos por usuário, e a opção de “dar baixa” em uma agenda (definindo-a como *Realizada* ou *Cancelada*).

## Modelagem de Dados

Todas as tabelas tem um campo para o código de identificação da entrada (*id*), autoincrementável.

A tabela de vacinas engloba nome e descrição, quantidade de doses a serem aplicadas, do intervalo entre cada dose e periodicidade (dias, semanas, meses ou anos) do intervalo.

A tabela de agenda cobre a data e horário agendados para aplicação da vacina, situação do agendamento (*Agendado*, *Cancelado* e *Realizado*), e a data da alteração da situação (para os estados de *Cancelado* e *Realizado*), e observações sobre o agendamento. 
Para vacinas com múltiplas doses, o sistema cadastra automaticamente datas para a aplicação das doses subsequentes com base no agendamento da primeira dose. Para melhor implementar essa regra de negócio, e levando em consideração a possibilidade de cancelamento dos agendamentos das doses futuras, foram criados mais dois campos, com as informações do número da dose e do código de identificação do agendamento da primeira dose.


A tabela de usuário engloba nome, data de nascimento, sexo, endereço (logradouro, número, setor, cidade e UF) e alergias. Foi adicionada uma tabela para retorno do estado a partir do UF.

As alergias são cadastradas somente por nome, e há uma tabela adicional que trata do relacionamento entre alergias e usuários, contendo as *id* de ambos.

## Tecnologias Utilizadas

O back-end da aplicação foi desenvolvido na linguagem [Java](https://www.java.com/pt-BR/), utilizando o framework [Spring Boot](https://spring.io/) para criar um sistema MVC acessível via protocolo REST. O software faz a persistência dos dados em um banco SQL [MariaDB](https://mariadb.org/), via [Spring Data JPA](https://docs.spring.io/spring-data/jpa/docs/current/reference/html/) e mapeamento objeto-relacional [Hibernate](https://hibernate.org/orm/). Apenas a tabela de agenda é criada manualmente, o restante sendo criado automaticamente pelo ORM. A documentação é autogerada através do [APIDOC v3](https://apidocjs.com/).

O front-end foi desenvolvido em [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) utilizando a biblioteca [React](https://reactjs.org/), via framework [Next.js](https://nextjs.org/), e com componentes da coleção [Chakra UI](https://chakra-ui.com/). Os formulários de cadastro usam a biblioteca [React Hook Form](https://react-hook-form.com/) com validação através do construtor de schema [Yup](https://www.npmjs.com/package/yup). O gerenciamento dos dados no front-end é feito usando [React Query](https://react-query-v3.tanstack.com/), e a comunicação com o back-end é executada através da biblioteca [Axios](https://axios-http.com/docs/intro).

## Instruções Para Execução

Para executar a aplicação, é preciso iniciar as componentes separadamente. O back-end é iniciado através de uma IDE, com as dependências Maven atualizadas, executando a aplicação.

Para o front-end, é preciso ter o ambiente de execução NodeJS instalado, e então instalar o gerenciador de pacotes Yarn através do comando 

> npm install –g yarn

Em seguida, use o comando 

> yarn install 

na pasta da aplicação para instalar as dependências do front-end, e por fim execute o comando 

>yarn run 

para iniciá-lo.
