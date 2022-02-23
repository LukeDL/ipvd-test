import CostCentersControllers from "../controllers/costCenters.js";
import utils from "../utils.js";

const concat = utils().concatChunkData;

const CostCenter = async (url, req, res) => {
  const routes = [
    {
      route: "/getCostCenter",
      method: "GET",
      controller: CostCentersControllers.getCostCenter,
      protected: true,
    },
    {
      route: "/createCostCenter",
      method: "POST",
      controller: CostCentersControllers.createCostCenter,
      protected: true,
    },
    {
      route: "/updateCostCenter",
      method: "PUT",
      controller: CostCentersControllers.updateCostCenter,
      protected: true,
    },
    {
      route: "/deleteCostCenter",
      method: "DELETE",
      controller: CostCentersControllers.deleteCostCenter,
      protected: true,
    },
  ];

  const splitUrl = (url, delimiter) => {
    return url.split(delimiter);
  };

  const urlString = splitUrl(url, "/costCenters");

  const checkUrlAndExecute = async (url) => {
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

            route.controller({ cookies, ...data }, res);
          } else {
            const data = await concat(req);
            route.controller(data, res);
          }

          return true;
        }
      }
    }

    // console.log('no route')

    return false;
  };

  if (url.search("/costCenters") !== -1) {
    if (await checkUrlAndExecute(urlString[1])) {
      return true;
    } else {
      return false;
    }
  }
};

export default CostCenter;
