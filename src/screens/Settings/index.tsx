import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDoctorProfile } from "../../services/supabase/doctor";
import { DoctorProfile } from "../../types/doctor";

export default function SettingsScreen() {
  const [profile, setProfile] = useState<DoctorProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await getDoctorProfile();
        setProfile(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load doctor profile.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#0288D1" />
        <Text style={styles.loadingText}>Loading doctor profile...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!profile) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>Doctor profile could not be found.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Doctor Profile</Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {profile.full_name?.charAt(0) || "D"}
          </Text>
        </View>
        <Text style={styles.name}>{profile.full_name}</Text>
        <Text style={styles.specialty}>{profile.specialty}</Text>
        <Text style={styles.email}>{profile.email}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 12, color: "#64748B" },
  errorText: { color: "#EF4444", fontSize: 16 },
  header: { padding: 20, borderBottomWidth: 1, borderBottomColor: "#E2E8F0" },
  headerTitle: { fontSize: 28, fontWeight: "bold", color: "#0F172A" },
  card: {
    backgroundColor: "#FFFFFF",
    margin: 20,
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatarPlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#0288D1",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, color: "#FFFFFF", fontWeight: "bold" },
  name: { fontSize: 22, fontWeight: "bold", color: "#1E293B", marginBottom: 4 },
  specialty: { fontSize: 16, color: "#0288D1", marginBottom: 8 },
  email: { fontSize: 14, color: "#64748B" },
});
