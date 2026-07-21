//Algorithm Implementation

//CalmAnchor project uses fixed working day defined by the assessment: 09:00–17:00
//since the range does not change and number of slots is small ,they are kept as a list rather than generated dynamicaly with complex math

const WORKING_SLOTS: string[] = [
  "09:00:00",
  "09:20:00",
  "09:40:00",
  "10:00:00",
  "10:20:00",
  "10:40:00",
  "11:00:00",
  "11:20:00",
  "11:40:00",
  "12:00:00",
  "12:20:00",
  "12:40:00",
  "13:00:00",
  "13:20:00",
  "13:40:00",
  "14:00:00",
  "14:20:00",
  "14:40:00",
  "15:00:00",
  "15:20:00",
  "15:40:00",
  "16:00:00",
  "16:20:00",
  "16:40:00",
];

//This function acts as an algorithm and when called,it Compares fixed WORKING_SLOTS
//against bookedStartTimes and return only free slots.

export const getAvailableSlots = (bookedStartTimes: string[]): string[] => {
  return WORKING_SLOTS.filter((slot) => !bookedStartTimes.includes(slot));
};

//even though we had constraint in db , preventing to user to insert
//invalid appointment duration,this helper computes
//end time as start time+20min
export const calculateEndTime = (startTime: string): string => {
  let [hour, minute] = startTime.split(":").map(Number);

  minute += 20;

  if (minute >= 60) {
    hour += 1;
    minute -= 60;
  }

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00`;
};
