import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function DayScheduleScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.headerTitle}>Today's Schedule</Text>

        {/* Temporary Placeholder State */}
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            No appointments loaded yet.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC", // Light gray background
  },
  container: {
    flex: 1,
    padding: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 20,
    marginTop: 10,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 16,
    color: "#64748B",
  },
});
