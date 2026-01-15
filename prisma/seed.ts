import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.treatment.deleteMany();
  await prisma.patient.deleteMany();

  const john = await prisma.patient.create({
    data: {
      name: "John Doe",
      age: 30,
      email: "john@example.com",
    },
  });

  const jane = await prisma.patient.create({
    data: {
      name: "Jane Smith",
      age: 25,
      email: "jane@example.com",
    },
  });

  await prisma.treatment.createMany({
    data: [
      {
        patientId: john.id,
        type: "Cleaning",
        date: new Date("2025-01-01"),
        notes: "Routine cleaning",
      },
      {
        patientId: john.id,
        type: "Filling",
        date: new Date("2025-02-01"),
        notes: "Cavity filled",
      },
      {
        patientId: jane.id,
        type: "Checkup",
        date: new Date("2025-03-01"),
        notes: "Routine checkup",
      },
    ],
  });

  console.log("Database seeded successfully");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
