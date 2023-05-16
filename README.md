# PostgreSQL Recipes

## Set up

postgres and pgadmin are running from docker containers.

pgadmin is available on:

```shell
http://localhost:5050/
```

For connecting to database from pgadmin or TypeORM to docker container we need to follow:

1. Run docker-compose:

```shell
docker-compose up
```

2. Run command

```shell
docker ps
```

And find CONTAINER ID for postres

3. Run command

```shell
docker inspect <CONTAINER_ID>
```

4. Find in the IPAddress section IP Address for container, like:

"IPAddress": "192...."

5. Copy this IP Address and provide to .env file and pgadmin for create DB

[link for this issue](https://stackoverflow.com/questions/57109494/unable-to-connect-to-server-pgadmin-4)

Create migration:

```shell
npm run dev:migrate:create <string|example: init>
```

**For first running the project should create manually database in the pgadmin**

[how to create DB in pgadmin](https://dykraf.com/blog/how-to-connect-pgadmin4-and-postgresql-server-on-docker-container)

*Please, use the following IPAddress from instruction above*

## Typeorm

Create migration

```shell
 npm run dev:migration:generate --name="init"
```

## Prisma

```shell
npx prisma migrate dev --name init
```
