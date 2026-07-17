import { supabase } from "../../lib/supabase";
import { Patient } from "../../types/patient";

export const getAllPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    // FIX: Must be lowercase because Postgres folded the unquoted table name
    .from("patient")
    .select("id, full_name") // OPTIMIZATION: Do not fetch medical_history here
    .order("full_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return (data ?? []) as Patient[];
};

export const getPatient = async (id: string): Promise<Patient> => {
  const { data, error } = await supabase
    // FIX: Must be lowercase
    .from("patient")
    .select("id, full_name, medical_history")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Patient;
};
