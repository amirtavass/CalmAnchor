import { supabase } from "../../lib/supabase";
import { DailyAppointment } from "../../types/appointment";

// ============================
// Appointment queries
// ============================

export const getTodayAppointments = async (): Promise<DailyAppointment[]> => {
  const today = new Date().toLocaleDateString("en-CA");

  const { data, error } = await supabase
    .from("appointment")
    .select(
      `
      id,
      start_time,
      appointment_date,
      end_time,
      status,
      patient:patient ( id,full_name )
    `,
    )
    .eq("appointment_date", today)
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Failed to fetch today's appointments:", error);
    throw new Error(error.message);
  }
  //concept of TS "force cast"
  return (data ?? []) as unknown as DailyAppointment[];
};

//this function only fetches the occupied start time for given date
//the function getTodayAppointments fetches FULL appointment data
export const getBookedSlotsByDate = async (date: string): Promise<string[]> => {
  const { data, error } = await supabase
    .from("appointment")
    .select("start_time")
    .eq("appointment_date", date);

  if (error) throw new Error(error.message);

  return data.map((row) => row.start_time);
};

//our 1st write operation from supabase for rescheduling the time using "appointmentId"
export const rescheduleAppointment = async (
  appointmentId: string,
  newStartTime: string,
  newEndTime: string,
): Promise<void> => {
  const { error } = await supabase
    .from("appointment")
    .update({
      start_time: newStartTime,
      end_time: newEndTime,
    })
    .eq("id", appointmentId);

  if (error) throw new Error(error.message);
};
