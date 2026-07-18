//patient detail screen will not be opened without patientid
export type RootStackParamList = {
  DaySchedule: undefined;
  PatientList: undefined;
  PatientDetail: { patientId: string };
};
