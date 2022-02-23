import Prisma from "@prisma/client";

const utils = () => {
  const concatChunkData = async (req) => {
    const buffers = [];

    for await (const chunk of req) {
      buffers.push(chunk);
    }

    const data = Buffer.concat(buffers).toString();

    if (!data) {
      return null;
    }

    return JSON.parse(data);
  };

  /**
   * reads the cookies from the request and return a object with the cookies
   */

  const parseCookies = (req) => {
    const cookies = {};

    if (req.headers.cookie) {
      req.headers.cookie.split(";").forEach((cookie) => {
        let [name, ...rest] = cookie.split("=");

        name = name?.trim();

        if (!name) return;

        const value = rest.join("=").trim();

        if (!value) return;

        cookies[name] = decodeURIComponent(value);
      });
      return cookies;
    } else {
      return null;
    }
  };

  const checkSession = (cookies) => {

    const { PrismaClient } = Prisma;
    const prisma = new PrismaClient();

    console.log('cookies:', cookies)
    console.log('cookies.session:', cookies.session)
    
    if (cookies && cookies.sessionId) {

      const sessionId = cookies.sessionId;

      const session = prisma.Sessions.findFirst({
        where: {
          sessionId,
        }
      });

      if (session) {
        // check if the session is expired
        if (session.expires < new Date()) {
          return false;
        } else  {
          return true;
        }
      } else {
        return false;
      }
        


    } else {
      return false;
    }
  };

  return { concatChunkData, parseCookies, checkSession };
};

export default utils;
