# vic-scalapay-api

## Setup

> Install NodeJS LTS version (v18.16.0)

> Install MySQL (v8.0.33)

> Install VS Code with following plugins:

- Code Runner
- ESLint
- GitLens — Git supercharged
- Markdown All in One
- Prettier - Code formatter

> Clone Project: https://github.com/vicweiyu/vic-scalapay-api

> Run following DB script in MySQL:

    CREATE SCHEMA `vic_db` DEFAULT CHARACTER SET utf8;

> Go to your local project path and run following script:

    npm install
    npm run setup-db

> Duplicate `.env-define` file and rename it to `.env` and then adjust parameters (username & password) base on your local environment

## Development & Build

> Development

    npm start
    npm run type-check

    npm run prettier
    npm run eslint

> Build

    npm run build

## Technical Stack

- JavaScript (ES6+), TypeScript
- NodeJS
- Koa
- Axios
- Sequelize
- JWT
- bcrypt.js
- ESLint, Prettier
