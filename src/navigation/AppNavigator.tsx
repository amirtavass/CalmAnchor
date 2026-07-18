import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";

import DayScheduleScreen from "../screens/DaySchedule";
import PatientListScreen from "../screens/PatientList";
import PatientDetailScreen from "../screens/PatientDetail";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
