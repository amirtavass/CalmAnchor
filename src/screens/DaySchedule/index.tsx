import React, { useState, useCallback } from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import { Feather } from "@expo/vector-icons";
import SettingsIcon from "../../../docs/images/svgs/settings.svg";
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
    const patientName = item.patient?.full_name || "Unknown Patient";
    const patientId = item.patient?.id;

    // Get the first letter for a modern avatar placeholder
    const initial = patientName.charAt(0).toUpperCase();

    return (
      <TouchableOpacity
        style={styles.cardContainer}
        activeOpacity={0.7}
        onPress={() => {
          if (patientId) {
            navigation.navigate("PatientDetail", { patientId });
          }
        }}
      >
        {/* Left: Modern Avatar Placeholder */}
        <View style={styles.avatarWrapper}>
          <Text style={styles.avatarLetter}>{initial}</Text>
        </View>

        {/* Middle: Stacked Details */}
        <View style={styles.detailsContainer}>
          <Text style={styles.patientName}>{patientName}</Text>
          <View style={styles.timeRow}>
            <Feather name="clock" size={14} color="#64748B" />
            <Text style={styles.timeText}>{formattedTime}</Text>
            <View style={styles.dotSeparator} />
            <Text style={styles.statusText}>{item.status}</Text>
          </View>
        </View>

        {/* Right: Circular Action Button */}
        <TouchableOpacity
          style={styles.editIconButton}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={() =>
            navigation.navigate("ChangeAppointment", {
              appointmentId: item.id,
              currentDate: item.appointment_date,
            })
          }
        >
          {/* Using a pen icon for editing, feels more dashboard-like */}
          <Feather name="edit-2" size={16} color="#8B5CF6" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.centerContainer}>
      <Feather
        name="coffee"
        size={48}
        color="#CBD5E1"
        style={{ marginBottom: 16 }}
      />
      <Text style={styles.emptyText}>No appointments scheduled for today.</Text>
      <Text style={styles.emptySubtext}>Enjoy your free time!</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Personalized Dashboard Header */}
        <View style={styles.header}>
          <View style={styles.headerTopRow}>
            <View style={styles.profileSection}>
              <Image
                source={{
                  uri: "https://randomuser.me/api/portraits/women/44.jpg",
                }}
                style={styles.avatar}
              />
              <View>
                <Text style={styles.greeting}>Good Morning,</Text>
                <Text style={styles.headerTitle}>Dr. Jenkins</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.notificationBadge}>
              <Feather name="bell" size={20} color="#0F172A" />
              <View style={styles.notificationDot} />
            </TouchableOpacity>
          </View>

          <Text style={styles.subtitle}>
            You have {appointments.length} appointment
            {appointments.length !== 1 ? "s" : ""} today
          </Text>
        </View>

        {/* Quick Access Grid (Now perfectly centered) */}
        <View style={styles.quickAccessContainer}>
          <TouchableOpacity
            style={styles.quickAccessCard}
            onPress={() => navigation.navigate("PatientList")}
          >
            <View style={[styles.iconWrapper]}>
              <Image
                source={require("../../../docs/images/Medical_Kit.png")}
                style={{ width: 28, height: 28 }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.quickAccessText}>Patients</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.quickAccessCard}
            onPress={() => navigation.navigate("Settings")}
          >
            <View style={[styles.iconWrapper]}>
              <SettingsIcon width={24} height={24} />
            </View>
            <Text style={styles.quickAccessText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* NEW: Dashboard Section Header with "See All" */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Next Appointments</Text>
          <TouchableOpacity onPress={() => navigation.navigate("PatientList")}>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
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
