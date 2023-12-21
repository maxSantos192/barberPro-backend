# Barber Pro

## Visão geral
Backend desenvolvido com node.js, para comunicação com banco de dados PostgreSQL.

## Tecnologias usadas
prisma, express, express-async-errors, bcryptjs, cors, jsonwebtoken.

## Instalação
1. Clone o repositório para sua máquina local.
2. Acesse a pasta do projeto e instale as dependêcias.
```
cd barberPro-backend
yarn add
```
3. Configure as variáveis de ambiente.

    1. **DATABASE_URL:** Url banco de dados para uso do prisma.

    2. **JWT_SECRET:** JSON web token

4. Inicie o servidor local da aplicação.
```
yarn dev
```
Use http://localhost:3333 para visualizar a aplicação.