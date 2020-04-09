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

This is the directory where all reusable components of the application lives. You can go `components/Routes/Routes.js` for routing information and see what does the app contains in a routing perspective. 

### ['actions' and 'reducers'](./src)

These two directories contain Redux related logic. Almost all Ajax requests send to the backend are defined in the `actions` directory.

Redux also requires reducers to dispatch actions, and that is what the reducers directory is for. It defines reducer logic and each reducer file is associated with one action file.

One thing to note is that, this app also uses Redux to store authentication related states. For example, `state.auth.isAuthentiated` stores a boolean indicating whether the user is authenticated or not. This flag is toggled each time the user log in or log out, or does any authentication related operation. Since the app uses JWT for authentication, it stores the JWT token returned from backend into localStorage through the `localStorage` browser API.
