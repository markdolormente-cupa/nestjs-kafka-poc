# ###################
# Build Stage
# ###################
FROM node:18.12.1-alpine as build
WORKDIR /build

COPY . .

RUN npm install
RUN npm run build

# ###################
# Run Stage
# ###################
FROM node:18.12.1-alpine
ARG PORT=3000
ENV NODE_ENV=production
WORKDIR /app

RUN apk add --update dumb-init

COPY ["package.json", "package-lock.json", "./"]
COPY --chown=node:node --from=build /build/dist ./dist

RUN npm ci --production && npm cache clean --force

USER node
EXPOSE ${PORT}
CMD [ "dumb-init", "node", "dist/src/main.js" ]