# ASA DS

Repositório com duas partes:

| Pasta | Descrição |
|-------|------------|
| **`web/`** | Dashboard em **Next.js 15** (export estático), **TypeScript** e **Tailwind CSS**, consumindo uma API mock com **json-server**. |
| **`app/`** | **AppFobos** — app mobile em **Expo 54** + **React Native** + **TypeScript**, com **Expo Router** e **Firebase** (Auth, Firestore e Storage). |

---

## Pré-requisitos

- **Node.js** (recomendado: **20 LTS** ou superior; o `Dockerfile` da web usa Node 24).
- **Yarn** (ambas as pastas têm `yarn.lock`; use o Yarn para manter versões alinhadas ao lockfile).

Para o app mobile: **Expo Go** no telefone ou **Android Studio** / **Xcode** para emuladores.

---

## Projeto Web (`web/`)

Interface web que fala com o mock em `http://localhost:3001` (axios em `web/src/services/transactionService.ts` e rewrites do Next em desenvolvimento).

### 1. Instalar dependências

```bash
cd web
yarn install
```

### 2. Rodar em desenvolvimento

**Opção A — Front + API mock juntos (recomendado)**  
Sobe o **json-server** na porta **3001** e o **Next.js** na porta **3000**:

```bash
yarn dev:full
```

Abra [http://localhost:3000](http://localhost:3000).

**Opção B — Terminais separados**

Terminal 1 (API mock com rotas customizadas):

```bash
yarn server
```

Terminal 2 (Next):

```bash
yarn dev
```

### Scripts úteis (`web/package.json`)

| Comando | Função |
|---------|--------|
| `yarn dev` | Somente Next (porta 3000). |
| `yarn server` | json-server com `mocks/db.json` + `mocks/routes.json` (porta 3001). |
| `yarn dev:full` | API + Next em paralelo. |
| `yarn build` | Build de produção (`output: 'export'`). |
| `yarn start` | Servidor Next após build (modo não-export). |
| `yarn lint` | ESLint. |

### Docker (web)

Na pasta `web/`, existe `docker-compose.yml` que orquestra build do front e o serviço da API mock. Uso típico:

```bash
cd web
docker compose up --build
```

*(O compose já executa **yarn** dentro do container.)*

---

## Projeto App — React Native / Expo (`app/`)

App **AppFobos** com autenticação e dados no Firebase. A configuração do cliente está em `app/src/infrastructure/firebase/firebase.ts`.

### 1. Instalar dependências

```bash
cd app
yarn install
```

### 2. Iniciar o bundler Expo

```bash
yarn start
```

No terminal do Expo, escaneie o QR com **Expo Go** (Android/iOS) ou pressione **a** / **i** para abrir em emulador Android / simulador iOS.

### Scripts úteis (`app/package.json`)

| Comando | Função |
|---------|--------|
| `yarn start` | `expo start` (menu interativo). |
| `yarn android` | Expo direcionado ao Android. |
| `yarn ios` | Expo direcionado ao iOS (macOS + Xcode). |
| `yarn web` | Expo na versão web do app. |
| `yarn lint` | ESLint (Expo). |

### Observações (app)

- Navegação e layout raiz: `app/app/_layout.tsx` (file-based routing do Expo Router).
- Regras e índices Firestore (se usar deploy): `app/firestore.rules`, `app/firestore.indexes.json`.
- Para produção, revise credenciais Firebase e use variáveis de ambiente ou config segura conforme a política do time (hoje o `firebaseConfig` está no código-fonte).

---

## Resumo rápido

```bash
# Web (dashboard + mock API)
cd web && yarn install && yarn dev:full

# App (Expo)
cd app && yarn install && yarn start
```
