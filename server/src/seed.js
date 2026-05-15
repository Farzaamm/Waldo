const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seeding...');

  // Clear existing characters (optional)
  await prisma.character.deleteMany();

  await prisma.character.createMany({
    data: [
      {
        name: "Waldo",
        xMin: 60.60,
        xMax: 61.60,
        yMin: 34.20,
        yMax: 38.20,
      },
      // I can add more characters later
      // {
      //   name: "Wizard",
      //   xMin: 45.0,
      //   xMax: 52.0,
      //   yMin: 55.0,
      //   yMax: 65.0,
      // }
    ],
    skipDuplicates: true,
  });

  console.log('✅ Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });