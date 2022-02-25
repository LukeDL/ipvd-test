import Prisma from "@prisma/client";
import bcrypt from "bcrypt";
import utils from "../utils.js";

const UsersControllers = {
  controllerTest: (req, res) => {
    res.write("Hello from the controller");
    res.end();
  },

  login: (responseData, res, headers) => {
    const { PrismaClient } = Prisma;
    const prisma = new PrismaClient();

    console.log('responseData:', responseData)

    const { email, password } = responseData.data;

    /**
     * load data from the database using Prisma
     */

    async function main() {
      const user = await prisma.Users.findFirst({
        where: {
          email,
        },
      });

      if (user) {
        bcrypt.compare(password, user.password, async (err, result) => {
          if (result) {
            const session = await prisma.Sessions.create({
              data: {
                users: {
                  connect: {
                    uuid: user.uuid,
                  },
                },
                expires: new Date(Date.now() + 3600000),
              },
            });

            /**
             * return the session id cookie
             *
             */
            console.log('login headers:', headers)
            res.writeHead(200, {
              ...headers,
              "Set-Cookie": `sessionId=${session.sessionId}; Max-Age=3600; Path=/`, // 1 hour
              "Content-Type": "text/plain",
            });

            res.write(
              JSON.stringify({
                session: { id: session.sessionId, expires: session.expires },
                
              })
            );
            res.end();
          } else {
            res.write(
              JSON.stringify({
                error: "Invalid username or password",
              })
            );
          }
          res.end();
        });
      } else {
        res.write(
          JSON.stringify({
            error: "Invalid username or password",
          })
        );
        res.end();
      }
    }

    main()
      .catch((e) => console.error(e))
      .finally(async () => {
        await prisma.$disconnect();
      });
  },

  protected: (responseData, res, headers) => {
    if (utils().checkSession(responseData.cookies)) {
      console.log("responseData:", responseData);

      res.writeHead(200, headers)
      res.write("Hello from the protected");
      res.end();
    } else {
      res.writeHead(401, headers);
      res.write(
        JSON.stringify({
          error: "Invalid session",
        })
      );
      res.end();
    }
  },

  createUser: (responseData, res) => {
    /***
     * Use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then create a new user
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const { email, password } = responseData.data;

      async function main() {
        const user = await prisma.Users.findFirst({
          where: {
            email,
          },
        });

        if (!user) {
          const hashedPassword = await bcrypt.hash(password, 10);

          const newUser = await prisma.Users.create({
            data: {
              email,
              password: hashedPassword,
            },
          });
          res.writeHead(200, headers)
          res.write(
            JSON.stringify({
              user: newUser,
            })
          );
          res.end();
        } else {
          res.write(
            JSON.stringify({
              error: "User already exists",
            })
          );
          res.end();
        }
      }

      main()
        .catch((e) => console.error(e))
        .finally(async () => {
          await prisma.$disconnect();
        });
      return;
    }
    res.writeHead(401, headers);
    res.write(
      JSON.stringify({
        error: "Invalid session",
      })
    );
    res.end();
  },

  getUser: (responseData, res) => {
    /**
     * Use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then get the user
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const { uuid } = responseData.data;

      async function main() {
        const user = await prisma.Users.findFirst({
          where: {
            uuid,
          },
          select: {
            firstName: true,
            lastName: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            departament: {
              select: {
                id: true,
                name: true,
                costCenter: {
                  select: {
                    id: true,
                    name: true,
                  },
                },
              },
            },
          },
        });
        res.writeHead(200, headers)
        res.write(
          JSON.stringify({
            user,
          })
        );
        res.end();
      }

      main()
        .catch((e) => console.error(e))
        .finally(async () => {
          await prisma.$disconnect();
        });
      return;
    }
    res.writeHead(401, headers);
    res.write(
      JSON.stringify({
        error: "Invalid session",
      })
    );
    res.end();
  },

  updateUser: (responseData, res) => {
    /**
     * Use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then update the user with the
     * json fields that are passed in the request
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const { uuid, ...data } = responseData.data;

      async function main() {
        const user = await prisma.Users.findFirst({
          where: {
            uuid,
          },
        });

        if (user) {
          const updatedUser = await prisma.Users.update({
            where: {
              uuid,
            },
            data,
          });
          res.writeHead(200, headers)
          res.write(
            JSON.stringify({
              user: updatedUser,
            })
          );
          res.end();
        } else {
          res.write(
            JSON.stringify({
              error: "User does not exist",
            })
          );
          res.end();
        }
      }

      main()
        .catch((e) => console.error(e))
        .finally(async () => {
          await prisma.$disconnect();
        });
      return;
    }
    res.writeHead(401, headers);
    res.write(
      JSON.stringify({
        error: "Invalid session",
      })
    );
    res.end();
  },

  deleteUser: (responseData, res) => {
    /**
     * Use utils.checkSession to check if the user is logged in
     * and if the user is logged in, then delete the user
     */

    if (utils().checkSession(responseData.cookies)) {
      const { PrismaClient } = Prisma;
      const prisma = new PrismaClient();

      const { uuid } = responseData.data;

      async function main() {
        const user = await prisma.Users.findFirst({
          where: {
            uuid,
          },
        });

        if (user) {
          const deletedUser = await prisma.Users.delete({
            where: {
              uuid,
            },
          });
          res.writeHead(200, headers)
          res.write(
            JSON.stringify({
              user: deletedUser,
            })
          );
          res.end();
        } else {
          res.write(
            JSON.stringify({
              error: "User does not exist",
            })
          );
          res.end();
        }
      }

      main()
        .catch((e) => console.error(e))
        .finally(async () => {
          await prisma.$disconnect();
        });
      return;
    }
    res.writeHead(401, headers);
    res.write(
      JSON.stringify({
        error: "Invalid session",
      })
    );
    res.end();
  },
};

export default UsersControllers;
