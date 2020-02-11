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
The client app uses [React](https://reactjs.org/) as the primary framework. It uses the [Material-UI](https://material-ui.com/) component library for some basic functionalities and stylings. It also uses [Redux](https://redux.js.org/) for state management. A more detailed explanation of the structure can be found in the `client` directory's README [here](./clientapp/README.md).

### Back-end
The backend was built by using [Spring Boot](https://spring.io/projects/spring-boot), which is a Java framework. It uses [Apache Maven](https://maven.apache.org) for building process automation and dependencies management. Detailed structure explanation can be found below in the Backend structure section.

## Build

The whole application can be built by Apache Maven, which packages everything into a `jar` in the `target` folder and can then be deployed. You can either use your favorite Java IDE for the build, or use the Maven CLI for packaging.

## Develop

To spin-up the development server, you have to do it separately for the front-end and the back-end. 

### Front-end development server

Since the front-end was scaffolded by using `create-react-app`, you can start the development server by navigating into the `clientapp` folder (which is the root directory of the front-end), run `npm install` if this is the first time running the application, and once finished just run `npm start` and it will start a development server at `localhost:3000`.

### Back-end development server
You can either use Maven CLI or your Java IDE to start the devlopment server for the backend. Make sure you have good internet connection in order to get connected to the database, since the database was deployed using AWS RDS and needs internet to be connected.

-----

### Backend Structure

This is a Spring Boot project which uses Maven as the package and dependency manager. All dependencies can be found in the `pom.xml` in the root directory.

The starting point of the application is `EpsIpvApplication.java`.

Since it is a Spring Application, it generally follows the Aspect-Oriented Programming (AOP) paradigm, which separates the backend into several layers. All layers are separated into different directories under `src/main/java/com/epsspring2020/EPSIPV`. 

#### [Service Layer](./src/main/java/com/epsspring2020/EPSIPV/services)

This is the layer for handling most of the business logic. It talks to the DAO layer for interacting with the database, and returns the desired output back to the Controller layer on-call. Generally, one service file is responsible for one controller file.

#### [Controller Layer](./src/main/java/com/epsspring2020/EPSIPV/controllers)

This layer defines the API of the backend. It defines the routing information of the API, and handles what status code should be returned and the object structure of the returned data. It directly interacts with the Service layer for all the business logics.

#### [DAO (Data Access Object) Layer](./src/main/java/com/epsspring2020/EPSIPV/daos)

This defines the interface with talking to the database. The project uses MyBatis as the higher level JDBC interface. In the `dao` directory, it only specifies the java interface that every other file calls when interacting with this layer, but the actual SQL queries are under `src/main/resources/mappers` as XML files. Each dao java file is related to one mapper in the mappers directory.

#### [Entities](./src/main/java/com/epsspring2020/EPSIPV/entities)

These are some POJO interfaces for defining and retrieving data in a certain format. 

#### [Configs](./src/main/java/com/epsspring2020/EPSIPV/configs)

This is where application related configuration files live in. Currently it only has security related configurations. For example, the `SecurityConfig` is an implementation of the `WebSecurityConfigurerAdapter` interface provided by Spring Security, which is required by Spring Security to configure the overall security of the API. 

#### [utils](./src/main/java/com/epsspring2020/EPSIPV/utils)

These are some general utilities used across the backend application. 

JWT authentication related logic lives here as well. This backend application uses JWT as the primary tool for securing endpoints, and all JWT related files are in the utils directory.