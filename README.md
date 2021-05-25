<div align="center" id="short-description">

Simples aplicação para gerenciar ferramentas.

</div>

<div align="center" id="badges">

[![Actions Build](https://img.shields.io/github/workflow/status/JorgeLNJunior/bossabox-challenge/Node.js%20CI/master)](https://github.com/JorgeLNJunior/bossabox-challenge/actions?query=workflow%3A%22Node.js+CI%22)
[![Coverage Status](https://coveralls.io/repos/github/JorgeLNJunior/bossabox-challenge/badge.svg?branch=master)](https://coveralls.io/github/JorgeLNJunior/bossabox-challenge?branch=master)
[![License](https://img.shields.io/github/license/JorgeLNJunior/bossabox-challenge)](https://github.com/JorgeLNJunior/bossabox-challenge/blob/master/LICENSE.md)
[![Release](https://img.shields.io/github/v/release/JorgeLNJunior/bossabox-challenge?color=lgreen)](https://github.com/JorgeLNJunior/bossabox-challenge/releases)

</div>

<div align="center">

[**Challenge »**](https://www.notion.so/Back-end-0b2c45f1a00e4a849eefe3b1d57f23c6)

</div>

## Tabela de Conteúdos
* [Rotas](https://github.com/JorgeLNJunior/bossabox-challenge#rotas)
* [Tecnologias](https://github.com/JorgeLNJunior/bossabox-challenge#tecnologias)
* [Instalação e configuração](https://github.com/JorgeLNJunior/bossabox-challenge#instala%C3%A7%C3%A3o-e-configura%C3%A7%C3%A3o)
  * [Requisitos](https://github.com/JorgeLNJunior/bossabox-challenge#requisitos)
  * [Opcional](https://github.com/JorgeLNJunior/bossabox-challenge#requisitos)
  * [Instalação](https://github.com/JorgeLNJunior/bossabox-challenge#instala%C3%A7%C3%A3o)
* [Licença](https://github.com/JorgeLNJunior/bossabox-challenge#licen%C3%A7a)

## Rotas

Informações básicas sobre as rotas da aplicação.
| HTTP   | Rota                | Descrição                           | Autenticação |
|--------|---------------------|-------------------------------------|--------------|
| GET    | /register           | registra um usuário                 | não          |
| GET    | /login              | autentica um usuário                | não          |
| GET    | /users              | retorna todos os usuários           | sim          |
| POST   | /tools              | cria uma nova ferramentas           | sim          |
| GET    | /tools              | retorna todas os ferramentas        | sim          |
| DELETE | /tools              | deleta uma ferramenta ferramentas   | sim          |
| GET    | /docs               | documentação da API                 | não          |

## Tecnologias
Este projeto foi construído com as seguintes tecnologias:
- [Node.js »](https://nodejs.org)
- [Nest.js »](https://docs.nestjs.com)
- [Typescript »](https://www.typescriptlang.org)
- [Jest »](https://jestjs.io)
- [GitHub Actions »](https://github.com/features/actions)
- [Swagger »](https://swagger.io)
- [TypeORM »](https://typeorm.io)

## Instalação e configuração
### Requisitos
  - [Node.js »](https://nodejs.org/en/download) na sua versão lts
  - Um Banco de dados [Mongo »](https://www.mongodb.com)

### Instalação
  1. Clone o projeto: `git clone https://github.com/JorgeLNJunior/bossabox-challenge.git`
  2. Instale as dependências: `npm i`
  3. Renomeie o arquivo `.env.example` para `.env`
  4. Para iniciar a aplicação execute `npm start:dev` ou `npm run docker:up`. Para os testes execute `npm test:e2e`

## Licença
Projeto sob a licença [MIT »](https://github.com/JorgeLNJunior/bossabox-challenge/blob/master/LICENSE.md)
