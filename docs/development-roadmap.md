# CalmAnchor Lite: Development Roadmap

This document outlines the planned development approach for CalmAnchor Lite. The project will be built incrementally using feature branches, with each completed feature merged into `main` only after it has been implemented, verified, and documented.

---

## 🧠 Development Philosophy

The project follows an incremental development approach, focusing on working software before refinement. Each stage is completed, tested, and documented before moving on to the next, helping to keep the `main` branch stable throughout development.

### Core Engineering Principles

- **Continuous Integration:** Every merge into `main` should represent a stable, working version of the application.
- **Traceability:** Each completed feature should be supported by its implementation, documentation, and Git history.
- **Thoughtful Design:** Key technical decisions should be justified, with alternative approaches considered where appropriate.
- **Living Documentation:** Documentation should evolve alongside the implementation rather than being left until the end of the project.
- **Data Integrity:** Wherever practical, validation should be enforced by the database instead of relying only on application logic.

### AI-Assisted Development

AI tools may be used to assist with boilerplate code, documentation, and implementation ideas. All generated content will be reviewed, tested, and refactored where necessary before becoming part of the project. Any AI assistance used during development will be disclosed in the project documentation.

### Definition of Done

A feature is considered complete when it:

- Meets its intended functional requirements.
- Has been tested using the seeded application data.
- Is committed on its own feature branch.
- Includes any required documentation updates.
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

| Decision | Alternative Considered | Rationale |
|----------|------------------------|-----------|
| **Supabase (PostgreSQL)** | Firebase | The application relies on relational data, foreign keys, and database constraints, making PostgreSQL a better fit for this assessment. |
| **React Context** | Redux Toolkit | The application scope is relatively small, so React Context provides sufficient state management without additional complexity. |
| **Feature Branches** | Direct commits to `main` | Feature branches provide clearer traceability, safer integration, and a cleaner project history. |

---

# 🚀 Development Phases

## Phase 1 – Repository Foundation & Database Setup

**Goal**

Set up the React Native project, configure Supabase, deploy the database schema, and populate the database with seed data.

**Expected Data**

- 1 Doctor
- 5 Patients
- 5 Appointments
- 24 standard appointment slots across the working day

**Expected Evidence**

- Stable merge into `main`
- Configured Supabase project
- Database schema with constraints
- Updated project documentation

---

## Phase 2 – Day Schedule

**Goal**

Build the read-only Day Schedule screen using live appointment data from Supabase.

**Expected Evidence**

- Stable merge into `main`
- Live appointment data displayed
- No mock data used
- Successful database connectivity

---

## Phase 3 – Patient Management

**Goal**

Implement the Patient List and Patient Detail screens, displaying relational patient information and appointment data.

**Expected Evidence**

- Stable merge into `main`
- Working navigation between screens
- Relational data retrieved correctly
- Documentation updated if required

---

## Phase 4 – Appointment Rescheduling

**Goal**

Implement the appointment rescheduling workflow while preventing double bookings.

**Expected Result**

- Generate 24 available daily slots
- Filter out the 5 booked appointments
- Display the remaining 19 available slots

**Expected Evidence**

- Stable merge into `main`
- Successful appointment updates
- No duplicate appointments possible
- Scheduling logic matches the documented design

---

## Phase 5 – Application Integration

**Goal**

Connect all screens through the planned navigation structure and improve the overall user experience.

**Expected Evidence**

- Stable merge into `main`
- Complete navigation flow
- Loading and error states handled appropriately
- End-to-end functionality verified

---

## Phase 6 – Final Testing & Delivery

**Goal**

Prepare the application for submission by completing testing, documentation, and deployment deliverables.

**Expected Evidence**

- Stable merge into `main`
- Android APK generated successfully
- README and supporting documentation completed
- AI usage disclosure finalised
- Demonstration video recorded

---

