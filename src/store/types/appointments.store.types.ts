import { AppointmentData } from "@/types/appointment";

export interface AppointmentStore {
  appointmentList: AppointmentData[];

  setAppointmentList: (items: AppointmentData[]) => void;
}
