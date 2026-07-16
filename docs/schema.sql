CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Doctor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE Patient (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES Doctor(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    medical_history TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

--CONSTRAINT/rules for making appointments are inside the table

CREATE TABLE Appointment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES Doctor(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES Patient(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()

--status valid CONSTRAINT prevents any other status
--check duration CONSTRAINT is set so every appointment lasts exactly 20 minutes.
--unique doctor CONSTRAINT prevents double booking(doctor can not have 2 appointments)
    CONSTRAINT check_time_logic CHECK (start_time < end_time),
    CONSTRAINT check_status_valid CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')),
    CONSTRAINT check_working_hours CHECK (start_time >= '09:00:00' AND end_time <= '17:00:00'),
    CONSTRAINT check_duration CHECK (end_time = start_time + INTERVAL '20 minutes'),
    CONSTRAINT unique_doctor_slot UNIQUE (doctor_id, appointment_date, start_time)
);


-- Indexes improve lookup performance for appointments.
CREATE INDEX idx_doctor_id ON Appointment(doctor_id);
CREATE INDEX idx_patient_id ON Appointment(patient_id);
CREATE INDEX idx_appointment_date ON Appointment(appointment_date);



