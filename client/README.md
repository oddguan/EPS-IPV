# EPS IPV Client App - Frontend

## Overview

This is a react project, which was bootstrapped by using the create-react-app CLI.

It also utilizes Redux, which is a state management library that often used with React.

The overall theme used is material-ui, which is a Google-ish style component library for React.

## Project Structure

React follows a component-based paradigm for developing applications, which means that it separates every piece of functionalities into components and each one can be developed on their own.

The single entry point of the app is in `public/index.html`, which links the `App` component in the `src` directory as the entry point for the whole React application.

Besides the root component `App.js`, there is a `components` directory in the `src` directory which contains all components used in the project.

Outside React itself, the `actions` and `reducers` directories define Redux related logics that go with React.

### [`components`](./src/components)

Three components defined the three pages for the application, which are `Auth/Login/Login.js`, `Auth/Register/Register.js` and `Todos/Todos.js`. Each component then uses other sub-components or utility conponents to form their own structure. The `Login` component is the major view of the `/login` route, and `Register` component is the `/register` route, and `Todos` component is the '/' route. Note that each route displays the `Navbar` component as well, and it is included in the `App` component outside the routing definitions.

### ['actions' and 'reducers'](./src)

These two directories contain Redux related logic. Almost all Ajax requests send to the backend are defined in the `actions` directory.

For example, the `todoActions.js` defines all the interaction relating to todos, such as fetching, adding, editting and deleting todo items.

Redux also requires reducers to dispatch actions, and that is what the reducers directory is for. It defines reducer logic and each reducer file is associated with one action file.

One thing to note is that, this app also uses Redux to store authentication related states. For example, `state.auth.isAuthentiated` stores a boolean indicating whether the user is authenticated or not. This flag is toggled each time the user log in or log out, or does any authentication related operation. Since the app uses JWT for authentication, it stores the JWT token returned from backend into localStorage through the `localStorage` browser API.
