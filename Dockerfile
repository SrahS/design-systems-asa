FROM node:18 AS build 
# Nota: Usei node:18 ou 20, pois a versão 24 ainda não é LTS estável, 
# mas se o seu projeto exige a 24, pode manter.

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

# Executa o server em background para permitir o build, se necessário, 
# ou apenas executa o comando antes do build:
RUN yarn server:only & yarn build

FROM nginx:stable-alpine

# Copia os arquivos gerados pelo build para o Nginx
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]