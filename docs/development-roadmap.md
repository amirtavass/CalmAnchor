# CalmAnchor Lite: Development Roadmap

This is the development plan for CalmAnchor Lite. The application will be incrementally developed with feature branches, and when each feature is in a stable and functional state, it will be implemented, tested, documented and merged into the `main` branch.

---

## Development Philosophy

This project is an incremental project meaning it is designed to build usefulness first rather than aesthetics. As each stage is implemented, tested and documented, it extends the stability of the codebase through the development process.

### AI-Assisted Development

This development roadmap was initially drafted with assistance from Google Gemini to help structure the implementation phases. During development, AI tools were also used to support documentation, generate implementation ideas, and review code. All generated content was manually reviewed, tested, modified where necessary, and integrated into the project by the author.

### Definition of Done

A phase is considered complete when the implementation has been verified, documented, committed on its own feature branch, and merged into main.

---

# Proposed Project Structure

The application is organized around features to ensure related code together and encourage separation of concerns.

```text
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
├── hooks/            # Custom React hooks
├── types/            # TypeScript interfaces
├── utils/            # Shared helper functions
└── lib/
    └── supabase.ts   # Supabase client configuration
```

---

## ⚖️ Architectural Trade-offs

| Decision                  | Alternatives Considered  | Rationale                                                                                                                       |
| :------------------------ | :----------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| **Supabase (PostgreSQL)** | Firebase, MongoDB        | PostgreSQL provides relational modelling, foreign keys, and database constraints required for appointment scheduling.           |
| **React Context**         | Redux Toolkit            | The application scope is relatively small, so React Context provides sufficient state management without additional complexity. |
| **Feature Branches**      | Direct commits to `main` | Feature branches provide clearer traceability, safer integration, and a cleaner project history.                                |

---

# Development Phases

## Phase 1: Repository Foundation & Database Setup ✅

Established the project foundation by configuring the React Native application, deploying the database schema, and creating a reproducible seed dataset.

Configured the React Native (Expo) project and connected the Supabase cloud instance.

Deployed the database schema and verified core constraints via manual SQL testing.

Confirmed the baseline seed data (1 doctor, 5 patients, 5 appointments).

Finalized Phase 1 architecture and database documentation to match the implementation.

## Phase 2: Day Schedule ✅

Built the Day Schedule screen to display live, relational appointment data from Supabase.

Implemented the core UI with safe-area handling and three explicit states (Loading, Error, Empty).

Resolved timezone offset issues by querying against the client's local date (en-CA) instead of relying on UTC dates.

Verified the shape of the relational data returned by Supabase, confirming that each appointment is associated with a single patient object.

Merged the feature branch to main with zero console errors.

## Phase 3: Patient Management

Introduce the Patient List and Patient Detail screens for reviewing medical information.

Implement navigation between the broader patient list and specific detail screens.

Retrieve live patient history and appointment data from the database.

Update documentation as required and merge the stable feature branch into main.

## Phase 4: Appointment Rescheduling

Implements core scheduling logic to allow rescheduling while preventing double bookings.

Generate 24 daily slots, exclude currently booked slots, and present remaining available options.

Save appointment changes while maintaining database integrity.

Verify scheduling behavior matches the documented workflow and merge into main.

## Phase 5: Application Integration

Connect individual features through the application navigation to complete the user workflow.

Ensure end-to-end navigation functions correctly across all screens.

Implement comprehensive, graceful loading and error states across the entire application flow.

Conduct full workflow testing before merging the final feature branch into main.

## Phase 6: Final Testing & Delivery

Prepares the project for final submission and evaluation.

Generate the standalone Android APK build.

Finalize the README, supporting architecture documentation, and AI usage disclosures.

Record the final demonstration video and merge all delivery assets into main.

---
