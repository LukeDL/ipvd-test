import http from "http";

import User from "./routes/users.js";
import CostCenter from "./routes/costCenters.js";
import Departament from "./routes/departaments.js";

const routes = {
  "/users/": User,
  "/costCenters/": CostCenter,
  "/departaments/": Departament,
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

  const notifyAll = async (url, req, res) => {
    console.log(`notifing ${state.observer.length} routes`);
    const result = [];
    for (const observer of state.observer) {
      console.log("observer:", observer);
      result.push(await observer(url, req, res));
    }

    
    console.log("result:", result);
    console.log('result.every:',result.every(element => element === null))
    console.log('result.length:',result.length)
    

    if (result.every(element => element === false)) {
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

/**
 * Create a server, subscribe to the routes and start listening
 */

const server = httpServerFactory();
server.subscribeRoutes(routes);
// server.showRoutes();
server.createServer();

// console.log("server:", server);
