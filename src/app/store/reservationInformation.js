//maja
//Der skal overføres data fra reservation af billetter til ticket siden, så dem der resererer får en bekræftelse og personlig besked.
// hjælp af AI til at skabe rigtig mappe så information kan overføres til tickets siden

import { create } from "zustand";

const transferReservationInformation = create((set) => ({
  reservation: null,
  setReservation: (data) => set({ reservation: data }),
}));

export default transferReservationInformation;
