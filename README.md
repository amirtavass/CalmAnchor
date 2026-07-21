# CalmAnchor Lite

A cross-platform mobile application prototype based on the CalmAnchor CPTSD toolkit workflow.

The project demonstrates a fixed-scenario appointment management system where a single doctor can manage patient information and a daily appointment schedule. The application focuses on relational database design, CRUD operations, and appointment slot management while ensuring that unavailable appointment times are not presented as selectable options.

---

## Project Documentation

All project design and architecture documentation is maintained inside the `/docs` directory.

Current documentation includes:

- [Database Schema & ERD](./docs/database-schema.md)

- [User Journey](./docs/user-journey.md)

- [Screen Map & Navigation](./docs/screen-map.md)

- [System Architecture](./docs/system-architecture.md)

- [Appointment Scheduling Logic](./docs/scheduling-logic.md)

Together, these documents describe the application's database design, navigation flow, scheduling logic, and overall architecture throughout development.

## Architecture Diagram

The architecture diagram illustrates how CalmAnchor Lite is organised into distinct layers to separate user interface logic from data access. Screens interact with dedicated Supabase service modules rather than communicating directly with the database, while PostgreSQL constraints enforce data integrity independently of the application. This layered structure improves maintainability, keeps responsibilities clearly separated, and allows each feature to evolve without tightly coupling the UI to the backend.

- [App-architecture](./docs/images/app-architecture.png)

## Architecture

CalmAnchor Lite follows a layered React Native architecture consisting of a Presentation Layer and a Data Layer.

The Presentation Layer contains the application's screens, reusable components, and navigation. React Navigation manages movement between the Day Schedule, Patient List, and Patient Detail screens, while the Data Layer communicates with Supabase through dedicated service modules, keeping database operations separate from the user interface.

This structure was implemented during Phase 1 and provides the foundation for the remaining development phases.

---

## Database Choice

The application uses Supabase (PostgreSQL) as its cloud database.

The schema consists of three core entities:

- Doctor
- Patient
- Appointment

Database integrity is enforced through foreign keys, UNIQUE constraints and CHECK constraints. Appointment scheduling rules such as fixed 20-minute appointments, working hours and prevention of duplicate bookings are validated by PostgreSQL rather than relying only on frontend validation.

The database was seeded with one doctor, five patients and five appointments to support development and testing.

## Technology Stack

- React Native
- TypeScript
- Supabase PostgreSQL
- React Navigation
- React Context for state management

React Context was selected because the application scope is intentionally limited to a single doctor managing one working day. A lightweight state management approach avoids unnecessary complexity while meeting the project requirements.

---

## Key Features

- View today's appointments
- Browse all patients
- View patient medical history
- Reschedule appointments
- Automatic prevention of double booking
- Doctor profile screen

---

## Development Workflow

The project will follow a structured Git workflow using feature branches.

Planned development stages:

1. Project documentation and architecture design ✅
2. Database integration and initial data setup ✅
3. Day Schedule screen with live appointment data retrieved from Supabase ✅
4. Patient management (Patient List, Patient Detail and navigation) ✅
5. Appointment rescheduling ✅
6. Final testing and Android build preparation ✅

Each major feature will be developed in its own branch and merged into `main` only when the feature is complete and stable.

---

## 🤖 Agent Usage Disclosure

AI-assisted tools were used throughout the development process to support learning and implementation.

Google Gemini was primarily used to help break down the project requirements into manageable development phases and implementation tasks.
ChatGPT was used to deepen understanding of React Native concepts, including components, hooks, navigation patterns, and TypeScript usage, as well as to clarify implementation details during development.

All AI-generated suggestions and code were carefully reviewed, tested, and adapted before being incorporated into the project. The final implementation, architecture, documentation, and design decisions were validated to ensure they met the project requirements and reflected the author's understanding.
