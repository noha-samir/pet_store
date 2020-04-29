<h3 align="center">
<b>Pet Store</b></h3>

## 📝 Table of Contents

<!-- - [About](#about) -->
- [Notes](#Notes)
- [Getting Started](#getting_started)
- [Built Using](#built_using)

## Notes

first deployment option

- There are defualt values for the local database in the constants.js file in the project
  you have to change the database credentials and only these credentials to match yours:
                            >>  DATABASE_USER_NAME: "root"
                            >>  DATABASE_PASSWORD: ""

## Getting Started

first deployment option

1-node and npm must be installed on your machine

second deployment option

2-docker must be installed on your machine (linux os is prefered)

## Deployment & Installing Env

first deployment option

1- use the visual studio code 

2- use mysql database on your machine

3- clone project

4- Open a terminal window and type:

  cd /path-of-the-project

5- install dependencies

   - install node_modules "npm install","npm i node"
   - install nodemon "npm i nodemon"
   - using debugging mood "F5"
      >> Response should be >>  
                       1- {App is listening on port:3050}
                       2- {Schema is created successfully}
                       3- {Tables and relations are created successfully with default values}
                       4- {Database is ready :)} 


second deployment option

1- clone project

2- Open a terminal window and type

  sudo apt-get update

3- Uninstall Old Versions of Docker

  sudo apt-get remove docker docker-engine docker.io

4- Install Docker

  sudo apt install docker.io

5- Start and Automate Docker

  sudo systemctl start docker
  sudo systemctl enable docker

6- docker --version

7- npm run deploydev 

### Dependencies

- [Nodemon](https://nodemon.io/) nodemon for npm run watch command
- [async](https://www.npmjs.com/package/async)
- [babel](https://www.npmjs.com/package/babel-install)
- [babel-node](https://www.npmjs.com/package/babel-node)
- [compression](https://www.npmjs.com/package/compression)
- [express](https://expressjs.com/)
- [request](https://www.npmjs.com/package/request)
- [babel-cli](https://www.npmjs.com/package/babel-cli)

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
