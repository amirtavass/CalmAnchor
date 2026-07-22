import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { getPatient } from "../../services/supabase/patients";
import { Patient } from "../../types/patient";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";

type PatientDetailRouteProp = RouteProp<RootStackParamList, "PatientDetail">;

export default function PatientDetailScreen() {
  const route = useRoute<PatientDetailRouteProp>();

  const { patientId } = route.params;

  const [patient, setPatient] = useState<Patient | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatient = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getPatient(patientId);
        setPatient(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Network request failed");
      } finally {
        setLoading(false);
      }
    };
    loadPatient();
  }, [patientId]);

  if (loading) return <LoadingView message="Loading patient records..." />;
  if (error) return <ErrorView message={error} />;
  if (!patient)
    return <ErrorView message="Patient profile could not be resolved." />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{patient.full_name}</Text>
      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Medical History</Text>
        <Text style={styles.bodyText}>
          {patient.medical_history ||
            "No clinical remarks recorded for this individual."}
        </Text>
      </View>
    </View>
  );
}
