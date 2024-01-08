## Run Project in Dev Mode?

```bash
$ docker compouse up
```

## Setting up DB 

Since this project uses Prisma, a local instance of MongoDB cannot be used. Hence
it is recommended to create an instance in Atlas as it supports replica sets which
is required for Prisma.

after creating an instance in Atlas save the Database url inside .env file

```bash
# sotirefront-api/.env
DATABASE_URL="your ATLAS instance url"
```

## Seed the DB 

```bash
# After
$ docker compose up

# cd into storefront-api
$ cd storefront-api

# call seed script
$ yarn db:seed
```