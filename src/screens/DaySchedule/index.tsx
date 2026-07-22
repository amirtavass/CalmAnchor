import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { getTodayAppointments } from "../../services/supabase/appointments";
import { DailyAppointment } from "../../types/appointment";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";

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
          <LoadingView message="Loading appointments..." />
        ) : error ? (
          <ErrorView message={error} />
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
