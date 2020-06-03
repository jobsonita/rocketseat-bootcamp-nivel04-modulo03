<p align="center"><img alt="Logotipo do Projeto" title="GoBarber" src=".github/logo.svg" width="400px" /></p>

# GoBarber Back-end

<p align="center">Autor: Jobson Gilberto Barros Amorim &lt;jobsonita@gmail.com&gt;</p>

Baseado nas aulas do curso [GoStack](https://rocketseat.com.br/gostack) (turma 11) da Rocketseat.

<p align="center"><img alt="Cobertura dos testes" title="Cobertura dos testes" src=".github/coverage.png" width="800px" /></p>

## Sobre este projeto

Este projeto demonstra a aplicação de conceitos de segurança, cache e notificações em um back-end com testes automatizados, bem como adaptações para colocá-lo em produção. Para guiar o desenvolvimento, as funcionalidades deste sistema estão descritas em [features.md](features.md).

Este repositório continua o desenvolvimento do back-end iniciado em [jobsonita/rocketseat-bootcamp-nivel02-modulo01](https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo01) e continuado em [jobsonita/rocketseat-bootcamp-nivel02-modulo02](https://github.com/jobsonita/rocketseat-bootcamp-nivel02-modulo02), [jobsonita/rocketseat-bootcamp-nivel04-modulo01](https://github.com/jobsonita/rocketseat-bootcamp-nivel04-modulo01) e [jobsonita/rocketseat-bootcamp-nivel04-modulo02](https://github.com/jobsonita/rocketseat-bootcamp-nivel04-modulo02).

Para maiores detalhes sobre o passo-a-passo da configuração do projeto, utilize a seção "Comandos utilizados na construção do projeto" deste readme em conjunto com o detalhamento dos [commits](https://github.com/jobsonita/rocketseat-bootcamp-nivel04-modulo03/commits/master) deste repositório.

Este projeto pode ser usado em conjunto com o front-end disponibilizado em [jobsonita/rocketseat-bootcamp-nivel03-modulo02](https://github.com/jobsonita/rocketseat-bootcamp-nivel03-modulo02).

## Dependências Globais

É necessário ter [Node](https://github.com/nvm-sh/nvm) e [Yarn](https://yarnpkg.com) instalados.

## Bibliotecas e ferramentas utilizadas

- express
- typescript
- eslint + prettier (padronização de código)
- typeorm (com PostgreSQL e MongDB, bibliotecas pg e mongdb)
- jsonwebtoken (autenticação)
- multer (configurado para armazenamento local)
- tsyringe (injeção de dependências)
- jest (testes automatizados)
- nodemailer (envio de emails, fake smtp com Ethereal Email)
- handlebars (formatação de mensagens)
- redis (db chave-valor usado para cache)
- [VS Code](https://code.visualstudio.com) (editor de código preferido)
- Docker (gerenciador de contêiners)
- Contêiner postgres (através do Docker)
- Postbird ou DBeaver (PostgreSQL GUI client)
- MongoDB Compass Community (MongoDB GUI client)
- Insomnia (simulação de requisições HTTP REST)

## Instalação e execução

Com um terminal aberto na raiz do projeto, execute:

```
yarn
```

Após a instalação das bibliotecas, instale o Docker em sua máquina e crie réplicas dos contêiners postgres, mongo e redis no docker:

```
docker run --name gostack_postgres -e POSTGRES_USER=your_pg_username -e POSTGRES_PASSWORD=your_pg_password -p 5432:5432 -d postgres:11

docker run --name gostack_mongodb -e MONGO_INITDB_ROOT_USERNAME=your_mg_username -e MONGO_INITDB_ROOT_PASSWORD=your_mg_password -p 27017:27017 -d mongo

docker run --name gostack_redis -p 6379:6379 -d -t redis:alpine --requirepass your_rd_password
```

Os contêiners serão ativados por padrão, mas confira usando a primeira linha abaixo e, se algum contêiner não estiver ativo, execute a segunda linha para ativá-lo:

```
docker ps -a
docker start gostack_postgres
docker start gostack_mongodb
docker start gostack_redis
```

Após a criação do contêiner do postgres, use um cliente sql de sua preferência (como Postbird ou DBeaver) para se conectar ao docker e crie um banco de dados chamado "gobarber". Em seguida, faça uma copia do arquivo .env.example com o nome .env e preencha os dados das conexões:

```
SQL_DIALECT = postgres
SQL_HOST = localhost
SQL_PORT = 5432
SQL_USER = your_pg_username
SQL_PASS = your_pg_password
SQL_DB = gobarber
SQL_LOGGING = all

MONGO_HOST = localhost
MONGO_PORT = 27017
MONGO_USER = your_mg_username
MONGO_PASS = your_mg_password
MONGO_DB = gobarber
MONGO_LOGGING = all

CACHE_HOST = localhost
CACHE_PORT = 6379
CACHE_PASSWORD = your_rd_password
```

Substitua também outros dados do .env que envolverem dados sensíveis (senhas e chaves secretas).

Com o terminal aberto na raiz do projeto, execute a migração das tabelas:

```
yarn typeorm migration:run
```

Finalmente, com um terminal aberto na raiz do projeto, execute:

```
yarn dev:server
```

Utilize uma ferramenta como o Insomnia para fazer requisições nas rotas descritas nos arquivos da pasta src/routes.

```
GET 'http://localhost:3333/appointments'
```

## Testes e análise de cobertura

Após a instalação das bibliotecas, com um terminal aberto na raiz do projeto, execute:

```
yarn test
```

Após a conclusão dos testes, será gerada uma pasta `coverage` na raiz do projeto. Um relatório bem formatado pode ser visto em `coverage/lcov-report/index.html`.

## Comandos utilizados na construção do projeto

Caso deseje configurar um projeto seguindo os passos dos commits, listo abaixo os comandos executados nesta quinta parte da configuração. Este projeto utiliza como base o projeto [jobsonita/rocketseat-bootcamp-nivel04-modulo02](https://github.com/jobsonita/rocketseat-bootcamp-nivel04-modulo02).

### Sessão 01

#### Aula 02

```
docker run --name gostack_mongodb -e MONGO_INITDB_ROOT_USERNAME=your_mg_username -e MONGO_INITDB_ROOT_PASSWORD=your_mg_password -p 27017:27017 -d mongo
```

#### Aula 03

```
yarn add dotenv-safe
yarn add mongodb
```

Importante: modificar o .env conforme a nova versão do .env.example

#### Aula 05

```
yarn add @types/mongodb -D
```

### Sessão 02

#### Aula 01

```
yarn add celebrate
yarn add @types/hapi__joi -D
```

#### Aula 02

Não segui exatamente o mesmo modelo de .env da aula, pois já vinha usando minhas próprias configurações.

#### Aula 03

```
yarn add class-transformer
```

#### Aula 04

```
yarn add aws-sdk
```

Eu configurei o projeto para usar AWS, mas ainda não criei uma conta, então é possível que haja erros na configuração.

#### Aula 06

```
yarn add mime
```

Eu configurei o projeto para usar AWS, mas ainda não criei uma conta, então é possível que haja erros na configuração.

### Sessão 03

#### Aula 01

Criar o contêiner do redis no docker:

```
docker run --name gostack_redis -p 6379:6379 -d -t redis:alpine --requirepass your_rd_password
```

Instalar as dependências:

```
yarn add ioredis
yarn add @types/ioredis -D
```

#### Aula 06

```
yarn add rate-limiter-flexible
```
