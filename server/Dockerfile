# Установка базового образа
FROM node:19.4.0

# Установка рабочей директории
WORKDIR /usr/src/app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm install


# Копирование всего кода
COPY . .

# Копирование папки static в dist
RUN mkdir -p dist/static && cp -r src/static/* dist/static/

# Компиляция TypeScript (если требуется)
RUN npm run build

# Генерация Prisma Client
RUN npx prisma generate

# Установка команды для запуска
CMD ["npm", "start"]

# Открытие порта
EXPOSE 5000
