import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../types/navigation";
import { getPatient } from "../../services/supabase/patients";
import { Patient } from "../../types/patient";

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

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Fetch Error: {error}</Text>
      </View>
    );
  if (!patient)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          Patient profile could not be resolved.
        </Text>
      </View>
    );

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 24,
  },
  sectionCard: {
    backgroundColor: "#FFF",
    padding: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#334155",
    marginBottom: 10,
  },
  bodyText: { fontSize: 16, color: "#475569", lineHeight: 24 },
  errorText: { fontSize: 16, color: "#EF4444", fontWeight: "500" },
});
