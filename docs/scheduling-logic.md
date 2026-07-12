# Appointment Scheduling Logic Flow

![Scheduling Logic](./images/scheduling-logic.png)

### Appointment Slot Filtering

This diagram explains how CalmAnchor Lite handles appointment changes and ensures that already-booked slots are not shown as available options.

When the doctor opens the Change Appointment Form, the application retrieves the existing appointments for the selected day and compares them against the available 20-minute appointment slots.

Instead of allowing the doctor to select any time and handling conflicts afterwards, the application filters unavailable slots before displaying the options. This provides a clearer user experience and prevents invalid appointment changes.

### Process Overview

1. The doctor opens the Change Appointment Form.
2. The application loads existing appointments for the selected day.
3. Available 20-minute slots between 09:00 and 16:40 are generated.
4. Existing bookings are compared against the available slots.
5. Occupied times are removed from the available options.
6. The doctor selects an available time and saves the updated appointment.

This approach keeps the scheduling logic simple while satisfying the requirement that booked appointment slots should not appear as selectable options.