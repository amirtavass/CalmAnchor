import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { styles } from "./styles";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";
import {
  getBookedSlotsByDate,
  rescheduleAppointment,
} from "../../services/supabase/appointments";
import { getAvailableSlots, calculateEndTime } from "../../utils/timeSlots";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";

type ChangeRouteProp = RouteProp<RootStackParamList, "ChangeAppointment">;
type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function ChangeAppointmentScreen() {
  const route = useRoute<ChangeRouteProp>();
  const navigation = useNavigation<NavigationProp>();

  const { appointmentId, currentDate } = route.params;

  // Stores only appointment slots that remain available
  // after booked times have been filtered out.
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  // Stores the specific appointment time tapped by the user
  // before the new time is confirmed and sent to the database.
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

  if (loading) return <LoadingView message="Loading available slots..." />;
  if (error) return <ErrorView message={error} />;

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
