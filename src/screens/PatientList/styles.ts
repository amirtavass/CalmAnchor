import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC", paddingHorizontal: 20 },
  listContainer: { paddingTop: 16, paddingBottom: 20 },
  rowCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F1F5F9",
  },
  patientName: { fontSize: 16, fontWeight: "600", color: "#1E293B" },
  viewLink: { fontSize: 14, color: "#0288D1", fontWeight: "500" },
});
