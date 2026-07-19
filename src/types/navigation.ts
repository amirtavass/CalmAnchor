//patient detail screen will not be opened without patientid
//ChangeAppointment will not be opened without currentDate and appointmentId
export type RootStackParamList = {
  DaySchedule: undefined;
  PatientList: undefined;
  PatientDetail: { patientId: string };
  ChangeAppointment: { appointmentId: string; currentDate: string };
};
