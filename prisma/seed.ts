import { PrismaClient } from "@prisma/client";

import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

// Dans la function `main`, je fais un code pour créer 10 utilisateurs qui ont chacun 1 cours et 100 relations entre les cours et les utilisateurs en tant qu'élèves.

const main = async () => {
  const users = await prisma.user.findMany();

  for (const user of users) {
    try {
      await prisma.courseOnUser.create({
        data: {
          courseId: "clovt4jfi0000ukcgs06n0cvm",
          userId: user.id,
        },
      });
    } catch (error) {}
  }
};

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    // eslint-disable-next-line no-console
    console.error(error);

    await prisma.$disconnect();

    process.exit(1);
  });
