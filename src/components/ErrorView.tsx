import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface ErrorViewProps {
  message: string;
}

export default function ErrorView({ message }: ErrorViewProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Error: {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    padding: 20,
  },
  text: {
    color: "#EF4444",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "500",
  },
});
