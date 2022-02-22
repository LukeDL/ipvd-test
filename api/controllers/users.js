import Prisma from "@prisma/client";
import bcrypt from "bcrypt";
import utils from "../utils.js";

const UsersControllers = {
  controllerTest: (req, res) => {
    res.write("Hello from the controller");
    res.end();
  },

  login: (responseData, res) => {
    const { PrismaClient } = Prisma;
    const prisma = new PrismaClient();

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

            res.writeHead(200, {
              "Set-Cookie": `sessionId=${session.sessionId}; HttpOnly; Max-Age=3600; Path=/`, // 1 hour
              "Content-Type": "text/plain",
            });

            res.write(
              JSON.stringify({
                session: session.sessionId,
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

  protected: (responseData, res) => {
    if (utils().checkSession(responseData.cookies)) {
      console.log("responseData:", responseData);

      res.write("Hello from the protected");
      res.end();
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

export default UsersControllers;
