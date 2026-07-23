import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { getAllPatients } from "../../services/supabase/patients";
import { Patient } from "../../types/patient";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";

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

  if (loading) return <LoadingView message="Loading patient catalog..." />;
  if (error) return <ErrorView message={error} />;

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
