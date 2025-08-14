FROM node:23.6.1-bookworm-slim

WORKDIR /code/front_end

COPY package*.json /code/front_end

RUN npm ci 

COPY . /code/front_end

EXPOSE 3000

ENV TAILWIND_DISABLE_OXIDE=1

CMD ["npx", "vite","--host", "0.0.0.0","--port", "3000"]

