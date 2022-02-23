import Prisma from "@prisma/client";
import utils from "../utils.js";

const DepartamentsControllers = {
  createDepartament: async (responseData, res) => {
    /**
     * use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then create a new departament
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const data = responseData.data;

      console.log("data:", data);

      const main = async () => {
        const departament = await prisma.Departaments.create({
          data: {
            ...data,
          },
        });

        res.write(JSON.stringify({ departament }));
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

  getDepartament: async (responseData, res) => {
    /**
     * use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then get departaments by id
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      console.log('responseData', responseData)

      const main = async () => {
        const departament = await prisma.Departaments.findUnique({
          where: {
            id: responseData.data.id,
          },
        });

        if (departament) {
          res.write(JSON.stringify({ departament }));
          res.end();
        } else {
          res.writeHead(404);
          res.write(
            JSON.stringify({
              error: "Departament not found",
            })
          );
          res.end();
        }
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

  updateDepartament: async (responseData, res) => {
    /**
     * use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then update departaments by id
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const data = responseData.data;

      const main = async () => {
        const departament = await prisma.Departaments.update({
          where: {
            id: responseData.data.id,
          },
          data: {
            ...data,
          },
        });

        res.write(JSON.stringify({ departament }));
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

  deleteDepartament: async (responseData, res) => {
    /**
     * use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then delete departaments by id
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const main = async () => {
        const departament = await prisma.Departaments.findUnique({
          where: {
            id: responseData.data.id,
          },
        });

        if (departament) {
          const deletedDepartament = await prisma.Departaments.delete({
            where: {
              id: responseData.data.id,
            },
          });

          res.write(JSON.stringify({ deletedDepartament }));
          res.end();
        } else {
          res.writeHead(404);
          res.write(
            JSON.stringify({
              error: "Departament not found",
            })
          );
          res.end();
        }
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
};

export default DepartamentsControllers;