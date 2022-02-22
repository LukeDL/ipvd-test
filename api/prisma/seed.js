import Prisma from "@prisma/client";
import bcrypt from "bcrypt";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

async function main() {
  /** create test user */

	bcrypt.hash("test", 10, async (err, hash) => {

    const user = await prisma.Users.create({
    data: {
      firstName: "Testivaldo",
      lastName: "Testingson",
      email: "test@test.com",
      password: hash,
    },
    });

  });



}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
	await prisma.$disconnect();
  });
