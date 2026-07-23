import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { styles } from "./styles";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { getDoctorProfile } from "../../services/supabase/doctor";
import { DoctorProfile } from "../../types/doctor";
import LoadingView from "../../components/LoadingView";
import ErrorView from "../../components/ErrorView";
import DoctorIcon from "../../../docs/images/svgs/doctor.svg";

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
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Doctor Profile</Text>
          <Text style={styles.subtitle}>
            Manage your account and preferences
          </Text>
        </View>

        <View style={styles.profileCard}>
          <View style={styles.avatarWrapper}>
            <DoctorIcon width={64} height={64} />
          </View>
          <Text style={styles.name}>{profile.full_name}</Text>
          <Text style={styles.specialty}>{profile.specialty}</Text>
        </View>

        <Text style={styles.sectionTitle}>Contact Information</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={[styles.iconWrapper, { backgroundColor: "#EFF6FF" }]}>
              <Feather name="mail" size={20} color="#2563EB" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>{profile.email}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <View style={[styles.iconWrapper, { backgroundColor: "#F5F3FF" }]}>
              <Feather name="phone" size={20} color="#8B5CF6" />
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Phone Number</Text>
              <Text style={styles.infoValue}>+44 161 234 5678</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
