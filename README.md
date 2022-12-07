## For the Thryve webhook to work you need to spin up a proxy via ngrok

```
ngrok http 3001
```

## After you get the URL don't forget to add it in the EventTrigger configuration on the Thryve app manager dashboard

To run the api locally we use docker-compose. Be sure to have Docker and Docker-compose installed.

```
docker-compose up --build --attach api
```