import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import {
  getBookedSlotsByDate,
  rescheduleAppointment,
} from "../../services/supabase/appointments";
import { getAvailableSlots, calculateEndTime } from "../../utils/timeSlots";
//extracting data step 1 (Ts strict rule)
type ChangeRouteProp = RouteProp<RootStackParamList, "ChangeAppointment">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ChangeAppointmentScreen() {
  //extracting data step 2 with useRoute(same as useparams in react)
  const route = useRoute<ChangeRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  //extracting data step 3 by destructing (the data coming from dayschedule index.tsx)
  const { appointmentId, currentDate } = route.params;

  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  //this useEffect fills the availible slots by
  //1.getting bookedtimes by calling getBookedSlotsByDate and sending currentdata
  //2.feed that bookedtimes to getAvailableSlots so we have the freeslots
  //3.saving those freeslots in ui state

  useEffect(() => {
    const fetchAndFilterSlots = async () => {
      try {
        setLoading(true);
        const bookedTimes = await getBookedSlotsByDate(currentDate);
        const freeSlots = getAvailableSlots(bookedTimes);
        setAvailableSlots(freeSlots);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load slots");
      } finally {
        setLoading(false);
      }
    };
    fetchAndFilterSlots();
  }, [currentDate]);

  //after user hits confirm new time,handleSave executes and
  //1.it calculates the end time of the appointment
  //2.it calls rescheduleAppointment to overwrite the old ones
  //3.it give the user sucess message and navigates to dayschedule where the screen auto refreshes there thanks to usefocuseffect
  const handleSave = async () => {
    if (!selectedSlot) return;
    try {
      setSaving(true);
      const newEndTime = calculateEndTime(selectedSlot);
      await rescheduleAppointment(appointmentId, selectedSlot, newEndTime);
      Alert.alert("Success", "Appointment rescheduled successfully!");
      navigation.navigate("DaySchedule");
    } catch (err) {
      Alert.alert(
        "Error",
        err instanceof Error ? err.message : "Update failed",
      );
    } finally {
      setSaving(false);
    }
  };

  const renderSlot = ({ item }: { item: string }) => {
    const isSelected = selectedSlot === item;
    return (
      <TouchableOpacity
        style={[styles.slotButton, isSelected && styles.slotButtonSelected]}
        onPress={() => setSelectedSlot(item)}
      >
        <Text style={[styles.slotText, isSelected && styles.slotTextSelected]}>
          {item.slice(0, 5)}
        </Text>
      </TouchableOpacity>
    );
  };

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

  if (availableSlots.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>
          No available slots remaining for this day.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a new time for {currentDate}</Text>

      <FlatList
        data={availableSlots}
        keyExtractor={(item) => item}
        renderItem={renderSlot}
        numColumns={3}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
      />

      <TouchableOpacity
        style={[styles.saveButton, !selectedSlot && styles.saveButtonDisabled]}
        disabled={!selectedSlot || saving}
        onPress={handleSave}
      >
        {saving ? (
          <ActivityIndicator color="#FFF" />
        ) : (
          <Text style={styles.saveButtonText}>Confirm New Time</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", padding: 20 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  header: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 20,
    textAlign: "center",
  },
  listContainer: { paddingBottom: 20 },
  row: { justifyContent: "space-between", marginBottom: 12 },
  slotButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    marginHorizontal: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CBD5E1",
    alignItems: "center",
  },
  slotButtonSelected: { backgroundColor: "#0288D1", borderColor: "#0288D1" },
  slotText: { fontSize: 16, fontWeight: "500", color: "#334155" },
  slotTextSelected: { color: "#FFFFFF" },
  saveButton: {
    backgroundColor: "#0288D1",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  saveButtonDisabled: { backgroundColor: "#94A3B8" },
  saveButtonText: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  errorText: { color: "#EF4444", fontSize: 16 },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
    fontStyle: "italic",
    textAlign: "center",
  },
});
