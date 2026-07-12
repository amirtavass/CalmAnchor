# Database Schema

## Database Technology

The application uses Supabase (PostgreSQL) as its cloud database. UUID primary keys are used for all entities, while foreign key relationships enforce referential integrity between tables.

## Entity Relationship Diagram
The following ERD shows the three core entities used by the application and the relationships between them. The schema has been designed to satisfy the assessment requirements while remaining simple, maintainable, and suitable for future extension.


---
## Design Decisions

* **Simple domain model:** The database is built around three main entities: `Doctor`, `Patient`, and `Appointment`. This keeps the schema straightforward while covering all of the relationships required for the assessment.
* **Direct links to both doctor and patient:** Each appointment stores both `doctor_id` and `patient_id`. Although the doctor could be found through the patient record, storing both IDs makes schedule queries simpler and easier to understand.
* **Clear separation of data:** `medical_history` stores long-term information about a patient, while `notes` are specific to an individual appointment. Keeping these separate avoids mixing permanent patient data with consultation records.
* **Database-level validation:** Foreign keys, the `UNIQUE` constraint, and `CHECK (start_time < end_time)` help protect the database from invalid data, even if a validation is missed in the application.
* **Designed for the project scope:** I considered modelling appointment slots as a separate table, but for a single doctor and one working day it would add unnecessary complexity. The current design keeps the schema simple while meeting all of the project requirements.

---

## Entity Descriptions

### Doctor

Stores the doctor's profile. Although the assessment only requires a single doctor, the table is designed so that additional doctors could be supported in the future without changing the overall structure.

### Patient

Stores each patient's basic information and medical history. Every patient is linked to a doctor, creating a clear relationship between the practitioner and the patients they manage.

### Appointment

Represents a scheduled consultation between a doctor and a patient. Along with the relationship between those two entities, it stores appointment-specific information such as the date, time, status, and consultation notes.

---

## Constraints

* **CHECK:** `CHECK (start_time < end_time)` ensures that an appointment cannot end before it starts.
* **UNIQUE:** `UNIQUE (doctor_id, appointment_date, start_time)` prevents two appointments from being booked for the same doctor at the same date and start time. This provides an additional layer of protection if frontend validation is bypassed.
* **Foreign Keys:** `doctor_id → Doctor(id)` and `patient_id → Patient(id)` ensure that every appointment references valid doctor and patient records, helping maintain data consistency.

---

## Data Flow

### Home Screen (Day Schedule)

When the application loads, it retrieves all appointments for the seeded doctor on the selected date. These records are used to populate the day's schedule.

### Patient Screen (Patient Detail)

When the doctor selects an appointment, the application uses the associated `patient_id` to retrieve and display the patient's details, including their name and medical history.

### Reschedule Screen (Change Appointment Form)

When rescheduling an appointment, the application retrieves all booked start times for the selected day and filters those time slots out before displaying the available options. This prevents users from selecting an already occupied appointment slot.
