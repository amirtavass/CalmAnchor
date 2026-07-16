export interface DailyAppointment {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  patient: {
    full_name: string;
  } | null;
}
