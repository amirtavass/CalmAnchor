import { supabase } from "../../lib/supabase";
import { DoctorProfile } from "../../types/doctor";

export const getDoctorProfile = async (): Promise<DoctorProfile> => {
  // CalmAnchor Lite models a single-doctor environment,
  // so getting the first record is enough.
  const { data, error } = await supabase
    .from("doctor")
    .select("full_name, specialty, email")
    .limit(1)
    .single();

  if (error) throw new Error(error.message);
  return data as DoctorProfile;
};
