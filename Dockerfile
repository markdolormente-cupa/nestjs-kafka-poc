###################
# BUILD FOR LOCAL DEVELOPMENT
###################

FROM node:alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD FOR PRODUCTION
###################

FROM node:alpine As build

WORKDIR /usr/src/app

RUN apk add --update dumb-init

COPY --chown=node:node package*.json ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --only=production && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:alpine As production

ARG PORT=3333

COPY --chown=node:node --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
COPY --chown=node:node .env .

EXPOSE ${PORT}
CMD [ "dumb-init", "node", "dist/src/main.js" ]
