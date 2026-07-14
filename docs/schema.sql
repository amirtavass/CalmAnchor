CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE Doctor (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    specialty VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE Patient (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES Doctor(id) ON DELETE CASCADE,
    full_name VARCHAR(255) NOT NULL,
    medical_history TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

CREATE TABLE Appointment (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    doctor_id UUID NOT NULL REFERENCES Doctor(id) ON DELETE CASCADE,
    patient_id UUID NOT NULL REFERENCES Patient(id) ON DELETE CASCADE,
    appointment_date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'Scheduled',
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),

    CONSTRAINT check_time_logic CHECK (start_time < end_time),
    CONSTRAINT check_status_valid CHECK (status IN ('Scheduled', 'Completed', 'Cancelled')),
    CONSTRAINT check_working_hours CHECK (start_time >= '09:00:00' AND end_time <= '17:00:00'),
    CONSTRAINT check_slot_alignment CHECK (EXTRACT(MINUTE FROM start_time)::int IN (0, 20, 40)),
    CONSTRAINT check_duration CHECK (end_time = start_time + INTERVAL '20 minutes'),
    CONSTRAINT unique_doctor_slot UNIQUE (doctor_id, appointment_date, start_time)
);

CREATE INDEX idx_doctor_id ON Appointment(doctor_id);
CREATE INDEX idx_patient_id ON Appointment(patient_id);
CREATE INDEX idx_appointment_date ON Appointment(appointment_date);

-- Auto-update `updated_at` on any row change, instead of relying on app code
-- to remember to set it manually on every UPDATE call.
CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_patient_updated_at
BEFORE UPDATE ON Patient
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

CREATE TRIGGER trg_appointment_updated_at
BEFORE UPDATE ON Appointment
FOR EACH ROW EXECUTE FUNCTION set_updated_at();

