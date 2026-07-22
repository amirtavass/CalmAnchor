# Database Schema

## Database Technology

Supabase (PostgreSQL) is used as the cloud database for the app. All entities are identified by a UUID as their primary key, and foreign key relationships and database constraints also ensure data integrity without relying on the application layer.

## Entity Relationship Diagram

The following ERD shows the three main entities of the application and relationships among them. The schema has been written so that it meets the assessment requirements and is easy to maintain and extend for any new functionality that might be added in the future.

![DB Architecture](./images/database-schema.png)

> **💡 Core Design Decision: Database-Enforced Scheduling**
> Rather than trusting frontend validation alone, CalmAnchor Lite strictly enforces scheduling rules directly at the database level.
>
> - **`UNIQUE (doctor_id, appointment_date, start_time)`** mathematically prevents double-booking.
> - **`CHECK duration = 20 minutes`** guarantees uniform appointment slots.
> - **`CHECK working hours`** restricts bookings to the 09:00–17:00 window.
> - **`CHECK valid status`** ensures only predefined appointment states are saved.

---

## Design Decisions

- **Simple domain model:** The database is centred around three entities: `Doctor`, `Patient`, and `Appointment`. It ensures simplicity of design, while meeting all the necessary features of the application.
- **Direct relationships:** Each appointment stores both `doctor_id` and `patient_id`. Although the doctor could be inferred through the patient record, storing both relationships improves readability.
- **Separation of responsibilities:** Patient medical history is kept separate from appointment notes, which ensures that the medical history of the patient does not become confusing in the consultation record.
- **Database-driven validation:** Data integrity is enforced on the backend by PostgreSQL using foreign keys, `CHECK` constraints, and a `UNIQUE` constraint and not solely based on validation on the frontend.

- **Stored appointment duration:** Although every appointment lasts 20 minutes, both `start_time` and `end_time` are stored. This gives a slight bit of redundancy, but it simplifies queries and UI rendering, with one of the database constraints guaranteeing that the stored duration remains valid at all times.

- **Designed for the project scope:** I considered modelling appointment slots as a separate table. However, this would cause unnecessary complexity for a single doctor who is accommodating patients within one day of work.

---

## Entity Descriptions

### Doctor

Stores the doctor's profile information. The schema is designed to allow for multiple doctors without requiring any structural changes, although it only involves one doctor in the assessment.

### Patient

Stores each patient's basic information and medical history. Each patient is connected to a doctor by a foreign key relationship.

### Appointment

Represents a scheduled appointment with the doctor and patient. In addition to the relationship between the two entities, it maintains appointment-specific data such as appointment date, start time, end time, appointment status, and consultation notes.

---

## Constraints

The database has a number of constraints that help to ensure data integrity and to prevent the storage of invalid records.

- **Foreign Keys:** `doctor_id → Doctor(id)` and `patient_id → Patient(id)` ensure that every appointment references valid doctor and patient records.
- **UNIQUE:** `UNIQUE (doctor_id, appointment_date, start_time)` prevents two appointments from being booked for the same doctor at the same date and start time.
- **Time Logic:** `CHECK (start_time < end_time)` make sure an appointment cannot end before it begins.
- **Fixed Appointment Duration:** `CHECK (end_time = start_time + INTERVAL '20 minutes')` guarantees that every appointment lasts exactly 20 minutes.
- **Working Hours:** Appointments are restricted to the configured working day (09:00–17:00).
- **Status Validation:** Appointment status is limited to the predefined values `Scheduled`, `Completed`, or `Cancelled`.

Together, these constraints help protect the database from invalid data. Even if application-level validation is bypassed, PostgreSQL still prevents appointments that violate the defined rules from being stored.
Constraint behaviour has been tested manually by running SQL test cases in the Supabase SQL Editor. The verification results are documented in `verification-log.md`.

---

## Data Flow

### Home Screen (Day Schedule)

On app load, it fetches the data for all appointments that have been created for the selected day from Supabase and updates the doctor's daily schedule.

### Patient Screen (Patient Detail)

When the doctor selects an appointment, the application uses the `patient_id` to get and display the patient's medical history and appointment information.

### Reschedule Screen (Change Appointment Form)

When an appointment is rescheduled, the application gets all booked appointment times for the selected day and excludes those slots from the list of available times. Database constraints provide an additional safety by preventing invalid appointments from being stored.

### Settings Screen (Doctor Profile)

The Settings screen retrieves the doctor's profile from Supabase using a dedicated service module. The returned data is displayed through a read-only UI following the Loading → Error → Content rendering cycle.
