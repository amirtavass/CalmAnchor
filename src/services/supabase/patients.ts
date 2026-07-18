import { supabase } from "../../lib/supabase";
import { Patient } from "../../types/patient";

//getallpatients return an array of patient obj

export const getAllPatients = async (): Promise<Patient[]> => {
  const { data, error } = await supabase
    .from("patient")
    .select("id, full_name")
    .order("full_name", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }
  return (data ?? []) as Patient[];
};

//getpatient use .single to get only 1 patient
//getpatient selects medical_history and getAllPatients deosn't,
//reason is PERFORMANCE OPTIMIZATION
export const getPatient = async (id: string): Promise<Patient> => {
  const { data, error } = await supabase
    .from("patient")
    .select("id, full_name, medical_history")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  return data as Patient;
};
