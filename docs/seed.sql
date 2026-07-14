-- ============================
-- Clearing exisitng tables
-- ============================
DELETE FROM Appointment;
DELETE FROM Patient;
DELETE FROM Doctor;

-- ============================
-- seed Doctor
-- ============================

INSERT INTO Doctor (id, full_name, specialty, email)
VALUES ('d1234567-e89b-12d3-a456-426614174000', 'Dr. Sarah Jenkins', 'Clinical Psychologist', 'sarah.jenkins@calmanchor.com');

-- ============================
-- seed patients
-- ============================
INSERT INTO Patient (id, doctor_id, full_name, medical_history)
VALUES
('a1111111-e89b-12d3-a456-426614174000', 'd1234567-e89b-12d3-a456-426614174000', 'Michael Chang', 'History of CPTSD; triggers related to loud noises.'),
('a2222222-e89b-12d3-a456-426614174000', 'd1234567-e89b-12d3-a456-426614174000', 'Emma Watson', 'Anxiety and sleep disturbances. Currently on SSRIs.'),
('a3333333-e89b-12d3-a456-426614174000', 'd1234567-e89b-12d3-a456-426614174000', 'James O''Connor', 'Managing panic attacks. Responds well to grounding techniques.'),
('a4444444-e89b-12d3-a456-426614174000', 'd1234567-e89b-12d3-a456-426614174000', 'Sophia Martinez', 'Depression and emotional dysregulation. Attends weekly sessions.'),
('a5555555-e89b-12d3-a456-426614174000', 'd1234567-e89b-12d3-a456-426614174000', 'David Kim', 'Evaluating for ADHD; secondary anxiety symptoms.');


-- ============================
-- seed Appointment
-- ============================

--  CURRENT_DATE is used here because it keeps the seeded schedule aligned with the current
-- working day, allowing the application to display appointments without
-- modifying the seed script.
INSERT INTO Appointment (doctor_id, patient_id, appointment_date, start_time, end_time, notes)
VALUES
('d1234567-e89b-12d3-a456-426614174000', 'a1111111-e89b-12d3-a456-426614174000', CURRENT_DATE, '09:00:00', '09:20:00', 'Review progress on grounding techniques.'),
('d1234567-e89b-12d3-a456-426614174000', 'a2222222-e89b-12d3-a456-426614174000', CURRENT_DATE, '09:20:00', '09:40:00', 'Check medication side effects.'),
('d1234567-e89b-12d3-a456-426614174000', 'a3333333-e89b-12d3-a456-426614174000', CURRENT_DATE, '11:00:00', '11:20:00', 'Discuss recent panic attack triggers.'),
('d1234567-e89b-12d3-a456-426614174000', 'a4444444-e89b-12d3-a456-426614174000', CURRENT_DATE, '13:40:00', '14:00:00', 'Standard weekly check-in.'),
('d1234567-e89b-12d3-a456-426614174000', 'a5555555-e89b-12d3-a456-426614174000', CURRENT_DATE, '15:20:00', '15:40:00', 'Initial ADHD evaluation questionnaire.');
