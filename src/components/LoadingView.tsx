import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native";

interface LoadingViewProps {
  message?: string;
}

export default function LoadingView({
  message = "Loading...",
}: LoadingViewProps) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0288D1" />
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
  },
  text: {
    marginTop: 12,
    color: "#64748B",
    fontSize: 16,
  },
});
