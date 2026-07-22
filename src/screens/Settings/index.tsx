import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { getDoctorProfile } from "../../services/supabase/doctor";
import { DoctorProfile } from "../../types/doctor";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";

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

  if (loading) return <LoadingView message="Loading doctor profile..." />;
  if (error) return <ErrorView message={error} />;
  if (!profile)
    return <ErrorView message="Doctor profile could not be found." />;

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
