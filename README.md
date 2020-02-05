# Engineering Privacy in Software - Intimate Partner Violence (IPV) Project

> Spring 2020, Professor [Tim Libert](https://timlibert.me/)

### Group Members:

Chenxiao Guan (chenxiag@andrew.cmu.edu) \
Ziyuan Zhu (ziyuanz@andrew.cmu.edu) \
Justin Souvenir Niweteto (jniwetet@andrew.cmu.edu) \
Sophia Maciel (smaciel@andrew.cmu.edu) \
Xiaoyong (Sheryl) Liu (xioayonl@andrew.cmu.edu)

## Project URL

You can visit [here](http://epsipv-env.hq2w62cyzp.us-west-2.elasticbeanstalk.com/) for the content.

## Technology Stack

### Front-end
The client app uses [React](https://reactjs.org/) as the primary framework. It uses the [Material-UI](https://material-ui.com/) component library for some basic functionalities and stylings. It also uses [Redux](https://redux.js.org/) for state management. 

### Back-end
The backend was built by using [Spring Boot](https://spring.io/projects/spring-boot), which is a Java framework. It uses [Apache Maven](https://maven.apache.org) for building process automation and dependencies management.

## Build

The whole application can be built by Apache Maven, which packages everything into a `jar` in the `target` folder and can then be deployed. You can either use your favorite Java IDE for the build, or use the Maven CLI for packaging.

## Develop

To spin-up the development server, you have to do it separately for the front-end and the back-end. 

### Front-end development server

Since the front-end was scaffolded by using `create-react-app`, you can start the development server by navigating into the `clientapp` folder (which is the root directory of the front-end), run `npm install` if this is the first time running the application, and once finished just run `npm start` and it will start a development server at `localhost:3000`.

### Back-end development server
You can either use Maven CLI or your Java IDE to start the devlopment server for the backend. Make sure you have good internet connection in order to get connected to the database, since the database was deployed using AWS RDS and needs internet to be connected.

