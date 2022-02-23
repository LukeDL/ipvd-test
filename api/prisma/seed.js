import Prisma from "@prisma/client";
import bcrypt from "bcrypt";

const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

async function main() {
  await bcrypt.hash("!Q2w3e4r", 10, async (err, hash) => {
    const costCenter = await prisma.CostCenters.upsert({
      where: {
        code: "CC1",
      },
      update: {},
      create: {
        code: "CC1",
        name: "Cost Center 1",
        departaments: {
          create: [
            {
              name: "Administration",
              users: {
                create: [
                  {
                    firstName: "Administrator",
                    lastName: "of the System",
                    email: "mail@system.com",
                    password: hash,
                  },
                ],
              },
            },
          ],
        },
      },
    });
  });
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
