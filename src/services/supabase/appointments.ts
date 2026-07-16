import { supabase } from "../../lib/supabase";
import { DailyAppointment } from "../../types/appointment";

// ============================
// Appointment queries
// ============================

export const getTodayAppointments = async (): Promise<DailyAppointment[]> => {
  // Use local time instead of UTC to avoid timezone shift bugs (e.g., BST midnight vs UTC)
  const today = new Date().toLocaleDateString("en-CA");

  const { data, error } = await supabase
    .from("appointment")
    .select(
      `
      id,
      start_time,
      end_time,
      status,
      patient:patient ( full_name )
    `,
    )
    .eq("appointment_date", today)
    .order("start_time", { ascending: true });

  if (error) {
    console.error("Failed to fetch today's appointments:", error);
    throw new Error(error.message);
  }

  // TODO: Replace manual casting with generated Supabase database types.
  return (data ?? []) as unknown as DailyAppointment[];
};
