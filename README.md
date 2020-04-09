# Engineering Privacy in Software - Intimate Partner Violence (IPV) Project

> Spring 2020, Professor [Tim Libert](https://timlibert.me/)

### Group Members:

Chenxiao Guan (chenxiag@andrew.cmu.edu) \
Ziyuan Zhu (ziyuanz@andrew.cmu.edu) \
Justin Souvenir Niweteto (jniwetet@andrew.cmu.edu) \
Sophia Maciel (smaciel@andrew.cmu.edu) \
Xiaoyong (Sheryl) Liu (xioayonl@andrew.cmu.edu)

## Project URL

You can visit [here](https://protect-ipv-victims.xyz) for the content.

## Technology Stack

### Front-end
The client app uses [React](https://reactjs.org/) as the primary framework. It uses the [Material-UI](https://material-ui.com/) component library for some basic functionalities and stylings. It also uses [Redux](https://redux.js.org/) for state management. A more detailed explanation of the structure can be found in the `client` directory's README [here](./clientapp/README.md).

### Back-end
The backend was built by using [Django](https://www.djangoproject.com), which is a Python framework. Detailed structure explanation can be found below in the Backend structure section.

## Build

The whole application can be built by Apache Maven, which packages everything into a `jar` in the `target` folder and can then be deployed. You can either use your favorite Java IDE for the build, or use the Maven CLI for packaging.

## Develop

To spin-up the development server, you have to do it separately for the front-end and the back-end. 

### Front-end development server

Since the front-end was scaffolded by using `create-react-app`, you can start the development server by navigating into the `clientapp` folder (which is the root directory of the front-end), run `npm install` if this is the first time running the application, and once finished just run `npm start` and it will start a development server at `localhost:3000`.

### Back-end development server
You can any IDE that supports Python to start the devlopment server for the backend. Make sure you have good internet connection in order to get connected to the database, since the database was deployed using AWS RDS and needs internet to be connected.

-----

### Backend Structure

This is a Spring Boot project which uses Maven as the package and dependency manager. All dependencies can be found in the `Pipfile` in the root directory.

The starting point of the peoject is `eps_ipv_server`.

Since it is a Django Project, it generally follows the Django structure, which allows several applications to exist and interact. All files are separated into different applications under `server/eps_ipv_server`. 

#### [eps_ipv_server](./server/eps_ipv_server)

This is the root directory, which works to connect the project with Django. It contants root files such as sttings.py, wsgi.py, and asgi.py, which defines the basic settings and functions of the project. Also, it contains urls.py to perform redirections based on defined url patterns. 

#### [api](./server/api)

This is the core application of the project, which defines models and most operations of the project. Also, the directory contains serialiers.py for model instances and urls.py for viewsets redirections. Besides basic .py files, the directory contains three sub directories api, migrations, and models for more information and operations. 

#### [api/api](./server/api/api)

This directory defines viewsets contains required data for the registration and authentication process. It also contains the image upload API to securely upload files and images to the AWS cloud storage service. The subfolder auth contains two APIs to perform registration and authentication operations. 

JWT authentication related logic lives here as well. This backend application uses JWT as the primary tool for securing endpoints, and all JWT related files are in the utils directory.

#### [api/models](./server/api/models)

This is where all models created and defined. The models will determine the table structures stored in the Mysql database.

#### [api/migrations](./server/api/migrations)

This directory is generated automatically when models are created and linked to the database. All .py files under the directory is to trace any changes of the models and record them in the database.
