//Matilde
//Udarbejdet med hjælp fra AI til at kunne samle de to københavn adresser under en samlet "København" checkbox

import { create } from "zustand";

const useCityStore = create((set) => ({
  selectedCities: [],
  setSelectedCities: (cities) => set({ selectedCities: cities }),
  normalizeCity: (address) => {
    const city = address.split(",")[1]?.trim().split(" ").slice(1).join(" ");
    if (!city) return "";
    if (
      city.toLowerCase().includes("kbh") ||
      city.toLowerCase().includes("københavn")
    )
      return "København";
    return city;
  },
}));

export default useCityStore;
