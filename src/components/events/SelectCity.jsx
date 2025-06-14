//Matilde
//Udarbejdet ved hjælp af AI
//Prompt: Hvordan kan jeg lave en liste over byer via fetch fra databasen, så jeg kan filtrere i dem baseret på lokationen på mine events
//Prompt: Hvordan kan jeg give dem et disabled look, så hvis "Alle byer" er valgt, ser resten disabled ud

"use client";

import { useState, useRef, useEffect } from "react";
import { IoCheckmark } from "react-icons/io5";
import normalizeCity from "@/utils/normalizeCity";
import { motion } from "motion/react";
import { fetchLocations } from "@/api-mappe/EventsApiKald";

//Komponent til enkelt by, med egen designet checkmark
const City = ({ city, isSelected, onChange, disabled }) => (
  <motion.label
    onClick={() => onChange(city)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.1 }}
    className={`flex items-center gap-2 cursor-pointer ${
      isSelected ? "font-bold" : ""
    } ${disabled ? "opacity-50" : ""}`} //disabled styling hvis alle byer er valgt
  >
    {/* Checkbox med checkmark ikon */}
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
  //State til lokationerne
  const [locations, setLocations] = useState([]);

  //Henter lokationer fra databasen (kunne også gøres ved at hente url'en fra api kald filen)
  useEffect(() => {
    fetch("https://server-gititgirls.onrender.com/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data)); //Gemmer lokationerne i vores state
  }, []);

  //Eksempel på hvis man skulle fetche det fra API mappen
  // useEffect (() => {
  //   const getCities = async () => {
  //     try {
  //       const cities = await fetchLocations();
  //       setLocations(cities);
  //     } catch (error) {
  //       console.error("Error fetching cities:", error);
  //     }
  //   };
  //   getCities(); 
  //   }, []);

  // Udtræk unikke byer fra lokationernes adresser
  // - normalizeCity standardiserer bynavnet (fx "Kbh" -> "København")
  // - map laver et array med bynavne
  // - Set fjerner dubletter (fordi der er flere kbh), men er ikke et almindeligt array
  // - spread operator (...) laver det om til et normalt array igen
  const uniqueCities = [
    ...new Set(locations.map((loc) => normalizeCity(loc.address))),
  ];

  //Funktion der håndterer om en by er selected eller ej
  const handleChange = (city) => {
    let updated;
    if (city === "Alle Byer") {
      // Hvis "Alle Byer" vælges: Hvis allerede valgt, fjern alle valg, ellers vælg kun "Alle Byer"
      updated = selectedCities.includes("Alle Byer") ? [] : ["Alle Byer"];
    } else {
      // Hvis en specifik by vælges:
      // - Hvis allerede valgt, fjern den fra udvalget
      // - Ellers tilføj den, men fjern "Alle Byer" hvis den var valgt (for at undgå konflikt)
      updated = selectedCities.includes(city)
        ? selectedCities.filter((c) => c !== city)
        : [...selectedCities.filter((c) => c !== "Alle Byer"), city];
    }
    //Opdaterer valgte byer i page
    setSelectedCities(updated);
  };

  // Tjek om "Alle Byer" er valgt (bruges til at disabled andre valg)
  const isAlleSelected = selectedCities.includes("Alle Byer");

  return (
    <div className="flex flex-col gap-2 max-w-1/2 mt-2 ">
      <h4 className="!text-primary-red hidden md:block">Vælg By</h4>
      <City
        city="Alle Byer"
        isSelected={isAlleSelected}
        onChange={handleChange}
        disabled={selectedCities.length > 0 && !isAlleSelected} //disabled styling hvis andre byer er valgt
      />
      {uniqueCities.map((city) => (
        <City
          key={city}
          city={city}
          isSelected={selectedCities.includes(city)}
          onChange={handleChange}
          disabled={isAlleSelected} //disabled hvis alle byer er valgt
        />
      ))}
      <div className="border-b-4 border-black mt-4 hidden md:block"></div>
    </div>
  );
};

export default SelectCity;
