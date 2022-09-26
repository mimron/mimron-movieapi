## Requirements

- [Nodejs & Npm](https://nodejs.org) >= **12.x.x**
- [Docker](https://www.docker.com/)
- [Yarn]() (Recommended)

## Manual Installation

Clone the repo:

```bash
git clone https://github.com/mimron/mimron-movieapi.git
cd mimron-movieapi
npx rimraf ./.git
```

Install the dependencies:

```bash
yarn install | npm install
```

Set the environment variables:

```bash
cp .env.example .env

# open .env and modify the environment variables (if needed)
```

## Commands

Docker (Recommended):

```bash
# run docker container in development mode
yarn docker:dev
```

Or running locally:

```bash
yarn dev
```

## API Documentation

run the server and go to `http://localhost:3000/v1/docs` in your browser. This documentation page is using [swagger](https://swagger.io/).

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

#Document swagger Host
SWAGGER_HOST=localhost

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/db-movie

# REDIS Connection
REDIS_HOST=127.0.0.1
REDIS_PORT=6379

# JWT secret key
# Number of minutes after which an access token expires
# Number of days after which a refresh token expires
JWT_SECRET=thisisasamplesecret
JWT_ACCESS_EXPIRATION_MINUTES=30
JWT_REFRESH_EXPIRATION_DAYS=30

# SMTP configuration options for the email service
# For testing, you can use a fake SMTP service like Ethereal: https://ethereal.email/create
SMTP_HOST=smtp.ethereal.email
SMTP_PORT=587
SMTP_USERNAME=jayhfff329@ethereal.email
SMTP_PASSWORD=d98sf12jks9
EMAIL_FROM=jayhfff329@ethereal.email
```
