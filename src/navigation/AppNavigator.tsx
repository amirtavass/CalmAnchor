import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import DayScheduleScreen from "../screens/DaySchedule";
import PatientListScreen from "../screens/PatientList";
import PatientDetailScreen from "../screens/PatientDetail";
import ChangeAppointmentScreen from "../screens/ChangeAppointment";
import SettingsScreen from "../screens/Settings";

const Stack = createNativeStackNavigator<RootStackParamList>();

//navigationContainer is just like browserrouter in react,wrapping all routes inside
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="DaySchedule">
        <Stack.Screen
          name="DaySchedule"
          component={DayScheduleScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PatientList"
          component={PatientListScreen}
          options={{ title: "All Patients" }}
        />
        <Stack.Screen
          name="PatientDetail"
          component={PatientDetailScreen}
          options={{ title: "Patient Details" }}
        />
        <Stack.Screen
          name="ChangeAppointment"
          component={ChangeAppointmentScreen}
          options={{ title: "Reschedule" }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{ title: "Settings" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
