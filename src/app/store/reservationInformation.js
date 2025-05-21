//maja
//Der skal overføres data fra reservation af billetter til ticket siden, så dem der resererer får en bekræftelse og personlig besked.

import { create } from "zustand";

const transferReservationInformation = create((set) => ({
  reservation: null,
  setReservation: (data) => set({ reservation: data }),
}));

export default transferReservationInformation;
