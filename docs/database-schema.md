# Database Schema

## Database Technology

The application uses Supabase (PostgreSQL) as its cloud database. UUIDs are used as primary keys for all entities, while foreign key relationships and database constraints help maintain data integrity independently of the application layer.

## Entity Relationship Diagram

The following ERD illustrates the three core entities used by the application and the relationships between them. The schema has been designed to satisfy the assessment requirements while remaining simple, maintainable, and easy to extend if additional functionality is introduced in the future.

![DB Architecture](./images/database-schema.png)

---

## Design Decisions

- **Simple domain model:** The database is centred around three entities: `Doctor`, `Patient`, and `Appointment`. This keeps the design straightforward while supporting all of the required application features.
- **Direct relationships:** Each appointment stores both `doctor_id` and `patient_id`. Although the doctor could be inferred through the patient record, storing both relationships simplifies schedule queries and keeps them efficient and easy to understand.
- **Separation of responsibilities:** Patient medical history is stored independently from appointment notes so that long-term patient information is not mixed with consultation-specific records.
- **Database-driven validation:** Wherever practical, data integrity is enforced by PostgreSQL through foreign keys, `CHECK` constraints, and a `UNIQUE` constraint rather than relying solely on frontend validation.
- **Stored appointment duration:** Although every appointment lasts 20 minutes, both `start_time` and `end_time` are stored. This introduces a small amount of controlled redundancy but keeps queries and UI rendering simpler, while a database constraint ensures the stored duration always remains valid.
- **Designed for the project scope:** I considered modelling appointment slots as a separate table. However, for a single doctor managing appointments within one working day, this would introduce unnecessary complexity without providing additional value for the assessment.

---

## Entity Descriptions

### Doctor

Stores the doctor's profile information. Although the assessment only requires a single doctor, the schema supports multiple doctors without requiring structural changes.

### Patient

Stores each patient's basic information and medical history. Every patient is linked to a doctor through a foreign key relationship.

### Appointment

Represents a scheduled consultation between a doctor and a patient. Alongside the relationship between those two entities, it stores appointment-specific information including the appointment date, start time, end time, status, and consultation notes.

---

## Constraints

The database uses several constraints to help maintain data integrity and prevent invalid records from being stored.

- **Foreign Keys:** `doctor_id → Doctor(id)` and `patient_id → Patient(id)` ensure that every appointment references valid doctor and patient records.
- **UNIQUE:** `UNIQUE (doctor_id, appointment_date, start_time)` prevents two appointments from being booked for the same doctor at the same date and start time.
- **Time Logic:** `CHECK (start_time < end_time)` ensures an appointment cannot end before it begins.
- **Fixed Appointment Duration:** `CHECK (end_time = start_time + INTERVAL '20 minutes')` guarantees that every appointment lasts exactly 20 minutes.
- **Working Hours:** Appointments are restricted to the configured working day (09:00–17:00).
- **Slot Alignment:** Appointment start times must begin on valid 20-minute intervals (`00`, `20`, or `40` minutes past the hour).
- **Status Validation:** Appointment status is limited to the predefined values `Scheduled`, `Completed`, or `Cancelled`.

Together, these constraints provide an additional layer of protection, ensuring that invalid appointments cannot be inserted even if application-level validation is bypassed.

---

## Data Flow

### Home Screen (Day Schedule)

When the application loads, it retrieves all appointments for the selected day from Supabase and displays them in the doctor's daily schedule.

### Patient Screen (Patient Detail)

When the doctor selects an appointment, the application uses the associated `patient_id` to retrieve and display the patient's details, including their medical history and appointment information.

### Reschedule Screen (Change Appointment Form)

When rescheduling an appointment, the application retrieves all booked appointment times for the selected day and filters those time slots out before presenting the remaining available options to the user. Database constraints provide an additional safeguard by preventing invalid or conflicting appointments from being stored, even if frontend validation is bypassed.
