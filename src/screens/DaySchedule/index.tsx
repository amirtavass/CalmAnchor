import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { getTodayAppointments } from "../../services/supabase/appointments";
import { DailyAppointment } from "../../types/appointment";

export default function DayScheduleScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [appointments, setAppointments] = useState<DailyAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTodayAppointments();
      setAppointments(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Failed to load appointments");
      }
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, []),
  );

  const renderAppointment = ({ item }: { item: DailyAppointment }) => {
    const formattedTime = item.start_time.slice(0, 5);
    const patientName = item.patient?.full_name;
    const patientId = item.patient?.id;

    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          style={styles.cardMain}
          activeOpacity={0.7}
          onPress={() => {
            if (patientId) {
              navigation.navigate("PatientDetail", { patientId });
            }
          }}
        >
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{formattedTime}</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.patientName}>
              {patientName || "Unknown Patient"}
            </Text>
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate("ChangeAppointment", {
              appointmentId: item.id,
              currentDate: item.appointment_date,
            })
          }
        >
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>
    );
  };

  //in case of no appointments

  const renderEmptyState = () => (
    <View style={styles.centerContainer}>
      <Text style={styles.emptyText}>No appointments scheduled for today.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Today's Schedule</Text>

          <Text style={styles.subtitle}>
            {appointments.length} appointment
            {appointments.length !== 1 ? "s" : ""} scheduled
          </Text>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("PatientList")}
            >
              <Text style={styles.navButtonText}>View All Patients</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => navigation.navigate("Settings")}
            >
              <Text style={styles.navButtonText}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#0288D1" />
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Text style={styles.errorText}>Error: {error}</Text>
          </View>
        ) : (
          <FlatList
            data={appointments}
            keyExtractor={(item) => item.id}
            renderItem={renderAppointment}
            ListEmptyComponent={renderEmptyState}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },
  navButton: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navButtonText: {
    color: "#1E293B",
    fontWeight: "600",
    fontSize: 14,
  },

  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 16,
    color: "#EF4444",
    fontWeight: "500",
  },

  listContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },

  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden", // Crucial: Keeps the inner touchables inside the border radius
  },
  cardMain: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
  },
  timeContainer: {
    justifyContent: "center",
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    width: 80,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0288D1",
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "center",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: "#64748B",
    textTransform: "capitalize",
  },
  editButton: {
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    borderLeftWidth: 1,
    borderLeftColor: "#E2E8F0",
  },
  editButtonText: {
    color: "#0288D1",
    fontWeight: "bold",
  },
});
