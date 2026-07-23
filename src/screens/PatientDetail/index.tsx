import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity, ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarLetter}>
              {patient.full_name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <Text style={styles.patientName}>{patient.full_name}</Text>

          <Text style={styles.patientId}>
            Record #PT-{patient.id.slice(0, 6).toUpperCase()}
          </Text>

          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="phone" size={20} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Feather name="message-square" size={20} color="#2563EB" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryActionButton}>
              <Feather name="calendar" size={16} color="#FFFFFF" />
              <Text style={styles.primaryActionText}>Schedule</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.vitalsRow}>
          <View style={styles.vitalCard}>
            <Feather
              name="droplet"
              size={20}
              color="#EF4444"
              style={styles.vitalIcon}
            />
            <Text style={styles.vitalValue}>O+</Text>
            <Text style={styles.vitalLabel}>Blood</Text>
          </View>
          <View style={styles.vitalCard}>
            <Feather
              name="activity"
              size={20}
              color="#10B981"
              style={styles.vitalIcon}
            />
            <Text style={styles.vitalValue}>72 kg</Text>
            <Text style={styles.vitalLabel}>Weight</Text>
          </View>
          <View style={styles.vitalCard}>
            <Feather
              name="minimize-2"
              size={20}
              color="#8B5CF6"
              style={styles.vitalIcon}
            />
            <Text style={styles.vitalValue}>175 cm</Text>
            <Text style={styles.vitalLabel}>Height</Text>
          </View>
        </View>

        <Text style={styles.sectionHeading}>Clinical Information</Text>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View
              style={[styles.cardIconWrapper, { backgroundColor: "#EFF6FF" }]}
            >
              <Feather name="file-text" size={20} color="#2563EB" />
            </View>
            <Text style={styles.cardTitle}>Medical History</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.bodyText}>
            {patient.medical_history ||
              "No clinical remarks recorded for this individual."}
          </Text>
        </View>

        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <View
              style={[styles.cardIconWrapper, { backgroundColor: "#F5F3FF" }]}
            >
              <Feather name="shield" size={20} color="#8B5CF6" />
            </View>
            <Text style={styles.cardTitle}>Known Allergies</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.placeholderText}>
            No known allergies reported.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
