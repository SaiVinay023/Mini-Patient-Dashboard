# Mini Patient Dashboard

A modern web application for managing patient information and treatment history. Built with Next.js 16, React 19, and Prisma ORM with SQLite database.

## 📱 Responsive Design

This dashboard is fully responsive using **Tailwind CSS** with a mobile-first approach, providing an optimal experience across all devices.

### Device Breakpoints

| Device | Width | Layout |
|--------|-------|--------|
| Mobile | 320-640px | Single column, stacked |
| Tablet | 640-1024px | Two columns side-by-side |
| Desktop | 1024px+ | Three columns with sticky sidebar |

### Mobile-First Architecture

All responsive classes follow the mobile-first principle:

```tsx
// Mobile default, enhanced for larger screens
<div className="text-sm sm:text-base md:text-lg">
<div className="p-4 sm:p-5 md:p-6">
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">


## 🎯 Features

- ✅ **Patient Management** - View and manage patient records
- ✅ **Treatment Tracking** - Track treatment history for each patient
- ✅ **Real-time Search** - Filter treatments by type and date
- ✅ **Responsive Design** - Works on desktop and mobile devices
- ✅ **RTK Query** - Efficient data fetching and caching with Redux Toolkit Query
- ✅ **Type-Safe** - Full TypeScript support

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 16.1.2 (App Router)
- **UI Library:** React 19.2.3
- **State Management:** Redux Toolkit 2.11.2
- **Data Fetching:** RTK Query
- **Styling:** Tailwind CSS
- **Language:** TypeScript 5.9.3

### Backend
- **API:** Next.js API Routes (App Router)
- **Runtime:** Node.js

### Database
- **ORM:** Prisma 6.14.0
- **Database:** SQLite via Prisma ORM
- **Models:** Patient, Treatment

## 📋 Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/SaiVinay023/Mini-Patient-Dashboard.git
cd Mini-Patient-Dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the project root:

```bash
echo 'DATABASE_URL="file:./dev.db"' > .env
```

### 4. Initialize Database

First, generate the Prisma client:
```bash
npm run prisma:generate
```

Then create the database tables:
```bash
npm run prisma:migrate
```

Finally, Seed sample data:
```bash
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
Mini-Patient-Dashboard/
├── src/
│   ├── app/
│   │   ├── api/                          # API Routes (App Router)
│   │   │   └── patients/
│   │   │       ├── route.ts              # GET /api/patients
│   │   │       └── [id]/treatments/
│   │   │           └── route.ts          # GET /api/patients/[id]/treatments
│   │   ├── layout.tsx                    # Root layout with Redux Provider
│   │   ├── page.tsx                      # Home page
│   │   └── providers.tsx                 # Redux store provider
│   ├── components/
│   │   ├── PatientCard.tsx              # Patient list item component
│   │   └── TreatmentList.tsx            # Treatment display component 
│   ├── features/
│   │   └── patients/
│   │       └── patientsApi.ts           # RTK Query API slices
│   ├── lib/
│   │   └── prisma.ts                    # Prisma client singleton
│   ├── redux/
│   │   └── store.ts                     # Redux store configuration
│   ├── types/
│   │   ├── patient.ts                   # Patient interface
│   │   └── treatment.ts                 # Treatment interface
│   └── utils/                            # NEW FOLDER
│       └── filterTreatments.ts          # Treatment filtering logic
├── prisma/
│   ├── schema.prisma                    # Database schema
│   ├── migrations/                      # Database migrations
│   └── seed.ts                          # Seed script
├── .env                                 # Environment variables 
├── package.json
├── tsconfig.json
└── next.config.js

```

## 🔌 API Endpoints

### Get All Patients

**GET** `/api/patients`

Response:
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "age": 30,
    "email": "john@example.com"
  },
  {
    "id": 2,
    "name": "Jane Smith",
    "age": 25,
    "email": "jane@example.com"
  }
]
```

### Get Patient Treatments

**GET** `/api/patients/{id}/treatments`

Example: `GET /api/patients/1/treatments`

