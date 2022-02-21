import UsersControllers from "../controllers/users.js";

const User = (url, req, res) => {
  const routes = [
    { route: "/", method: "GET", controller: UsersControllers.controllerTest },
    {
      route: "/child/",
      method: "GET",
      controller: UsersControllers.controllerChild,
    },
    {
      route: "/child/",
      method: "DELETE",
      controller: UsersControllers.controllerChildDelete,
    },
  ];

  function splitUrl(url, delimiter) {
    return url.split(delimiter);
  }

  const urlString = splitUrl(url, "/users");

  function checkUrlAndExecute(url) {
    /**
     * checks if the url is valid on a list of routes if not return
     */

    for (const route of routes) {
      if (urlString[1] === route.route) {
        if (req.method === route.method) {
          route.controller(res);
          return true;
        }
      }
    }

    return null;
  }

  if (url.search("/users") !== -1) {

    if (!checkUrlAndExecute(urlString[1])) {
      return null;
    }
  } else {
    return null;
  }

  return {
    User,
  };
};

export default User;
