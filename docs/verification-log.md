# Database Verification Log

This document records the manual verification carried out throughout the implementation of CalmAnchor Lite.

The verification process confirms that the database constraints, data retrieval, and application behaviour operate as expected during development.

---

## Verification Summary

| Test                              | Expected Result               | Outcome |
| --------------------------------- | ----------------------------- | ------- |
| Duplicate appointment booking     | Rejected                      | Passed  |
| Invalid appointment duration      | Rejected                      | Passed  |
| Invalid appointment status        | Rejected                      | Passed  |
| Appointment outside working hours | Rejected                      | Passed  |
| Valid appointment                 | Insert succeeded              | Passed  |
| Live appointment retrieval        | Appointments displayed        | Passed  |
| Patient List retrieval            | All seeded patients displayed | Passed  |
| Patient Detail retrieval          | Selected patient loaded       | Passed  |
| Navigation to Patient Detail      | Opens correct patient         | Passed  |
| Settings screen retrieval         | Doctor profile displayed      | Passed  |

---

## Development Challenges & Resolutions

During Phase 4, a notable integration challenge was encountered and successfully resolved:

- **Issue:** When attempting to load the Change Appointment screen, a PostgreSQL error was thrown: `invalid input for type date "undefined"`.
- **Root Cause:** The `currentDate` parameter was passing as `undefined` through React Navigation because the initial Supabase `SELECT` query in the Day Schedule screen omitted the `appointment_date` column in its payload.
- **Resolution:** The data fetching utility (`getTodayAppointments`) was updated to explicitly include `appointment_date` in the `.select()` statement. This successfully passed the strict date string to the routing params, satisfying both React Navigation and PostgreSQL strict type requirements.

---

## Verification Results

### Duplicate booking rejected

The database rejected an attempt to create two appointments for the same doctor at the same date and time, confirming that the `UNIQUE` constraint prevents duplicate bookings.

![Duplicate booking rejected](./images/phase1-duplicate-booking.png)

---

### Invalid duration rejected

The database rejected an appointment whose duration was different from the required 20 minutes, confirming that only fixed 20-minute appointments are accepted.

![Invalid duration rejected](./images/phase1-invalid-duration.png)

---

### Outside working hours rejected

The database prevented an appointment from being created outside the configured working hours (09:00–17:00), confirming that scheduling rules are enforced by PostgreSQL.

![Outside working hours rejected](./images/phase1-outside-working-hours.png)

---

### Valid appointment inserted successfully

A correctly formatted appointment satisfying every database constraint was inserted successfully.

![Valid appointment inserted](./images/image-3.png)

---

### Phase 2 – Live appointment retrieval

The Day Schedule screen successfully retrieved live appointment data from Supabase, displaying the seeded appointments for the selected day.

![Day Schedule displaying live appointments](./images/phase2-day-schedule.png)

---

### Phase 3 – Patient List

The Patient List screen successfully retrieved all seeded patients from Supabase, confirming that the application can display the complete patient dataset.

![Patient List](./images/phase3-patient-list.jpeg)

---

### Phase 3 – Patient Detail

Selecting a patient from either the Day Schedule or the Patient List opened the correct Patient Detail screen and displayed the patient's medical history retrieved from Supabase.

![Patient Detail](./images/phase3-patient-detail.jpeg)

---

### Phase 4 – Available slots calculation

The Change Appointment screen successfully retrieved currently booked times from the database and mathematically filtered them out of the generated 20-minute interval list (24 total slots generated, 5 booked times filtered out, resulting in 19 available slots), mathematically preventing the user from double-booking existing slots.

![Available slots grid](./images/phase4-available-slots.jpeg)

---

### Phase 4 – Appointment rescheduled successfully

Submitting a new time triggered a successful database mutation. The application provided a success alert, routed the user back to the Day Schedule, and automatically re-fetched the data to display the newly updated time.

![Reschedule success alert](./images/phase4-reschedule-success.jpeg)

### Phase 5 – Day Schedule Assembly & Dynamic Header

The Day Schedule screen was successfully refactored to act as the central routing hub. The new stacked header accurately tracks the dynamic state of the database by displaying the live appointment count, and successfully routes to all other areas of the application.

![Day Schedule new layout and navigation hub](./images/phase5-day-schedule-hub.jpeg)

---

### Phase 5 – Doctor Profile (Settings) Screen

The Settings screen successfully fetched and displayed the single-doctor profile data (Dr. Sarah Jenkins) from Supabase. The screen strictly followed the required UI safety cycle, rendering loading states before successfully resolving to the profile card.

![Doctor Profile screen displaying fetched data](./images/phase5-settings-profile.jpeg)

## Conclusion

Manual verification was carried out after each completed phase of development.

The database consistently enforced scheduling rules, rejected invalid records, accepted valid data, and successfully served relational data to the application through Supabase.
