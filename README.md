## Framework

The framework that is used is NestJS.
NestJS is a framework for building efficient applications.
I've used certain modules that make it easier to work with the API.
These are:

- GraphQL module. Allows us to use GraphQL objects next to the normal Http controllers etc.
- MikroORM module. ORM for fast and efficient queries.
- Bull module. Queue implementation, works with Redis.

## Copy over the .env.template to .env

Be sure to copy the .env.template to .env otherwise the docker-compose file won't be able to use the environment variables defined as well as the underlying services.

```
cp .env.template .env
```

## Proxy for capturing Thryve EventTrigger's

For the Thryve webhook to work you need to spin up a proxy via ngrok and put the URL.
After you get the URL don't forget to add it to the EventTrigger configuration on the Thryve app manager dashboard.

```
ngrok http 3001
```

## Run the api locally

Be sure to have Docker and Docker-compose installed. Because we need it to run the API and it's depedencies.

```
docker-compose up --build --attach api
```

## Access the GraphQL playground

The playground is enabled by default and located at the following url.

```
http://localhost:3001/graphql/playground
```
