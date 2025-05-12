import { create } from "zustand";

const useEventStore = create((set) => ({
  rawDate: null,
  formattedDate: null,
  setDate: (date) => {
    const formatted = new Date(date).toLocaleDateString("da-DK", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    set({ rawDate: date, formattedDate: formatted });
  },
}));

export default useEventStore;
