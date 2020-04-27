<h3 align="center">
<b>Pet Store</b></h3>

## 📝 Table of Contents

<!-- - [About](#about) -->
- [Getting Started](#getting_started)
- [Built Using](#built_using)

## 🏁 Getting Started <a name = "getting_started"></a>

 - clone project
 - install node_modules "npm install","npm i node"
 - install nodemon "npm i nodemon"
 - start server "npm start"

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
  - Run  curl localhost:3050
  - Response should be >> {helloooo}

Run APIs using postman or any other tool 
  - API >> http://localhost:3050/api/v1/user
  - METHOD >> POST
  - BODY >> {
	 "name":"noha"
}
  - RESPONSE >> created user

## ⛏️ Built Using <a name = "built_using"></a>

- [Express](https://expressjs.com/) - Server Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
