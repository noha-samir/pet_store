<h3 align="center">
<b>Pet Store</b></h3>

## 📝 Table of Contents

<!-- - [About](#about) -->
- [Getting Started](#getting_started)
- [Built Using](#built_using)

## 🏁 Getting Started <a name = "getting_started"></a>
 - useing mysql database , you have to create a database with name pet_store
  >> run sql query >> CREATE SCHEMA IF NOT EXISTS `pet_store` DEFAULT CHARACTER SET utf8;
 - clone project
 - install node_modules "npm install","npm i node"
 - install nodemon "npm i nodemon"
 - start server "npm start"
 - Response should be >> {App is listening on port:3050}                                                                                   {Tables and relations are created successfully with default values:), 
                         Database is ready}

### Dependencies

- [Nodemon](https://nodemon.io/) nodemon for npm run watch command
- [async](https://www.npmjs.com/package/async)
- [babel](https://www.npmjs.com/package/babel-install)
- [babel-node](https://www.npmjs.com/package/babel-node)
- [compression](https://www.npmjs.com/package/compression)
- [express](https://expressjs.com/)
- [request](https://www.npmjs.com/package/request)
- [babel-cli](https://www.npmjs.com/package/babel-cli)

### Installing Env
Development env must contains 
- [NodeJs](https://nodejs.org/en/) - Server Environment

## 🔧 Running the tests <a name = "tests"></a>

Test if server working
  - Run curl localhost:3050
  - Response should be >> {WELCOME TO PET STORE}

Run endpoints using postman or any other tool 
  - APIs will be attached in the project as a collection 
    named >> "cognitev APIs.postman_collection.json

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
