import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { getAllPatients } from "../../services/supabase/patients";
import { Patient } from "../../types/patient";

export default function PatientListScreen() {
  //this line prevents wrong route name or missing params
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  //this useEffect fetches the data of patients and need no dependancy arry

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getAllPatients();
        setPatients(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load patient catalog",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchPatients();
  }, []);

  const renderPatientRow = ({ item }: { item: Patient }) => (
    <TouchableOpacity
      style={styles.rowCard}
      activeOpacity={0.7}
      onPress={() =>
        navigation.navigate("PatientDetail", { patientId: item.id })
      }
    >
      <Text style={styles.patientName}>{item.full_name}</Text>
      <Text style={styles.viewLink}>View Record →</Text>
    </TouchableOpacity>
  );

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0288D1" />
      </View>
    );
  if (error)
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <FlatList
        data={patients}
        keyExtractor={(item) => item.id}
        renderItem={renderPatientRow}
        ListEmptyComponent={() => (
          <Text
            style={{ textAlign: "center", color: "#64748B", marginTop: 40 }}
          >
            No registered patients found.
          </Text>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", paddingHorizontal: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  listContainer: { paddingTop: 16, paddingBottom: 20 },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  patientName: { fontSize: 16, fontWeight: "600", color: "#1E293B" },
  viewLink: { fontSize: 14, color: "#0288D1", fontWeight: "500" },
  errorText: { fontSize: 16, color: "#EF4444", fontWeight: "500" },
});
