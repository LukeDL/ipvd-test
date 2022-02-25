import UsersControllers from "../controllers/users.js";
import utils from "../utils.js";

const concat = utils().concatChunkData;

const User = async (url, req, res, headers) => {
  const routes = [
    { route: "/", method: "GET", controller: UsersControllers.controllerTest },
    { route: "/login", method: "POST", controller: UsersControllers.login },
    {
      route: "/logout",
      method: "DELETE",
      controller: UsersControllers.logout,
      protected: true,
    },
    {
      route: "/protected",
      method: "POST",
      controller: UsersControllers.protected,
      protected: true,
    },
    {
      route: "/getUser",
      method: "GET",
      controller: UsersControllers.getUser,
      protected: true,
    },
    {
      route: "/findAllUsersWithDepartamentId",
      method: "POST",
      controller: UsersControllers.findAllUsersWithDepartamentId,
      protected: true,
    },
  ];

  function splitUrl(url, delimiter) {
    return url.split(delimiter);
  }

  const urlString = splitUrl(url, "/users");

  async function checkUrlAndExecute(url) {
    /**
     * checks if the url is valid on a list of routes if not return
     */

    for (const route of routes) {
      if (urlString[1] === route.route) {
        // if the url is valid
        // console.log('there is route')
        if (req.method === route.method) {
          // if the method is valid
          // console.log('the method is correct')

          if (route.protected) {
            // console.log('the route is protected')
            const cookies = utils().parseCookies(req);
            const data = await concat(req);

            route.controller({ cookies, data }, res, headers);
          } else {
            const data = await concat(req);
            route.controller(data, res, headers);
          }

          return true;
        }
      }
    }

    // console.log('no route')

    return false;
  }

  if (url.search("/users") !== -1) {
    if (await checkUrlAndExecute(urlString[1])) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }

  /* return {
    User,
  }; */
};

export default User;
