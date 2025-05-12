//Matilde

"use client";

import { useEffect, useState } from "react";
import { IoCheckmark } from "react-icons/io5";
import useCityStore from "@/app/store/cityStore";

const City = ({ city, isSelected, onChange, disabled }) => (
  <label className={`flex items-center gap-2 ${isSelected ? "font-bold" : ""} ${disabled ? "opacity-50" : ""}`}>
    <div
      onClick={() => onChange(city)}
      className="w-4 h-4 border-2 border-black bg-white rounded-xs relative cursor-pointer"
    >
      {isSelected && (
        <div className="absolute inset-0 flex justify-center items-center text-primary-red">
          <IoCheckmark />
        </div>
      )}
    </div>
    {city}
  </label>
);

const SelectCity = () => {
  const [locations, setLocations] = useState([]);
  const { selectedCities, setSelectedCities, normalizeCity } = useCityStore();

  useEffect(() => {
    fetch("http://localhost:8080/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));
  }, []);

  const uniqueCities = [
    ...new Set(locations.map((loc) => normalizeCity(loc.address))),
  ];

  const handleChange = (city) => {
    let updated;
    if (city === "Alle Byer") {
      updated = selectedCities.includes("Alle Byer") ? [] : ["Alle Byer"];
    } else {
      updated = selectedCities.includes(city)
        ? selectedCities.filter((c) => c !== city)
        : [...selectedCities.filter((c) => c !== "Alle Byer"), city];
    }
    setSelectedCities(updated);
  };

  const isAlleSelected = selectedCities.includes("Alle Byer");

  return (
    <div className="flex flex-col gap-2 max-w-1/2">
      <h3 className="mb-4">Vælg By</h3>
      <City
        city="Alle Byer"
        isSelected={isAlleSelected}
        onChange={handleChange}
        disabled={selectedCities.length > 0 && !isAlleSelected}
      />
      {uniqueCities.map((city) => (
        <City
          key={city}
          city={city}
          isSelected={selectedCities.includes(city)}
          onChange={handleChange}
          disabled={isAlleSelected}
        />
      ))}
      <div className="border-b-4 border-black mt-4"></div>
    </div>
  );
};

export default SelectCity;
