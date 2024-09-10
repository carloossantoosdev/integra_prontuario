import { AppointmentData } from '@/types/appointment';
import { create } from 'zustand';

type AppointmentStore = {
  appointmentList: AppointmentData[];
  setAppointmentList: (items: AppointmentData[]) => void;
};


export const useAppointmentStore = create<AppointmentStore>((set) => {
  return {
    appointmentList: [],

    setAppointmentList(items) {
      set({ appointmentList: items });
    },
  };
});
