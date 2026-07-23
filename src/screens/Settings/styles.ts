import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8FAFC" },
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
    backgroundColor: "#2563EB",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  avatarText: { fontSize: 32, color: "#FFFFFF", fontWeight: "bold" },
  name: { fontSize: 22, fontWeight: "bold", color: "#1E293B", marginBottom: 4 },
  specialty: { fontSize: 16, color: "#2563EB", marginBottom: 8 },
  email: { fontSize: 14, color: "#64748B" },
});
