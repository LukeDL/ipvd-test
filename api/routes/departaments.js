import DepartamentsControllers from "../controllers/departaments.js";
import utils from "../utils.js";

const concat = utils().concatChunkData;

const Departament = async (url, req, res, headers) => {

  const routes = [
      {
        route: "/getDepartament",
        method: "GET",
        controller: DepartamentsControllers.getDepartament,
        protected: true,
      },
      {
        route: "/createDepartament",
        method: "POST",
        controller: DepartamentsControllers.createDepartament,
        protected: true,
      },
      {
        route: "/updateDepartament",
        method: "PUT",
        controller: DepartamentsControllers.updateDepartament,
        protected: true,
      },
      {
        route: "/deleteDepartament",
        method: "DELETE",
        controller: DepartamentsControllers.deleteDepartament,
        protected: true,
      },
    ];

    const splitUrl = (url, delimiter) => {
      return url.split(delimiter);
    };

    const urlString = splitUrl(url, "/departaments");

    const checkUrlAndExecute = async (url) => {
      /**
       * checks if the url is valid on a list of routes
       * if not return false
       */

      for (const route of routes) {
        if (urlString[1] === route.route) {
          // if the url is valid
          console.log('there is route')
          if (req.method === route.method) {
            // if the method is valid
            console.log('the method is correct')

            if (route.protected) {
              console.log('the route is protected')
              const cookies = utils().parseCookies(req);
              const data = await concat(req);

              route.controller({ cookies, ...data }, res, headers);
            } else {
              const data = await concat(req);

              route.controller({ ...data }, res, headers);
            }
          }
        }
      }
    };

    if (url.search("/departaments") !== -1) {
      if (await checkUrlAndExecute(urlString[1])) {
        return true;
      }else{
        return false;
      }
    }
  }

export default Departament;