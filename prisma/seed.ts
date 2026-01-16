import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.treatment.deleteMany();
  await prisma.patient.deleteMany();

  // Create multiple patients
  const john = await prisma.patient.create({
    data: {
      name: "John Doe",
      age: 35,
      email: "john.doe@example.com",
    },
  });

  const jane = await prisma.patient.create({
    data: {
      name: "Jane Smith",
      age: 28,
      email: "jane.smith@example.com",
    },
  });

  const robert = await prisma.patient.create({
    data: {
      name: "Robert Johnson",
      age: 42,
      email: "robert.j@example.com",
    },
  });

  const emma = await prisma.patient.create({
    data: {
      name: "Emma Wilson",
      age: 31,
      email: "emma.wilson@example.com",
    },
  });

  const michael = await prisma.patient.create({
    data: {
      name: "Michael Brown",
      age: 45,
      email: "michael.brown@example.com",
    },
  });

  // Create diverse treatments with different types and dates
  await prisma.treatment.createMany({
    data: [
      // John Doe treatments
      {
        patientId: john.id,
        type: "Cleaning",
        date: new Date("2024-12-15"),
        notes: "Routine professional cleaning",
      },
      {
        patientId: john.id,
        type: "Filling",
        date: new Date("2024-11-20"),
        notes: "Cavity on tooth #14 filled with composite",
      },
      {
        patientId: john.id,
        type: "Root Canal",
        date: new Date("2024-10-10"),
        notes: "Root canal treatment on tooth #16",
      },
      {
        patientId: john.id,
        type: "Checkup",
        date: new Date("2025-01-05"),
        notes: "Regular dental examination, all good",
      },
      {
        patientId: john.id,
        type: "Whitening",
        date: new Date("2024-09-30"),
        notes: "Professional teeth whitening treatment",
      },

      // Jane Smith treatments
      {
        patientId: jane.id,
        type: "Checkup",
        date: new Date("2024-12-20"),
        notes: "Six-month routine checkup",
      },
      {
        patientId: jane.id,
        type: "Cleaning",
        date: new Date("2024-12-20"),
        notes: "Scaling and polishing",
      },
      {
        patientId: jane.id,
        type: "Extraction",
        date: new Date("2024-08-15"),
        notes: "Wisdom tooth extraction (upper left)",
      },
      {
        patientId: jane.id,
        type: "Braces Adjustment",
        date: new Date("2025-01-10"),
        notes: "Monthly orthodontic adjustment",
      },
      {
        patientId: jane.id,
        type: "Fluoride Treatment",
        date: new Date("2024-10-05"),
        notes: "Fluoride coating for enamel protection",
      },

      // Robert Johnson treatments
      {
        patientId: robert.id,
        type: "Root Canal",
        date: new Date("2024-11-15"),
        notes: "Complex root canal treatment",
      },
      {
        patientId: robert.id,
        type: "Crown Placement",
        date: new Date("2024-12-01"),
        notes: "Porcelain crown on tooth #8",
      },
      {
        patientId: robert.id,
        type: "Cleaning",
        date: new Date("2024-12-10"),
        notes: "Deep cleaning due to gum disease",
      },
      {
        patientId: robert.id,
        type: "Gum Treatment",
        date: new Date("2024-09-20"),
        notes: "Scaling and root planing for periodontitis",
      },

      // Emma Wilson treatments
      {
        patientId: emma.id,
        type: "Checkup",
        date: new Date("2024-12-18"),
        notes: "Regular checkup, minor plaque buildup",
      },
      {
        patientId: emma.id,
        type: "Filling",
        date: new Date("2024-10-22"),
        notes: "Small cavity on tooth #27",
      },
      {
        patientId: emma.id,
        type: "Whitening",
        date: new Date("2024-11-08"),
        notes: "At-home whitening kit provided",
      },
      {
        patientId: emma.id,
        type: "Veneers Consultation",
        date: new Date("2025-01-08"),
        notes: "Discussed cosmetic veneers for front teeth",
      },

      // Michael Brown treatments
      {
        patientId: michael.id,
        type: "Extraction",
        date: new Date("2024-12-05"),
        notes: "Extraction of tooth #18 (wisdom tooth)",
      },
      {
        patientId: michael.id,
        type: "Implant Consultation",
        date: new Date("2024-12-20"),
        notes: "Discussed dental implant options",
      },
      {
        patientId: michael.id,
        type: "Cleaning",
        date: new Date("2024-09-15"),
        notes: "Professional cleaning and polishing",
      },
      {
        patientId: michael.id,
        type: "Gum Treatment",
        date: new Date("2024-08-10"),
        notes: "Gum disease management treatment",
      },
      {
        patientId: michael.id,
        type: "Checkup",
        date: new Date("2025-01-12"),
        notes: "Post-extraction followup examination",
      },
    ],
  });

  console.log("Database seeded successfully with 5 patients and 24 treatments!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
