import { prisma } from "./prisma.config";

async function main() {
  await prisma.patient.create({
    data: { name: "John Doe", age: 30, email: "john@example.com" },
  });

  await prisma.treatment.create({
    data: {
      patientId: "some-patient-id",
      type: "Checkup",
      date: new Date(),
      notes: "Initial consultation",
    },
  });
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
