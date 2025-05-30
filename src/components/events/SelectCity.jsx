//Matilde
//Udarbejdet ved hjælp af AI
//Prompt: Hvordan kan jeg lave en liste over byer via fetch fra databasen, så jeg kan filtrere i dem baseret på lokationen på mine events
//Prompt: Hvordan kan jeg give dem et disabled look, så hvis "Alle byer" er valgt, ser resten disabled ud

"use client";

import { useState, useRef, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import normalizeCity from "@/utils/normalizeCity";
import { motion } from "motion/react";

const City = ({ city, isSelected, onChange, disabled }) => (
  <motion.label
    onClick={() => onChange(city)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
    className={`flex items-center gap-2 cursor-pointer ${
      isSelected ? "font-bold" : ""
    } ${disabled ? "opacity-50" : ""}`}
  >
    <div className="w-4 h-4 border-2 shrink-0 border-black bg-white rounded-xs relative">
      {isSelected && (
        <div className="absolute inset-0 flex justify-center items-center text-primary-red">
          <IoCheckmark />
        </div>
      )}
    </div>
    {city}
  </motion.label>
);

const SelectCity = ({ selectedCities, setSelectedCities }) => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    fetch("https://server-gititgirls.onrender.com/locations")
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
    <div className="flex flex-col gap-2 max-w-1/2 mt-2 ">
      <h4 className="!text-primary-red hidden md:block">Vælg By</h4>
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
      <div className="border-b-4 border-black mt-4 hidden md:block"></div>
    </div>
  );
};

export default SelectCity;
