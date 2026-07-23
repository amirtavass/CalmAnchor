# Engineering Decisions & Technical Challenges

This document outlines key technical challenges encountered during the development of CalmAnchor Lite and the architectural decisions made to resolve them.

### React Native / Expo Compatibility

Early in development, the latest Expo package versions introduced compatibility issues with certain React Native dependencies. Stable package versions were deliberately selected and locked after testing to ensure consistent, reliable builds across different environments.

### Navigation Parameter Debugging

During Phase 4, the Change Appointment screen initially failed to load because `appointment_date` was not included in the relational payload returned by Supabase. React Navigation requires strict, defined parameters. Updating the data-fetching query to explicitly retrieve this field resolved the type mismatch and stabilized the routing flow.

### Dynamic Seed Data State

The application's appointment seed data utilizes PostgreSQL's `CURRENT_DATE` function, which is evaluated only at the exact moment the SQL script executes. Therefore, a strict development procedure was established: the Supabase seed script (`supabase db reset`) must be re-run before testing on a new day to guarantee appointments remain perfectly aligned with the current testing date.
