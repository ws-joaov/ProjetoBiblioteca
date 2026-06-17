# Docker e deploy

## Executar com Docker localmente

Crie um arquivo `.env` a partir de `.env.example` e altere o valor de `JWT_SECRET`.

Depois execute:

```bash
docker compose up --build
```

A aplicacao ficara disponivel em:

```text
http://localhost:3000
```

Endpoint simples para validacao de deploy:

```text
GET /health
```

O banco SQLite fica no volume `biblioteca_data`, montado em `/data` dentro do container. A aplicacao usa `DB_PATH=/data/biblioteca.db` para preservar os dados entre reinicios.

## Variaveis de ambiente

```text
PORT=3000
DB_PATH=/data/biblioteca.db
JWT_SECRET=troque-este-valor
```

## Render

Configuracao sugerida:

- Tipo: Web Service
- Runtime: Docker
- Health check path: `/health`
- Variaveis:
  - `NODE_ENV=production`
  - `DB_PATH=/data/biblioteca.db`
  - `JWT_SECRET=<valor-secreto>`

Observacao importante: para preservar SQLite no Render, e necessario usar Persistent Disk. Sem disco persistente, o banco pode ser recriado em novos deploys/reinicios.

## Railway

Configuracao sugerida:

- Criar projeto a partir do repositorio GitHub
- Railway detecta o `Dockerfile` na raiz
- Criar um volume e montar em `/data`
- Definir:
  - `DB_PATH=/data/biblioteca.db`
  - `JWT_SECRET=<valor-secreto>`

O Railway costuma ser mais favoravel para testar SQLite sem custo, pois o plano Free atual inclui uma pequena quantidade de armazenamento em volume.
