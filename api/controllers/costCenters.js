import Prisma from "@prisma/client";
import utils from "../utils.js";

const CostCentersControllers = {
  createCostCenter: async (responseData, res) => {
    /**
     * use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then create a new costCenter
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const data = responseData.data;

      console.log("data:", data)

      const main = async () => {
        const costCenter = await prisma.CostCenters.create({
          data: {
            ...data,
          },
        });

        res.write(JSON.stringify({ costCenter }));
        res.end();
      };

      main()
        .catch((e) => console.error(e))
        .finally(async () => {
          await prisma.$disconnect();
        });
    } else {
      res.writeHead(401);
      res.write(
        JSON.stringify({
          error: "Invalid session",
        })
      );
      res.end();
    }
  },


  getCostCenter: async (responseData, res) => {

    /**
     * use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then get costCenters by id
     */
    
    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const main = async () => {
        const costCenter = await prisma.CostCenters.findFirst({
          where: {
            id: responseData.data.id,
          },
        });

        if(costCenter) {

        res.write(JSON.stringify({ costCenter }));
        res.end();
        } else {
          res.write(JSON.stringify({ error: "CostCenter not found" }));
          res.end();
        }
      };
      

      main()
        .catch((e) => console.error(e))
        .finally(async () => {
          await prisma.$disconnect();
        });
    }

    else {
      res.writeHead(401);
      res.write(
        JSON.stringify({
          error: "Invalid session",
        })
      );
      res.end();
    }

  },


  updateCostCenter: async (responseData, res) => {

    /**
     * use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then update costCenter by id
     * with the fields sent in the responseDatauest body
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const data = responseData.data;

      const main = async () => {
        const costCenter = await prisma.CostCenters.findFirst({
          where: {
            id: data.id,
          },
        });

        if(costCenter) {
          const updatedCostCenter = await prisma.CostCenters.update({
            where: {
              id: data.id,
            },
            data: {
              ...data,
            },
          });

          res.write(JSON.stringify({ updatedCostCenter }));
          res.end();
        } else {
          res.write(JSON.stringify({ error: "CostCenter not found" }));
          res.end();
        }
      };

      main()
        .catch((e) => console.error(e))
        .finally(async () => {
          await prisma.$disconnect();
        });
    }

    else {
      res.writeHead(401);
      res.write(
        JSON.stringify({
          error: "Invalid session",
        })
      );
      res.end();
    }
  },

  deleteCostCenter: async (responseData, res) => {
      
      /**
      * use utils.checkSession to check if the user is logged in
      * and if the user is logged in, then delete costCenter by id
      */
  
      if (utils().checkSession(responseData.cookies)) {
        const { PrismaClient } = Prisma;
        const prisma = new PrismaClient();
  
        const main = async () => {
          const costCenter = await prisma.CostCenters.findFirst({
            where: {
              id: responseData.data.id,
            },
          });
  
          if(costCenter) {
            const deletedCostCenter = await prisma.CostCenters.delete({
              where: {
                id: responseData.data.id,
              },
            });
  
            res.write(JSON.stringify({ deletedCostCenter }));
            res.end();
          } else {
            res.write(JSON.stringify({ error: "CostCenter not found" }));
            res.end();
          }
        };
  
        main()
          .catch((e) => console.error(e))
          .finally(async () => {
            await prisma.$disconnect();
          });
      }
  
      else {
        res.writeHead(401);
        res.write(
          JSON.stringify({
            error: "Invalid session",
          })
        );
        res.end();
      }
  },

};

export default CostCentersControllers;
