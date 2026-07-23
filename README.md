# CalmAnchor Lite

A cross-platform mobile application prototype based on the CalmAnchor CPTSD toolkit workflow.

The project implements a fixed-scenario appointment management system for a single doctor managing one working day. It focuses on relational database design, CRUD operations, and appointment rescheduling while ensuring that unavailable appointment slots are never presented to the user.

---

## Project Documentation

All project design and architecture documentation is maintained inside the `/docs` directory.

Current documentation includes:

- [Development Roadmap](./docs/development-roadmap.md)

- [Database Schema & ERD](./docs/database-schema.md)

- [Verification Log](./docs/verification-log.md)

- [User Journey](./docs/user-journey.md)

- [Screen Map & Navigation](./docs/screen-map.md)

- [System Architecture](./docs/app-architecture.md)

- [Appointment Scheduling Logic](./docs/scheduling-logic.md)

Together, these documents describe the application's database design, navigation flow, scheduling logic, and overall architecture development.

## Architecture Diagram

The architecture diagram shows how CalmAnchor is organised into distinct layers to separate user interface logic from data access.Screens never communicate directly with Supabase. Instead, all database access is encapsulated within service modules that consume a shared Supabase client configured in src/lib/supabase.ts. This layered structure improves maintainability, keeps responsibilities clearly separated, and allows each feature to evolve without tightly coupling the UI to the backend.

![Application Architecture](./docs/images/app-architecture.png)

## Architecture & State Management

CalmAnchor Lite is built on a clean, layered React Native architecture that intentionally separates the Presentation Layer from the Data Layer.

The Presentation Layer handles everything the user interacts with. React Navigation manages stack movement across all five integrated screens:

1. **Day Schedule** (Home & Central Hub)
2. **Patient List**
3. **Patient Detail**
4. **Change Appointment** (Rescheduling Form)
5. **Settings** (Doctor Profile)

Behind the scenes, the Data Layer uses dedicated service modules to talk to Supabase, keeping all database queries neatly isolated from the frontend code.

### State Management Strategy

State is managed strictly in the components using React hooks (`useState`, `useEffect`, and `useFocusEffect`). Because data requirements are tied to specific screens and cross-screen context is cleanly passed via React Navigation route parameters (such as `patientId` or `appointmentId`).

### Architectural Evolution Across Phases

The foundational data layer and database client were established in Phases 1 & 2, core stack navigation was implemented in Phase 3, appointment rescheduling state logic was added in Phase 4, and final end-to-end navigation assembly was completed in Phase 5.

## Database Choice

The application uses Supabase (PostgreSQL) as its cloud database.

The schema consists of three core entities:

- Doctor
- Patient
- Appointment

To keep our data perfectly reliable, the database relies on strict rules like foreign keys, `UNIQUE`, and `CHECK` constraints. This means our core scheduling logic—like enforcing exactly 20-minute sessions, respecting clinic hours, and preventing double-bookings—is securely locked down at the PostgreSQL level, acting as a robust backup to our frontend validation.

The database was seeded with one doctor, five patients, and five appointments to support development and testing.

## Technology Stack

- React Native (Expo)
- TypeScript
- Supabase (PostgreSQL)
- React Navigation (Native Stack Navigator)

---

## Key Features

- View today's appointments
- Browse all patients
- View patient medical history
- Reschedule appointments with a real-time slot algorithm
- Automatic prevention of double booking
- Doctor profile screen

We handle appointment availability using a two-step approach. On the surface, the UI proactively hides booked time slots to give users a smooth, frictionless scheduling experience. Behind the scenes, the PostgreSQL database acts as the ultimate safety net, guaranteeing that no conflicting or invalid appointments can ever actually be saved.

---

# Project Structure

The application is organized around features to ensure related code together and encourage separation of concerns.

```text
App.tsx
docs/
src/
├── components/       # Reusable UI components
├── navigation/       # Stack and tab navigation
├── screens/
│   ├── DaySchedule/
│   ├── PatientList/
│   ├── PatientDetail/
│   ├── ChangeAppointment/
│   └── Settings/
├── services/
│   └── supabase/
│       ├── appointments.ts
│       ├── patients.ts
│       └── doctor.ts
├── types/            # TypeScript interfaces
├── utils/            # Shared helper functions
└── lib/
    └── supabase.ts   # Supabase client configuration
```

---

## Development Workflow

The project followed a feature-branch workflow inspired by Git Flow.

To keep a clean main branch, every major feature and documentation update was implemented on an isolated feature branch. These branches were thoroughly tested and reviewed before being merged into `main` via Pull Requests. Merged branches were subsequently deleted to maintain repository hygiene.

Examples of executed feature branches include:

- `feature/day-schedule`
- `feature/patient-management`
- `feature/change-appointment-form`
- `feature/application-assembly`
- `docs/phase4-documentation`

Completed development stages:

1. Project documentation and architecture design ✅
2. Database integration and initial data setup ✅
3. Day Schedule screen with live appointment data retrieved from Supabase ✅
4. Patient management (Patient List, Patient Detail, and navigation) ✅
5. Appointment rescheduling logic and collision algorithm ✅
6. Application assembly, final testing, and Android build preparation ✅

Each major feature was developed in its own feature branch and merged into `main` only after feature completion, manual testing, and verification logging.

---

## 🤖 Agent Usage Disclosure

AI-assisted tools were used throughout the development process to support planning, learning, implementation, and documentation.

- **Google Gemini:** Utilized for project planning, breaking down academic rubric requirements into structured development phases, generating step-by-step implementation guides, drafting code architectures, writing technical documentation, and organizing git commit strategies.
- **ChatGPT:** Utilized to deepen understanding of React Native concepts (including navigation stack patterns, component lifecycles, and TypeScript typing), troubleshoot environment and build configurations, and clarify debugging logic during development.

All AI-generated suggestions, code snippets, documentation, and architectural recommendations were reviewed, adapted where necessary, tested locally, and only incorporated after they were fully understood and validated against the project requirements.
