import http from "http";

import User from "./routes/users.js";

const routes = {
  /*users: '',
    departments: '',
    costCenter: '', */
  /*"/helloworld": (res, url) => {
    res.write(`Hello World on: ${url}`);
    return res.end();
  },
  "/test": (res, url) => {
    res.write(`Test on: ${url}`);
    res.end();
  },*/
  "/users/": User,
};

/*
  Create a factory that returns a function that can be used to create a server.
*/

const httpServerFactory = () => {
  const state = {
    observer: [],
  };

  const createServer = () => {
    return http
      .createServer((req, res) => {
        let url = req.url;
        // remove / from the url
        notifyAll(url, req, res);
      })
      .listen(3000, () => {
        console.log("Server is running on port 3000");
      });
  };

  const subscribeRoutes = (routes) => {
    for (const route in routes) {
      state.observer.push(routes[route]);
      //state.observer.push(route);
    }
  };

  const showRoutes = () => {
    console.log("routes:", state.observer);
  };

  const notifyAll = (url, req, res) => {
    console.log(`notifing ${state.observer.length} routes`);
    const result = [];
    for (const observer of state.observer) {
      result.push(observer(url, req, res));
    }
    if (result.every(element => element === null)) {
      res.writeHead(404);
      res.end();
    }
  };

  return {
    createServer,
    subscribeRoutes,
    showRoutes,
  };
};

const server = httpServerFactory();
server.subscribeRoutes(routes);
server.showRoutes();
server.createServer();

console.log("server:", server);
