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

---

## Verification Evidence

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

## ![Patient Detail](./images/phase3-patient-detail.jpeg)

## Conclusion

Manual verification was carried out after each completed phase of development.

The database consistently enforced scheduling rules, rejected invalid records, accepted valid data, and successfully served relational data to the application through Supabase.
