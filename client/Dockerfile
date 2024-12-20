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

# Построение приложения
RUN npm run build

# Использование nginx для раздачи фронтенда
FROM nginx:alpine


COPY --from=0 /usr/src/app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Открытие порта
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
