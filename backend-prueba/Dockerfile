# Utilizar una imagen base oficial de Node.js
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos de configuración de dependencias
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar todo el código de la aplicación
COPY . .

# Generar el cliente Prisma
RUN npx prisma generate

# Exponer el puerto donde se ejecutará la aplicación
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start:prod"]
