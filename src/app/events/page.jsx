//Matilde
//Katinka - dropdown til mobile

"use client";

import { useEffect, useState, useRef } from "react";
import EventCard from "@/components/events/EventCard";
import SelectCity from "@/components/events/SelectCity";
import normalizeCity from "@/utils/normalizeCity";
import { fetchEvents } from "../../api-mappe/EventsApiKald";
import { IoIosArrowDown } from "react-icons/io";

export default function Page() {
  const [events, setEvents] = useState([]);
  const [selectedCities, setSelectedCities] = useState([]);
  const [loading, setLoading] = useState(true); //Giver en loading besked, hvis event loades

  useEffect(() => {
    const getEvents = async () => {
      try {
        //Gammel - sætter events ind i den rækkefølge de er oprettet
        // const data = await fetchEvents();
        // setEvents(data);

        //Prompt: hvordan kan jeg sortere mine events så det er efter dato??

        //Ny - Sorterer events efter dato
        const data = await fetchEvents(); //Henter events fra API (fra vores API kald fil)
        const sortedEvents = data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)  //Konverterer dato-strengene til Date-objekter, så JS bedre kan sammenligne og sortere
        );
        //Opdaterer state med den sorterede event data
        setEvents(sortedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        //Sætter loading besked på siden til false, da events nu er blevet hentet
        setLoading(false);
      }
    };

    // Kalder funktionen for at hente events når siden bliver vist første gang
    getEvents();
  }, []);

  //Sletter et event
  // Opdaterer events state ved at filtrere det slettede event fra listen
  // Funktionen sendes som prop til EventCard og videre til Delete btn
  const handleDeleted = (deletedEventId) => {
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event.id !== deletedEventId)
    );
  };

  //Opdaterer card efter redigering
  // Går eventlisten igennem, hvis id matcher det opdaterede, erstattes det
  const handleEdit = (updatedEvent) => {
    setEvents((prevEvents) => 
      prevEvents.map((ev) => (ev.id === updatedEvent.id ? updatedEvent : ev))
    );
  };

  // Hvis "Alle Byer" er valgt eller ingen byer er valgt, vis alle events
  // Ellers filtrer events så kun de, hvor eventets by er i selectedCities, vises
  // normalizeCity bruges til at sikre at varianter som "kbh" og "københavn" samles under samme navn
  const filteredEvents =
    selectedCities.includes("Alle Byer") || selectedCities.length === 0
      ? events
      : events.filter((event) =>
          selectedCities.includes(normalizeCity(event.location.address))
        );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Luk dropdown når man klikker udenfor
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section>
      <h1 className="mb-2 sm:mb-3">Events</h1>
      <p>
        Oplev spændende kunstevents med fokus på modernismen – over hele
        Danmark. Vi glæder os til at byde dig velkommen!
      </p>
      <div>
        <div className="border-2 border-black w-full my-6 sm:my-10 z-50 self-start sticky sm:top-37 md:top-41 lg:top-45"></div>

        <div className="grid sm:grid-cols-[1fr_2fr] gap-4">
          {/* Mobilversion, dropdown filtrering */}
          <div
            ref={dropdownRef}
            className="block md:hidden self-start sticky top-26 bg-white pt-2 z-50"
          >
            <div
              onClick={() => setIsDropdownOpen((prev) => !prev)}
              className="text-white bg-black flex justify-between items-center px-4 py-2 border-2 border-black rounded cursor-pointe"
            >
              <span>Vælg By</span>
              <IoIosArrowDown
                className={`transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
              />
            </div>

            {isDropdownOpen && (
              <div className="px-4 pb-2">
                <SelectCity
                  selectedCities={selectedCities}
                  setSelectedCities={setSelectedCities}
                />
              </div>
            )}
          </div>

          {/* Desktop version, dropdown filtrering */}
          <div className="hidden md:block md:self-start md:sticky md:top-45 lg:top-55">
            <SelectCity
              selectedCities={selectedCities}
              setSelectedCities={setSelectedCities}
            />
          </div>

          <div className="flex flex-col gap-4">
            {loading ? (
              <p className="mt-2 italic">Indlæser events...</p>
            ) : filteredEvents.length === 0 ? (
              <p className="mt-2 italic">
                Ingen events fundet på den valgte lokation...
              </p>
            ) : (
              filteredEvents.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  onDeleted={() => handleDeleted(event.id)}
                  onEdit={handleEdit}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}