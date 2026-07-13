# CalmAnchor Lite: Development Roadmap

This document describes the planned development approach for CalmAnchor Lite. The application will be developed incrementally using feature branches, allowing each completed feature to be implemented, verified, documented, and merged into `main` only when it is in a stable, working state.

---

## 🧠 Development Philosophy

The project follows an incremental approach where functionality takes priority over visual refinement. Each stage builds on the previous one, with implementation, testing, and documentation progressing together to keep the codebase stable throughout development.

### Core Engineering Principles

- **Continuous Integration:** Every merge into `main` should leave the application in a stable, deployable state.
- **Traceability:** Every completed feature should be supported by clear implementation, documentation, and Git history.
- **Thoughtful Design:** Technical decisions should be justified, with alternative approaches considered where appropriate.
- **Living Documentation:** Documentation is maintained alongside development rather than being completed at the end of the project.
- **Data Integrity:** Validation should be enforced by the database wherever practical, reducing reliance on application-level checks alone.

### AI-Assisted Development

AI tools may be used to assist with boilerplate code, documentation, and implementation ideas. All generated content will be reviewed, tested, and refactored where necessary before becoming part of the project. Any AI assistance used during development will be disclosed in the project documentation.

### Definition of Done

A feature is considered complete when it:

- Delivers the intended functionality.
- Has been verified using the seeded application data.
- Is committed on its own feature branch.
- Includes any necessary documentation updates.
- Builds successfully without introducing regressions.
- Has been merged into `main` in a stable state.

---

# 🏗️ Proposed Project Structure

The application follows a feature-oriented structure to keep related code together and encourage separation of concerns.

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

| Decision                  | Alternative Considered   | Rationale                                                                                                                              |
| ------------------------- | ------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Supabase (PostgreSQL)** | Firebase                 | The application relies on relational data, foreign keys, and database constraints, making PostgreSQL a better fit for this assessment. |
| **React Context**         | Redux Toolkit            | The application scope is relatively small, so React Context provides sufficient state management without additional complexity.        |
| **Feature Branches**      | Direct commits to `main` | Feature branches provide clearer traceability, safer integration, and a cleaner project history.                                       |

---

# 🚀 Development Phases

## Phase 1 – Repository Foundation & Database Setup

The first stage establishes the project's technical foundation by creating the React Native application, configuring Supabase, deploying the database schema, and inserting the initial dataset.

**Target dataset**

- 1 Doctor
- 5 Patients
- 5 Appointments
- 24 standard appointment slots

**Evidence of completion**

- Feature branch successfully merged into `main`
- React Native project configured
- Supabase project connected
- Database schema and constraints deployed
- Seed data verified
- Documentation updated where appropriate

---

## Phase 2 – Day Schedule

This phase focuses on displaying the doctor's daily appointments using live data retrieved from Supabase.

**Evidence of completion**

- Feature branch merged into `main`
- Live appointment data displayed successfully
- No mock data used
- Database connectivity verified

---

## Phase 3 – Patient Management

This stage introduces the Patient List and Patient Detail screens, allowing the doctor to browse patients and review their medical information.

**Evidence of completion**

- Feature branch merged into `main`
- Navigation between patient screens functioning correctly
- Patient history and appointment data retrieved from the database
- Documentation updated if required

---

## Phase 4 – Appointment Rescheduling

This phase implements the application's core scheduling functionality by allowing appointments to be rescheduled while preventing double bookings.

**Expected outcome**

- Generate 24 appointment slots for the working day
- Exclude the 5 slots that are already booked
- Present the remaining 19 available slots to the doctor

**Evidence of completion**

- Feature branch merged into `main`
- Appointment updates saved successfully
- Double bookings prevented
- Scheduling behaviour matches the documented workflow

---

## Phase 5 – Application Integration

The individual features are integrated through the planned navigation structure, with attention given to loading states and error handling to create a complete user experience.

**Evidence of completion**

- Feature branch merged into `main`
- End-to-end navigation functioning correctly
- Loading and error states implemented
- Complete workflow tested successfully

---

## Phase 6 – Final Testing & Delivery

The final stage prepares the project for submission by completing testing, documentation, and deployment deliverables.

**Evidence of completion**

- Feature branch merged into `main`
- Android APK generated successfully
- README and supporting documentation finalised
- AI usage disclosure completed
- Demonstration video recorded

---
