# Database Schema

## Database Technology

Supabase (PostgreSQL) is used as the cloud database for the app. All entities are identified by a UUID as their primary key, and foreign key relationships and database constraints also ensure data integrity without relying on the application layer.

## Entity Relationship Diagram

The following ERD shows the three main entities of the application and relationships among them. The following ERD shows the three main entities of the application and relationships among them. The schema has been written so that it meets the assessment requirements and is easy to maintain and extend for any new functionality that might be added in the future.

![DB Architecture](./images/database-schema.png)

---

## Design Decisions

- **Simple domain model:** The database is centred around three entities: `Doctor`, `Patient`, and `Appointment`. It ensures simplicity of design, while meeting all the necessary features of the application.
- **Direct relationships:** In each appointment, both `doctor_id` and `patient_id` stored. While both relationships can be inferred from the patient record, having them stored makes any schedule queries much easier and keeps them efficient and understandable.
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
- **Slot Alignment:** Appointment start times must begin on valid 20-minute intervals (`00`, `20`, or `40` minutes past the hour).
- **Status Validation:** Appointment status is limited to the predefined values `Scheduled`, `Completed`, or `Cancelled`.

These constraints work together to give an additional level of protection, so that in addition to the application-level validation being invalid, they are also unable to be added via the database.
Constraint behaviour has been tested manually by running SQL test cases in the Supabase SQL Editor. The verification results are documented in `verification-log.md`.

---

## Data Flow

### Home Screen (Day Schedule)

On app load, it fetches the data for all appointments that have been created for the selected day from Supabase and updates the doctor's daily schedule.

### Patient Screen (Patient Detail)

When the Doctor books an appointment with the application receives the corresponding `patient_id` and fetches and displays the medical history and appointment details of the patient.

### Reschedule Screen (Change Appointment Form)

If an appointment is rescheduled, the application fetches all appointment times for the day, removes such time slots from the remaining time list and displays the user the remaining times available. Even if frontend validation is bypassed, database constraints take an extra step to ensure that no appointments are added to the database that are invalid.
