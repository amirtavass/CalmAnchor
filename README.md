# CalmAnchor Lite ⚓

A cross-platform mobile application prototype based on the CalmAnchor CPTSD toolkit workflow.

The project demonstrates a fixed-scenario appointment management system where a single doctor can manage patient information and a daily appointment schedule. The application focuses on relational database design, CRUD operations, and appointment slot management while ensuring that unavailable appointment times are not presented as selectable options.

---

## 📚 Project Documentation

All project design and architecture documentation is maintained inside the `/docs` directory.

Current documentation includes:

* [Database Schema & ERD](./docs/database-schema.md)

* [User Journey](./docs/user-journey.md)

* [Screen Map & Navigation](./docs/screen-map.md)

* [System Architecture](./docs/system-architecture.md)

* [Appointment Scheduling Logic](./docs/scheduling-logic.md)

---

## 🏗 Planned Architecture

### Application Structure

CalmAnchor Lite will follow a layered React Native architecture:

- **Presentation Layer:** Screens, reusable components, and navigation logic.
- **Data Layer:** Database queries, application services, and communication with external services.
- **Backend Layer:** Supabase PostgreSQL database managing relational application data.

This separation keeps responsibilities clear and allows individual parts of the application to be developed and maintained independently.

---

## 🗄 Database Choice

The application will use **Supabase (PostgreSQL)** as the cloud database.

A relational database was selected because the application contains clear relationships between the main entities:

- Doctor
- Patient
- Appointment

Supabase provides a managed PostgreSQL environment with cloud access and straightforward integration with React Native applications.

Database integrity will be supported through relational features such as:

- Foreign key relationships
- Database constraints
- Structured relational queries

---

## 📱 Planned Technology Stack

- React Native
- TypeScript
- Supabase PostgreSQL
- React Navigation
- React Context for state management

React Context was selected because the application scope is intentionally limited to a single doctor managing one working day. A lightweight state management approach avoids unnecessary complexity while meeting the project requirements.

---

## 🌿 Development Workflow

The project will follow a structured Git workflow using feature branches.

Planned development stages:

1. Project documentation and architecture design
2. Database integration and initial data setup
3. Day Schedule implementation
4. Patient management functionality
5. Appointment rescheduling workflow
6. Final testing and Android build preparation

Each major feature will be developed in its own branch and merged into `main` only when the feature is complete and stable.

---

## 🤖 Agent Usage Disclosure

AI-assisted development tools may be used during the project.

Any generated suggestions or code will be reviewed, tested, and adapted where necessary to ensure that the final implementation follows the planned architecture and meets the project requirements.
