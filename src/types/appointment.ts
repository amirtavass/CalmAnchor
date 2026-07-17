export interface DailyAppointment {
  id: string;
  start_time: string;
  end_time: string;
  status: string;
  patient: {
    id: string;
    full_name: string;
  } | null;
}
