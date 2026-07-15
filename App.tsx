import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import DayScheduleScreen from "./src/screens/DaySchedule";

export default function App() {
  return (
    <SafeAreaProvider>
      <DayScheduleScreen />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
