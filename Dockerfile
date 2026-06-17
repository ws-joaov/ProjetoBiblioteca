# 1. Define a imagem base (Node.js versão 20, versão Alpine que é muito mais leve)
FROM node:20-alpine

# 2. Define a pasta de trabalho dentro do contêiner
WORKDIR /app

# 3. Copia apenas os arquivos de dependências primeiro (otimização de cache do Docker)
COPY package*.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia o resto do código do seu projeto para dentro do contêiner
COPY . .

# 6. Expõe a porta que a aplicação vai usar
EXPOSE 3000

# 7. O comando que inicia a sua aplicação
CMD ["npm", "start"]    