Response:
```json
[
  {
    "id": 1,
    "patientId": 1,
    "type": "Cleaning",
    "date": "2025-01-01T00:00:00.000Z",
    "notes": "Routine cleaning"
  },
  {
    "id": 2,
    "patientId": 1,
    "type": "Filling",
    "date": "2025-02-01T00:00:00.000Z",
    "notes": "Cavity filled"
  }
]
```

## 📊 Database Schema

### Patient Model
```prisma
model Patient {
  id         Int          @id @default(autoincrement())
  name       String
  age        Int
  email      String?
  treatments Treatment[]
}
```

### Treatment Model
```prisma
model Treatment {
  id         Int          @id @default(autoincrement())
  patientId  Int
  type       String
  date       DateTime
  notes      String?
  patient    Patient  @relation(fields: [patientId], references: [id])
}
```

## 🎨 UI Components

### PatientCard
Displays individual patient information with selection state.
- Props: `patient`, `isSelected`, `onClick`
- Shows: Patient name, age, email

### TreatmentList
Displays treatment history with filtering capabilities.
- Props: `patientId`
- Features: Filter by treatment type and date
- Shows: Treatment type, date, and notes

## 📦 Available Scripts

```bash
# Development
npm run dev              # Start dev server at http://localhost:3000

# Build & Production
npm run build            # Create production build
npm run start            # Start production server

# Database
npm run prisma:generate # Generate Prisma client
npm run prisma:migrate  # Run database migrations
npm run seed            # Seed database with sample data
```

## 🐛 Troubleshooting

### Error: "PrismaClientInitializationError"
**Solution:** Make sure `.env` exists with `DATABASE_URL="file:./dev.db"`

### Error: "relation 'Patient' does not exist"
**Solution:** Run database migrations:
```bash
npm run prisma:migrate
```

### Error: "Cannot GET /api/patients"
**Solution:** Ensure API routes exist in `src/app/api/` directory and dev server has reloaded.

### Treatments not loading (400 Bad Request)
**Solution:** Ensure the treatments route file has proper async params handling:
```typescript
{ params }: { params: Promise<{ id: string }> }
const { id } = await params;
```

## Browser Support

✓ Chrome/Chromium (latest)
✓ Firefox (latest)
✓ Safari (latest)
✓ Edge (latest)
✓ Mobile browsers (iOS Safari, Chrome Mobile)


## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Set environment variable in Vercel dashboard: `DATABASE_URL="file:./dev.db"`
4. Deploy!

### Deploy to Other Platforms

For production deployments, consider using a hosted database instead of SQLite:
- **PostgreSQL** - `DATABASE_URL="postgresql://user:password@localhost/dbname"`
- **MySQL** - `DATABASE_URL="mysql://user:password@localhost/dbname"`
- **MongoDB** - `DATABASE_URL="mongodb://connection-string"`

Update `prisma/schema.prisma` to match your database provider.

### What's Implemented
- Read-only patient and treatment views (no create/update/delete)
- Search and filter by treatment type and date (using both simultaneously)
- Fully responsive UI (mobile & desktop)
- Type-safe API responses with TypeScript
- Implemented Prisma ORM, can be scalable


### Demo Limitations
- No authentication/authorization
- No create/update/delete operations (read-only API)
- SQLite for simplicity (suitable for dev; use PostgreSQL for production)
- Sample data seeded on first migration
- All timestamps stored in UTC
- Email field is optional

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC License - See LICENSE file for details

## 👨‍💻 Author

**Saivinay Manda**
- GitHub: [@SaiVinay023](https://github.com/SaiVinay023)
- Email: saivinay023@gmail.com

## 🆘 Need Help?

If you encounter issues:

1. Check the **Troubleshooting** section above
2. Review Next.js documentation: [https://nextjs.org/docs](https://nextjs.org/docs)
3. Check Prisma documentation: [https://www.prisma.io/docs](https://www.prisma.io/docs)
4. Open an issue on GitHub

---

**Last Updated:** January 16, 2026
**Next.js Version:** 16.1.2
**Node Version:** 18+
