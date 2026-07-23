-- CalmAnchor Lite: Database Constraint Verification Tests

-- 1. DUPLICATE BOOKING TEST
-- Attempts to book the exact same time slot twice for the same doctor.
-- Expected: ERROR: duplicate key value violates unique constraint "appointment_doctor_id_appointment_date_start_time_key"
INSERT INTO appointment (doctor_id, patient_id, appointment_date, start_time, end_time, status)
VALUES 
  ('d1234567-e89b-12d3-a456-426614174000', 'a1111111-e89b-12d3-a456-426614174000', CURRENT_DATE, '10:00:00', '10:20:00', 'Scheduled'),
  ('d1234567-e89b-12d3-a456-426614174000', 'a1111111-e89b-12d3-a456-426614174000', CURRENT_DATE, '10:00:00', '10:20:00', 'Scheduled');


-- 2. INVALID DURATION TEST
-- Attempts to book a 30-minute appointment instead of the strict 20-minute requirement.
-- Expected: ERROR: new row for relation "appointment" violates check constraint "check_appointment_duration"
-- INSERT INTO appointment (doctor_id, patient_id, appointment_date, start_time, end_time, status)
-- VALUES 
--   ('d1234567-e89b-12d3-a456-426614174000', 'REPLACE-WITH-PATIENT-UUID', CURRENT_DATE, '11:00:00', '11:30:00', 'Scheduled');


-- 3. OUTSIDE WORKING HOURS TEST
-- Attempts to book an appointment at 8:00 AM (before the 09:00 opening time).
-- Expected: ERROR: new row for relation "appointment" violates check constraint "check_working_hours"
-- INSERT INTO appointment (doctor_id, patient_id, appointment_date, start_time, end_time, status)
-- VALUES 
--   ('d1234567-e89b-12d3-a456-426614174000', 'REPLACE-WITH-PATIENT-UUID', CURRENT_DATE, '08:00:00', '08:20:00', 'Scheduled');


-- 4. INVALID STATUS TEST
-- Attempts to insert a status string that is not in the allowed list.
-- Expected: ERROR: new row for relation "appointment" violates check constraint "appointment_status_check"
-- INSERT INTO appointment (doctor_id, patient_id, appointment_date, start_time, end_time, status)
-- VALUES 
--   ('d1234567-e89b-12d3-a456-426614174000', 'REPLACE-WITH-PATIENT-UUID', CURRENT_DATE, '14:00:00', '14:20:00', 'Pending');