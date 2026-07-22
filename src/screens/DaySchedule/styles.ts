import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F8FAFC",
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 10,
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#0F172A",
  },
  subtitle: {
    fontSize: 16,
    color: "#64748B",
    marginTop: 4,
  },
  headerActions: {
    flexDirection: "row",
    marginTop: 16,
    gap: 10,
  },
  navButton: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  navButtonText: {
    color: "#1E293B",
    fontWeight: "600",
    fontSize: 14,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#64748B",
    fontStyle: "italic",
  },
  listContainer: {
    paddingBottom: 20,
    flexGrow: 1,
  },
  cardContainer: {
    flexDirection: "row",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    overflow: "hidden",
  },
  cardMain: {
    flex: 1,
    flexDirection: "row",
    padding: 16,
  },
  timeContainer: {
    justifyContent: "center",
    paddingRight: 16,
    borderRightWidth: 1,
    borderRightColor: "#E2E8F0",
    width: 80,
  },
  timeText: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0288D1",
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 16,
    justifyContent: "center",
  },
  patientName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1E293B",
    marginBottom: 4,
  },
  statusText: {
    fontSize: 14,
    color: "#64748B",
    textTransform: "capitalize",
  },
  editButton: {
    padding: 16,
    justifyContent: "center",
    backgroundColor: "#F8FAFC",
    borderLeftWidth: 1,
    borderLeftColor: "#E2E8F0",
  },
  editButtonText: {
    color: "#0288D1",
    fontWeight: "bold",
  },
});
